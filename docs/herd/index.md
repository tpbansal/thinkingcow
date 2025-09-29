---
layout: page
title: About Me
permalink: /about/
---

<div class="cow-image-container">
    <img id="rotating-cow" src="/docs/images/cow1.jpg" alt="Thinking Cow" />
</div>

## Who I am

I specialize in software systems security with a strong foundation in electronic systems, software engineering, and data science. I often find myself exploring and continuously fascinated by the intersection of new technologies, security, and human behavior. This space serves as my laboratory observatory capturing my experiments with web technologies and documenting my findings.

## What I do

- **Security Research**: Investigating how security works and its implications
- **Software Development**: Building minimal, performant software that respect user security
- **Digital Experiments**: Creating tools that demonstrate web technologies and security concepts

## My Philosophy

I believe in:
- **Minimalism**: Less code, faster apps, clearer thinking
- **Security**: Users should understand what data they're sharing
- **Transparency**: Open source everything when possible
- **Continuous Learning**: Every project teaches something new

<div class="connect-section">
    <h3>Connect</h3>
    <div class="connect-links">
        <a href="{{ site.social.github }}" target="_blank">GitHub</a>
        <a href="{{ site.social.linkedin }}" target="_blank">LinkedIn</a>
        <a href="mailto:{{ site.social.email }}">Email</a>
    </div>
</div>

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
})();
</script>