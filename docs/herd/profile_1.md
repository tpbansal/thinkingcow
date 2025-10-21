---
layout: page
title: Tapasvi Bansal
permalink: /herd/tapasvi/
---

<div class="profile-links">
    <a href="{{ site.social.github }}" target="_blank">GitHub</a>
    <a href="{{ site.social.linkedin }}" target="_blank">LinkedIn</a>
    <a href="mailto:{{ site.social.email }}">Email</a>
</div>

<style>
.profile-links {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    margin: 20px 0;
}

.profile-links a {
    color: var(--link-color);
    text-decoration: none;
    padding: 8px 16px;
    border: 1px solid var(--border-color);
    border-radius: 3px;
    font-size: 14px;
    transition: all 0.2s ease;
}

.profile-links a:hover {
    color: var(--link-hover-color);
    border-color: var(--link-color);
    background-color: rgba(255, 0, 255, 0.1);
}

/* Interactive Introduction Styles */
.intro-hero {
    margin: 30px 0;
}

.intro-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 30px;
}

.stat-card {
    background-color: var(--subtle-bg);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s ease;
}

.stat-card:hover {
    background-color: var(--hover-bg);
    border-color: var(--link-color);
    transform: translateY(-2px);
}

.stat-number {
    font-size: 32px;
    font-weight: bold;
    color: var(--link-color);
    margin-bottom: 5px;
}

.stat-label {
    font-size: 12px;
    color: var(--text-color);
    opacity: 0.8;
}

.intro-map {
    background-color: var(--subtle-bg);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 30px;
}

.map-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto 15px auto;
}

.world-map {
    width: 100%;
    height: auto;
}

.location-marker {
    cursor: pointer;
    transition: opacity 0.3s ease;
}

.location-marker:hover {
    opacity: 1;
}

.journey-text {
    text-align: center;
    font-size: 14px;
    color: var(--text-color);
}

.journey-text strong {
    color: var(--link-color);
}

.intro-highlights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
}

.highlight-item {
    display: flex;
    gap: 15px;
    align-items: flex-start;
    padding: 20px;
    background-color: var(--subtle-bg);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    transition: all 0.3s ease;
}

.highlight-item:hover {
    background-color: var(--hover-bg);
    border-color: var(--link-color);
}

.highlight-icon {
    font-size: 28px;
    flex-shrink: 0;
    line-height: 1;
}

.highlight-content strong {
    display: block;
    color: var(--link-color);
    margin-bottom: 5px;
    font-size: 14px;
}

.highlight-content p {
    margin: 0;
    font-size: 13px;
    line-height: 1.4;
    opacity: 0.9;
}

/* Dynamic Visualization Styles */
.dynamic-viz-container {
    background-color: var(--subtle-bg);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 20px;
    margin-top: 30px;
}

.viz-controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    justify-content: center;
}

.viz-btn {
    padding: 10px 20px;
    background-color: transparent;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: var(--text-color);
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
    font-family: inherit;
}

.viz-btn:hover {
    border-color: var(--link-color);
    color: var(--link-color);
    background-color: rgba(255, 0, 255, 0.05);
}

.viz-btn.active {
    background-color: var(--link-color);
    border-color: var(--link-color);
    color: #000;
    font-weight: bold;
}

.viz-display {
    position: relative;
    min-height: 400px;
}

.viz-panel {
    display: none;
    opacity: 0;
    transition: opacity 0.5s ease;
}

