---
layout: page
title: Herd
permalink: /about/
---

<div class="cow-image-container">
    <img id="rotating-cow" src="/docs/images/cow1.jpg" alt="Thinking Cow" />
</div>

## Who Are We?

We specialize in software, systems, and security with a strong foundation in electronic systems, software engineering, and data science. We often find ourselves exploring and continuously fascinated by the intersection of new technologies, security, and human behavior. This space serves as our laboratory observatory capturing our experiments with web technologies and documenting our findings.

## What we do

- **Security Research**: Investigating how security works and its implications
- **Software Development**: Building minimal, performant software that respect user security
- **Digital Experiments**: Creating tools that demonstrate web technologies and security concepts

## Our Philosophy

- **Minimalism**: Less code, faster apps, clearer thinking
- **Security**: Users should understand what data they're sharing
- **Transparency**: Open source everything when possible
- **Continuous Learning**: Every project teaches something new

## Contributors

<div class="contributors-section">
    <div class="contributor-card primary-contributor">
        <div class="contributor-avatar">
            <img id="rotating-cow-small" src="/docs/images/cow1.jpg" alt="Thinking Cow" />
        </div>
        <div class="contributor-info">
            <h4>Thinking Cow</h4>
            <p class="contributor-role">Founder & Contributor</p>
            <p class="contributor-bio">Security researcher and software engineer passionate about privacy, minimalism, and open source.</p>
            <div class="contributor-links">
                <a href="{{ site.social.github }}" target="_blank">GitHub</a>
                <a href="{{ site.social.linkedin }}" target="_blank">LinkedIn</a>
                <a href="mailto:{{ site.social.email }}">Email</a>
            </div>
        </div>
    </div>

    <div class="contribute-card">
        <div class="contribute-icon">🤝</div>
        <div class="contribute-info">
            <h4>Join the Herd</h4>
            <p>Interested in contributing to security research, privacy tools, or minimal web development?</p>
            <div class="contribute-links">
                <a href="https://github.com/tpbansal/thinkingcow" target="_blank">View Repository</a>
                <a href="mailto:{{ site.social.email }}">Get in Touch</a>
            </div>
        </div>
    </div>
</div>

### Research & Writeups
Security challenges, vulnerability research, and educational content focused on practical security concepts and defensive techniques.

<style>
.cow-image-container {
    text-align: center;
    margin: 30px 0;
    padding: 20px;
    background-color: var(--subtle-bg);
    border: 1px solid var(--border-color);
    border-radius: 4px;
}

.cow-image-container img {
    width: 100%;
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    transition: opacity 0.5s ease-in-out;
}

.contributors-section {
    display: grid;
    gap: 20px;
    margin: 30px 0;
}

.contributor-card, .contribute-card {
    display: flex;
    gap: 20px;
    padding: 25px;
    background-color: var(--subtle-bg);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    transition: background-color 0.2s ease;
}

.contributor-card:hover, .contribute-card:hover {
    background-color: var(--hover-bg);
}

.contributor-avatar {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    background-color: var(--accent-color);
}

.contributor-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.5s ease-in-out;
}

.contributor-info, .contribute-info {
    flex: 1;
}

.contributor-info h4, .contribute-info h4 {
    margin: 0 0 5px 0;
    color: var(--link-color);
    font-size: 18px;
    font-weight: bold;
}

.contributor-role {
    font-size: 14px;
    color: var(--text-color);
    opacity: 0.8;
    margin: 0 0 10px 0;
    font-style: italic;
}

.contributor-bio, .contribute-info p {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 15px;
    opacity: 0.9;
}

.contributor-links, .contribute-links {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
}

.contributor-links a, .contribute-links a {
    color: var(--link-color);
    text-decoration: none;
    padding: 6px 12px;
    border: 1px solid var(--border-color);
    border-radius: 3px;
    font-size: 12px;
    transition: all 0.2s ease;
}

.contributor-links a:hover, .contribute-links a:hover {
    color: var(--link-hover-color);
    border-color: var(--link-color);
    background-color: rgba(255, 0, 255, 0.1);
}

.contribute-icon {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    background-color: var(--accent-color);
    border-radius: 50%;
}

@media (max-width: 768px) {
    .contributor-card, .contribute-card {
        flex-direction: column;
        text-align: center;
    }

    .contributor-avatar, .contribute-icon {
        align-self: center;
        margin-bottom: 15px;
    }

    .contributor-links, .contribute-links {
        justify-content: center;
    }
}
</style>

<script>
(function() {
    const cowImages = [
        '/docs/images/cow1.jpg',
        '/docs/images/cow2.jpg',
        '/docs/images/cow3.jpg',
        '/docs/images/cow4.jpg'
    ];

    let currentIndex = 0;
    const imgElement = document.getElementById('rotating-cow');

    function rotateCowImage() {
        if (imgElement) {
            currentIndex = (currentIndex + 1) % cowImages.length;
            imgElement.style.opacity = '0';

            setTimeout(() => {
                imgElement.src = cowImages[currentIndex];
                imgElement.style.opacity = '1';
            }, 250);
        }
    }

    // Start rotation after page load
    if (imgElement) {
        setInterval(rotateCowImage, 5000);
    }

    // Also rotate the small contributor avatar
    const smallImgElement = document.getElementById('rotating-cow-small');
    if (smallImgElement) {
        setInterval(() => {
            const currentIndex = Math.floor((Date.now() / 5000) % cowImages.length);
            smallImgElement.style.opacity = '0';
            setTimeout(() => {
                smallImgElement.src = cowImages[currentIndex];
                smallImgElement.style.opacity = '1';
            }, 250);
        }, 5000);
    }
})();
</script>