.viz-panel.active {
    display: block;
    opacity: 1;
    animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.world-map-wrapper {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
}

.location-pin {
    cursor: pointer;
}

.location-pin:hover circle:first-child {
    r: 10;
}

/* Locations Timeline Styles */
.locations-timeline {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 40px 20px;
    flex-wrap: wrap;
}

.location-card {
    background-color: rgba(255, 0, 255, 0.05);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 25px;
    min-width: 220px;
    max-width: 280px;
    transition: all 0.4s ease;
    opacity: 0;
    animation: slideIn 0.6s ease forwards;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.location-card:hover {
    transform: translateY(-5px);
    border-color: var(--link-color);
    box-shadow: 0 5px 20px rgba(255, 0, 255, 0.2);
}

.location-flag {
    font-size: 48px;
    text-align: center;
    margin-bottom: 15px;
}

.location-details h3 {
    color: var(--link-color);
    font-size: 18px;
    margin: 0 0 10px 0;
    text-align: center;
}

.location-years {
    color: var(--text-color);
    font-size: 14px;
    opacity: 0.7;
    margin: 5px 0;
    text-align: center;
    font-weight: bold;
}

.location-org {
    color: var(--text-color);
    font-size: 13px;
    margin: 8px 0;
    text-align: center;
    opacity: 0.9;
}

.location-role {
    color: var(--text-color);
    font-size: 12px;
    margin: 10px 0 0 0;
    padding-top: 10px;
    border-top: 1px solid var(--border-color);
    text-align: center;
    opacity: 0.7;
    font-style: italic;
}

.timeline-arrow {
    font-size: 32px;
    color: var(--link-color);
    opacity: 0.5;
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.7; }
}

/* Word Cloud Styles */
.word-cloud {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 15px;
    padding: 40px 20px;
    min-height: 350px;
}

.cloud-word {
    display: inline-block;
    font-weight: bold;
    opacity: 0;
    animation: wordFadeIn 0.8s ease forwards;
    transition: all 0.3s ease;
    cursor: default;
    padding: 5px 10px;
}

.cloud-word:hover {
    transform: scale(1.2);
    opacity: 1 !important;
}

@keyframes wordFadeIn {
    from {
        opacity: 0;
        transform: scale(0.5) rotate(-10deg);
    }
    to {
        opacity: 0.85;
        transform: scale(1) rotate(0deg);
    }
}

@media (max-width: 768px) {
    .intro-stats {
        grid-template-columns: repeat(2, 1fr);
    }

    .stat-number {
        font-size: 24px;
    }

    .stat-label {
        font-size: 11px;
    }

    .intro-highlights {
        grid-template-columns: 1fr;
    }

    .journey-text {
        font-size: 12px;
    }

    .viz-controls {
        flex-direction: column;
    }

    .viz-btn {
        width: 100%;
    }

    .word-cloud {
        gap: 10px;
        padding: 20px 10px;
    }

    .cloud-word {
        font-size: 0.8em !important;
    }
}
</style>

## Introduction

<div class="intro-hero">
    <div class="intro-stats">
        <div class="stat-card">
            <div class="stat-number">3</div>
            <div class="stat-label">Global Tech Hubs</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">15M+</div>
            <div class="stat-label">Cloud Assets Secured</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">500K+</div>
            <div class="stat-label">Machines Protected</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">9+</div>
            <div class="stat-label">Industry Experience Years</div>
        </div>
    </div>

    <div class="dynamic-viz-container">
        <div class="viz-controls">
            <button class="viz-btn active" data-viz="locations">Locations</button>
            <button class="viz-btn" data-viz="companies">Companies</button>
            <button class="viz-btn" data-viz="roles">Roles</button>
            <button class="viz-btn" data-viz="technologies">Technologies</button>
        </div>

        <div class="viz-display">
            <!-- Locations View -->
            <div class="viz-panel active" id="viz-locations">
                <div class="locations-timeline">
                    <div class="location-card" style="animation-delay: 0s;">
                        <div class="location-flag">🇺🇸</div>
                        <div class="location-details">
                            <h3>Seattle, US</h3>
                            <p class="location-years">2016 - 2021</p>
                            <p class="location-org">SAP • University of Washington</p>
                            <div class="location-role">DevSecOps Engineer, Graduate Student</div>
                        </div>
                    </div>

                    <div class="timeline-arrow">→</div>

                    <div class="location-card" style="animation-delay: 0.2s;">
                        <div class="location-flag">🇩🇰</div>
                        <div class="location-details">
                            <h3>Billund, Denmark</h3>
                            <p class="location-years">2021 - 2023</p>
                            <p class="location-org">LEGO Group</p>
                            <div class="location-role">Senior Software Security Engineer</div>
                        </div>
                    </div>

                    <div class="timeline-arrow">→</div>

                    <div class="location-card" style="animation-delay: 0.4s;">
                        <div class="location-flag">🇳🇱</div>
                        <div class="location-details">
                            <h3>Amsterdam, Netherlands</h3>
                            <p class="location-years">2023 - 2025</p>
                            <p class="location-org">ClickHouse</p>
                            <div class="location-role">Software Security Engineer</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Companies Word Cloud -->
            <div class="viz-panel" id="viz-companies">
                <div class="word-cloud" id="companies-cloud"></div>
            </div>

            <!-- Roles Word Cloud -->
            <div class="viz-panel" id="viz-roles">
                <div class="word-cloud" id="roles-cloud"></div>
            </div>

            <!-- Technologies Word Cloud -->
            <div class="viz-panel" id="viz-technologies">
                <div class="word-cloud" id="tech-cloud"></div>
            </div>

        </div>
    </div>
</div>

<script>
(function() {
    // Data for word clouds
    const techData = [
        {text: 'Linux', size: 40}, {text: 'Kubernetes', size: 38}, {text: 'Databases', size: 36}, {text: 'AWS', size: 38}, {text: 'Azure', size: 36},
        {text: 'GCP', size: 34}, {text: 'Python', size: 35}, {text: 'Terraform', size: 32},
        {text: 'Docker', size: 30}, {text: 'ArgoCD', size: 28}, {text: 'GitHub Actions', size: 26},
        {text: 'Prometheus', size: 24}, {text: 'Grafana', size: 22}, {text: 'Helm', size: 24},
        {text: 'Okta', size: 20}, {text: 'ZeroTrust', size: 26}, {text: 'Tailscale', size: 22}, {text: 'Wiz', size: 22}, {text: 'Sysdig/Falco', size: 22}, {text: 'Claude', size: 22},
        {text: 'Elastic', size: 22}, {text: 'Pagerduty', size: 18}, 
        {text: 'Go', size: 24}, {text: 'SQL', size: 20}, {text: 'Bash', size: 18},
        {text: 'Lambda', size: 22}, {text: 'IAM', size: 20}, {text: 'SIEM', size: 24},
        {text: 'Wiz', size: 18}, {text: 'Falco', size: 18}, {text: 'SentinelOne', size: 20}, {text: 'Splunk', size: 20},
    ];

    const companiesData = [
        {text: 'SAP Labs', size: 38}, {text: 'ClickHouse', size: 36}, {text: 'the LEGO Group', size: 36},
        {text: 'University of Washington', size: 28}, {text: 'SAP Concur', size: 24}
    ];

    const rolesData = [
        {text: 'Software Security Engineer', size: 38}, {text: 'Incident Response Lead', size: 32},
        {text: 'Cybersecurity Specialist', size: 32}, {text: 'Platform Architect', size: 30},
        {text: 'Cloud Security Specialist', size: 34}, {text: 'Infrastructure Security Engineer', size: 28},
        {text: 'Zero Trust Architect', size: 26}, {text: 'Software Engineer', size: 24},
        {text: 'Threat Intelligence Analyst', size: 22}, {text: 'Security Researcher', size: 26},
        {text: 'DevSecOps Engineer', size: 20}, {text: 'IAM Engineer', size: 22},
        {text: 'Data Analyst', size: 28}, {text: 'SIEM Architect', size: 24},
        {text: 'Vulnerability Management Engineer', size: 22}, {text: 'Data Engineer', size: 28}
    ];

    function createWordCloud(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';
        const colors = ['var(--link-color)', 'var(--link-hover-color)', '#ff00ff', '#ff66ff', '#cc00cc'];

        data.forEach((item, index) => {
            const word = document.createElement('span');
            word.className = 'cloud-word';
            word.textContent = item.text;
            word.style.fontSize = item.size + 'px';
            word.style.color = colors[index % colors.length];
            word.style.animationDelay = (index * 0.1) + 's';
            container.appendChild(word);
        });
    }

    // Initialize word clouds
    createWordCloud('tech-cloud', techData);
    createWordCloud('companies-cloud', companiesData);
    createWordCloud('roles-cloud', rolesData);

    // Visualization switching
    const vizBtns = document.querySelectorAll('.viz-btn');
    const vizPanels = document.querySelectorAll('.viz-panel');

    vizBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetViz = this.dataset.viz;

            vizBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            vizPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === 'viz-' + targetViz) {
                    panel.classList.add('active');
                }
            });
        });
    });
})();
</script>

---

## Professional Experience

### ClickHouse
**Software Security Engineer**<br>
*Mar 2023 - Aug 2025* | 2 yrs 6 mos | Amsterdam, North Holland, Netherlands

Tapped to join the founding security team in Amsterdam, I developed software security solutions (auth*, o11y, encryption) for modern distributed database systems while safeguarding multi-cloud infrastructure across AWS, GCP, and Azure. My contributions focus on strengthening core and systemic security across infrastructure, people, and products for column-oriented OLAP/Database systems.

I served as the **Incident Response Lead (ICL)** for ClickHouse Cloud, where I oversaw the entire cycle for production incident handling and resolution. I also owned and/or implemented and worked on key infrastructure initiatives such as public cloud platform management (AWS, GCP, and Azure landing zones), internal access systems (Auth*), zero trust networking / BeyondCorp (Tailscale), Enterprise Security Tooling (Kandji, SentinelOne), and other engineering (CMS, etc.) and business system improvements (cloud billing, support services).

**Technologies:** Tailscale/Wireguard (Zero Trust), Okta, Auth0, Lumos, Wiz, Falco, GitHub ecosystem, GitHub Actions, ArgoCD, containerization (Docker, containerd), Kubernetes (EKS, GKE, AKS), Helm, serverless (Lambda, Step Functions, Cloud Functions, Azure Functions, S3), OpenID Connect Auth, Clickhouse, Prometheus, Grafana, Pagerduty, Incident.io, SentinelOne, Kandji, Bitwarden, Lastpass

**Languages:** Python, Go, IaC (HCL, YAML, JSON), Bash/Shell scripting, SQL, Rego

---

### The LEGO Group
**Senior Software Security Engineer**<br>
*Feb 2021 - Feb 2023* | 2 yrs 1 mos | Billund Municipality, Region of Southern Denmark, Denmark

Brought into LEGO HQ in Denmark to improve the security posture of LEGO Group's hybrid cloud environment and industrial systems (ICT) across manufacturing, logistics, and supply chain. Reporting to a Senior Director, part of the Technology Transformation Team. My efforts initially focused on innovation and improving security on a global Kubernetes footprint and refining reusable cloud security controls. Later transitioned to LEGO's Digital Security Engineering Team to scale security programs across the organization.

**Led the global security engineering team on cross-functional security initiatives:**
- Secured infrastructure and improved practices for LEGO's hybrid Kubernetes platform
- Built a Serverless Event-Driven Vulnerability Management (Security Data Lake and processing) to gather vulnerability data and build intelligence over 100K+ compute machines. Delivered with Elastic Cluster, automated Index Management, and Mappings.
- Partnered with Landing Zone (AWS, Azure) and Developer Experience (DevEx, Observability) teams to harden infrastructure, enforce standards, and enhance incident readiness.
- Ran internal enablement programs for product teams & developers, security tooling, and secure development practices.
- Managed bug bounty triage and cybersecurity incidents/events.

**Technologies:** Github, GitHub Actions, Terraform, ArgoCD, Azure DevOps, Containerization (Docker, containerd), Kubernetes (EKS), Helm, Rancher/Rafay, Serverless (AWS Lambda, Step Functions, EventBridge, S3), OpenID Connect Auth, Sysdig, Zap, Snyk, Qualys, Elastic, Pagerduty, Nexus, JFrog, ECR, JIRA

**Languages:** Python, Bash, SQL, JSON, HCL, YAML

---

### SAP Labs
**Senior DevSecOps Engineer**<br>
*June 2018 - Jan 2021* | 2 yrs 8 mos | Seattle, Washington, United States

*SAP Labs, LLC, Center of Excellence | Global Multi-Cloud Services (AWS, Azure, GCP, AliCloud)*<br>
*Reporting to the VP of Multi-Cloud Services*

As a core member of the Multi-Cloud Security team, I significantly contributed to and led three major, organization-wide initiatives for SAP's 2020 security transformation, driving one of the largest security efforts in SAP's history.

**Experience Highlights:**
- Delivered Multi-Cloud Security as a Service to critical SAP lines of business (S/4, Concur, Ariba, HANA).
- Administered and operated diverse cloud security monitoring platforms and backend systems (SSO, DNS routing, JIRA & ServiceDesk, API Integration).
- Developed an exception microservice to enhance platform support and close security process gaps.
- Implemented "Secure by Default" DevOps through Compliance-as-Code, integrating dockerized policy controls into CI/CD pipelines across SAP's public cloud environment (35K+ Developers, ~7500+ Public Cloud Accounts).
- Led Threat Intelligence efforts, collecting operational intelligence on 7.2+ Million cloud assets against known threats.
- Collaborated with SAP NS2 on endpoint protection and external security agencies on a needs basis.

**Technologies & Tools:** Python, R, Shell Scripting, SQL, Ruby, JSON, YAML, HCL, Git/Github, Jenkins/Azure DevOps, AWS, Azure, GCP, Alibaba Cloud, JIRA, Cloudhealth, Docker, Kubernetes (GKE, EKS), Chef Inspec, Terraform, Splunk/ELK, Pagerduty, PrismaCloud, Twistlock, Dome9

---<br>

#### DevSecOps Engineer<br>
*Aug 2018 - Jan 2020* | 1 yr 6 mos | Seattle, Washington, United States

Recruited as a foundational Security Engineering Driver for SAP's initial Public Cloud Transformation. As the first engineer on the team, I designed and developed our DevSecOps approach, implementing security solutions across multi-cloud infrastructure with over $1 billion in yearly public cloud spending and driving critical organizational-level initiatives.

**Key Contributions:**
- **Pioneered Multi-Cloud Incident Response:** Researched, designed, and engineered a novel technical workflow for security incident response using "code runbooks" specific to public cloud APIs (SDKs). Successfully remediated critical cloud security incidents, including exploited credentials, cryptomining intrusions, DDoS attacks, and software vulnerabilities, and collaborated with forensics teams to release Root Cause Analysis reports.
- **Engineered Enterprise-Scale Security Tools:** Onboarded 3,000+ public cloud accounts to the cloud monitoring platform (AWS, Azure) and transitioned a complete public cloud monitoring infrastructure (6,000+ accounts) to a mature platform in 2019 (AWS, Azure, GCP).
- **Managed Cloud Security Monitoring Platform (SaaS):** Engineered and deployed a mature Cloud Security monitoring platform, providing automated asset inventory for over 5 million cloud resources, continuous security compliance reporting (SOC II, PCI, FedRamp, NIST), remediation knowledge, and investigation features for 15,000+ stakeholders.
- **Designed DevSecOps APIs:** Developed APIs to support an end-to-end (E2E) DevSecOps approach across public clouds, including Google Cloud, Microsoft Azure, and AWS.

**Technologies & Tools:** Python, R, Shell Scripting, SQL, Ruby, JSON, YAML, HCL, Git, Github CI, AWS, Azure, GCP, Alibaba Cloud, JIRA, RightScale, Docker, Terraform, Splunk/ELK, Pagerduty, PrismaCloud (Evident.io + Redlock+), Twistlock, Dome9

---<br>

#### Cybersecurity and Privacy Engineer (SAP Concur)<br>
*Jun 2017 - Jul 2018* | 1 yr 2 mos | Bellevue, Washington, United States

Started as an SAP iXP Intern. Continued as a co-op student employee at the SAP Concur HQ. A late-stage B2B high-growth startup (previously Concur) for Travel & Expense management.

**Work Overview (Hybrid Infra - AWS + DC):**
- Compliance engineering: Common Security Control Framework for Security Compliance (ISO 20K, ISO 27K, FISMA, SOCI, SOC II & PCI)
- Built applications for security engineering (Lambda functions, MS SQL database, Python), Integrations with Splunk
- Threat Model Development; Network & Log Analysis via Splunk
- Built applications on Vulnerability Management platform use case for Security Operations Team and Risk Management (Market Technologies: Splunk, Rapid7 Nexpose, Nessus)

---

## Education

### University of Washington
**Master of Science - Information Management**<br>
*August 2016 - June 2018* | Seattle, Washington<br>
**Specializations:** Data Science, Cybersecurity, Business Intelligence

---

## Certifications & Licenses

### CKS: Certified Kubernetes Security Specialist
**The Linux Foundation** | *Issued Aug 2025*
Credential ID: LF-zqhc1gdda4
**Skills:** Security, Distributed Systems, Open-Source Software, Application Security

### Certificate of Cloud Security Knowledge (CCSK)
**Cloud Security Alliance** | *Issued Apr 2022*
Credential ID: DRLho7xd8iMUmfcimbJ2SrbM
**Skills:** Open-Source Software, Security, Identity and Access Management (IAM), Distributed Systems, Cybersecurity

### CKA: Certified Kubernetes Administrator
**The Linux Foundation** | *Issued Jan 2022*
Credential ID: LF-btcd469xbl
**Skills:** Linux, Open-Source Software, Kubernetes, Distributed Systems, DevOps

### Code Source Control and Git
**QA North America** | *Issued Apr 2020*
Credential ID: 16617040
**Skills:** Security Operations, Open-Source Software, Data Science, Distributed Systems, DevOps, Software Development

### Oracle Certified Associate, Database 11g Administrator
**Oracle** | *Issued Sep 2015*
Credential ID: OC1516671
**Skills:** Microsoft SQL Server, Databases, PL/SQL, SQL

### Big Data Hadoop Foundations
**IBM** | *Issued Aug 2015*
**Skills:** Data Science, Machine Learning, Databases, Distributed Systems

### Microsoft Certified Specialist: Programming in HTML5 with JavaScript and CSS3
**Microsoft** | *Issued Apr 2013*
Credential ID: E253-4468

---

## Professional Projects

### ClickHouse Bring Your Own Cloud (BYOC)
*May 2024 - Nov 2024* | **ClickHouse**

Product Security Owner for Bring Your Own Cloud (BYOC) ClickHouse Deployments. Worked with teams on Critical Security Controls' architecture and implementation including:
- IAM (Identity and Access Management)
- Monitoring and Incident Response
- Secure Configuration
- Network Security, SLA Policy
- Shared Responsibility Model

Controls were tailored to meet the unique requirements of highly isolated, restricted, and/or regulatory environments.

**Related Links:**
- [Building ClickHouse BYOC on AWS](https://clickhouse.com/blog/building-clickhouse-byoc-bring-your-own-cloud-on-aws)
- [ClickHouse at AWS re:Invent 2024 - Product Announcement Roundup](https://clickhouse.com/blog/clickhouse-at-aws-reinvent-2024-product-announcement-roundup)

---

### ClickHouse as a SIEM (CHaaS)
*May 2024 - Jul 2024* | **ClickHouse**

The security applications of ClickHouse may be less well known compared to its observability use cases, yet it has undeniably become a crucial component of our security program. The addition of RunReveal has been a big addition to using ClickHouse in security and has improved how we work with logs and detections in a scalable manner.

Security logging is a fundamental component of ClickHouse's robust enterprise security program. It involves the systematic collection, storage, and analysis of log data from various systems, applications, and devices within the organization's IT environment.

**Skills:** Cybersecurity, Data Science, Open-Source Software

**Related Links:**
- [How our security team uses ClickHouse Cloud + RunReveal](https://clickhouse.com/blog/how-our-security-team-uses-clickhouse-cloud-runreveal)

---

### ClickHouse Cloud on Microsoft Azure
*Jan 2024 - Mar 2024* | **ClickHouse**

Led the secure infrastructure enablement of ClickHouse on Azure by designing a robust landing zone and implementing a modern distributed OLAP DB tech stack including:
- Azure Entra ID (AAD) for end-to-end authentication and authorization
- Multiple environments and tenancies
- Kubernetes clusters
- Cloud Security Posture Management (CSPM) platform
- Threat visibility and runtime security engine
- Centralized logging with logging enrichment
- Meeting necessary security controls for ISO27K, SOC2 and stricter regulatory standards in healthcare (HIPAA) and defense

**Skills:** Microsoft Azure, Identity and Access Management (IAM), Databases

**Related Links:**
- [Building ClickHouse Cloud on Microsoft Azure](https://clickhouse.com/blog/building-clickhouse-cloud-on-microsoft-azure)

---

### ClickHouse on GCP
*Apr 2023 - Jun 2023* | **ClickHouse**

Led the infrastructure security for the production rollout of ClickHouse on GCP, a service that was expanded into the security compliance program (SOC 2 Type II and ISO 27001). Built centralized authentication and authorization using an integrated identity platform, ensuring seamless and secure access management across engineering (production, staging, and development) and non-engineering environments.

**Designed and implemented:**
- Secure landing zone
- Fully automated CI/CD
- CSPM visibility
- WAF (Cloud Armor - CRS Levels and custom rules)
- Runtime threat detection
- Centralized security monitoring and alerting
- WAF for external endpoints

**Skills:** Google Cloud Platform (GCP), Open-Source Software, Terraform, Authentication Systems, Web Application Firewalls

**Related Links:**
- [ClickHouse Cloud on Google Cloud Platform (GCP) is Generally Available](https://clickhouse.com/blog/clickhouse-cloud-on-google-cloud-platform-gcp-is-generally-available)

---

### ClickHouse - Software Bill of Materials (SBOM)
*Mar 2023 - Apr 2023* | **ClickHouse**

An early, very gratifying project. Contributed to implementing ClickHouse's Software Bill of Material (SBOM) process and platform (using cdxgen). A critical part of our software supply chain security program.

A single SBOM is automatically generated with all third-party open source dependencies from our core software (control-plane, data-plane, and ClickHouse), on every pull request, scanned for vulnerabilities, and made available in ClickHouse Trust Center in the spirit of OSS, every day!

**Skills:** Software Development, Security, Databases, Open-Source Software

**Related Links:**
- [ClickHouse Trust Center - Application Security SBOM](https://trust.clickhouse.com/)

---

### Secure Cloud Delivery (SAP)
*Jan 2020 - Jan 2021* | **SAP**

Proactively securing the cloud environment for cloud-native development/production landscape. This involved using/building security controls as code for large-scale implementation. Much focus on achieving baseline security controls by shifting left in development processes (CI/CD, Control-as-code).

This also involved building a more robust and larger security infrastructure in terms of culture, people, and technology on our security team (Team Size ~12+).

**Skills:** Team Leadership, Distributed Systems, Communication, Kubernetes, DevOps, Software Development, Infrastructure as Code (IaC), Linux, Security, Engineering Management, Python, Product Development, Leadership, Problem Solving, Cybersecurity, Terraform, Cross-functional Team Leadership, Open-Source Software

---

### Multi-Cloud Adoption Program (MCAP)
*Aug 2018 - Mar 2019* | **SAP**

I was hired as a part of the first ~30 engineers to successfully execute the SAP Public Cloud adoption Strategy. I worked with different SAP lines of business (Concur, Ariba, Successfactors, HEC, etc.) to assist in the adoption of public cloud services within SAP.

I provided technical consultation on suitable strategies to the engineering teams on their cloud journey. This involved constant reiterations of engineering systems (specialty - security) to help facilitate seamless cloud adoption without vendor lock-in. This involved a massive migration of applications & infrastructure spread globally over multiple data centers.

Also, performed proofs-of-concept using existing commercial and open-source cloud-native security technologies to evaluate and meet the needs of the broader SAP organization.

**Skills:** Distributed Systems, Communication, DevOps, Linux, Security, Engineering Management, Python, Problem Solving, Cross-functional Team Leadership

---

### SAP Public Cloud Security Adoption
*Sep 2018 - Mar 2019* | **SAP**

Worked as the first DevSecOps Engineer on the team. Cloud Security Configuration Compliance - onboarded over a billion-dollar in annual billing SAP's Public Cloud infrastructure onto security monitoring platform. Consistently providing automated asset inventory for over 3 million cloud resources, security compliance reporting, remediation knowledge, and resource investigation functionality for 15000+ stakeholders (engineering and management).

**Skills:** Team Leadership, Distributed Systems, Communication, DevOps, Infrastructure as Code (IaC), Network Security, Security, Engineering Management, Python, Leadership, Problem Solving, Cybersecurity, Cross-functional Team Leadership, Security Operations

---
---

## Academic & Research Projects

### Strategic Information Management Consulting & Systems Update
*Nov 2017 - Jun 2018* | **University of Washington**

Capstone Project - King County's Dispute Resolution Center - assessing information management systems and identifying improvements - applying methodologies from various frameworks like process improvement framework (Lean Six Sigma), Strategic Planning in Nonprofits (SPiN) framework, etc.

**Skills:** Communication, Research, Problem Solving

---

### Spam Filter - Machine Learning (Bayesian Statistics)
*Feb 2018 - Mar 2018* | **University of Washington**

Built an email spam filter - Downloaded emails (sampling) using IMAP and POP3 in MIME format. Parsed content and performed analysis using supervised machine learning methods (Naïve Bayes and k-Nearest Neighbour).

**Skills:** Security, Python, Problem Solving, Machine Learning, Cybersecurity, Data Science

---

### Business Intelligence - Applied Statistical Analysis, Management and Marketing Theory
*Jan 2017 - Mar 2017* | **University of Washington**

Sales Data Mart & Dashboards – Developed a multidimensional model, ETL packages for a data warehouse for a manufacturing company. Used SQL Server Integration Services (SSIS); SQL Server Management Studio (SSMS) for creating data cube and also created a dashboard in Tableau to analyze profits and recommend changes in marketing strategy for Products.

**Skills:** Statistics, SQL, Databases, Statistical Data Analysis, Data Science

---

### Information Security Framework Design
*Jan 2017 - Mar 2017* | **University of Washington**

Designed Security Framework and techniques for accomplishing the goals of a Security Program for a company using a case-study approach which included: Governance, Risk management, Threat Intelligence (Security Operation Center, Incident response), etc.

**Skills:** Network Security, Security, Research, Cybersecurity

---

### Research (Pilot) - Cultural Diversity preferences in Student Housing
*Oct 2016 - Dec 2016* | **University of Washington**

Cultural Diversity preferences in Student Housing - Data was analyzed using cross-tabulation and chi-square analysis to establish statistical relationships with various potential influential factors.

**Skills:** Statistics, Communication, Research, Statistical Data Analysis

---
---

## Professional Training & Courses

- **AWS Training - Security Engineering on AWS (3 day)** | The LEGO Group
- **AWS Training - Security Specialty (3 day)** | SAP
- **Cloud Academy - Google Professional Cloud Architect** | SAP
- **ICS/OT Threat Detection** | Paralus LLC, The LEGO Group
- **Intermediate API Development - Pluralsight Live** | The LEGO Group

---
---

## University Coursework

**University of Washington - Master of Science in Information Management**

- Cybersecurity and Networking (IMT 589)
- Data Science I - Advanced Statistical Analysis (Bayesian) (IMT 573)
- Data Science II - Machine Learning and Neural Networks (IMT 574)
- Data Science III - Scaling Machine Learning and Neural Networks (IMT 575)
- Business Intelligence Systems (IMT 577)
- Management in Business Intelligence (IMT 576)
- Information Security Management - Enterprise and Software (IMT 589)
- Foundations of Information Management (IMT 500)
- Statistical Analysis Methods in Information Analysis (IMT 570)
- Policy and Ethics in Information (IMT 550)
- Programming Methods in Information - OOPS and Functional
- Social Network Analysis - Graph Theory
- Internship - Coop (IMT 590)

---
---

## Research Interests

- Cloud-native & Software Security
- Data Science & its applications
- Open source software
- Privacy & Democracy preserving technologies

---
---

## Personal Interests

- Outdoor adventures (hiking & camping)
- World travel and cultural exploration
- Martial arts (Karate Shito Ryu - Brown Belt)
- Board games
- Cooking and culinary exploration

---

*For professional inquiries, connect via [LinkedIn]({{ site.social.linkedin }}) or [email](mailto:{{ site.social.email }}).*