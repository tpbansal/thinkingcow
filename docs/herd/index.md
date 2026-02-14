---
layout: page
title: Herd
permalink: /about/
---

<div class="cow-image-container" id="cow-slideshow" title="Click to view all images">
    <img id="rotating-cow" src="/docs/images/cow0.jpg" alt="Thinking Cow" />
</div>

<!-- Modal for image gallery -->
<div id="image-modal" class="image-modal">
    <div class="modal-content">
        <span class="modal-close">&times;</span>
        <div class="modal-body">
            <button class="modal-nav modal-prev">‹</button>
            <img id="modal-image" src="/docs/images/cow0.jpg" alt="Thinking Cow Gallery" />
            <button class="modal-nav modal-next">›</button>
        </div>
        <div class="modal-counter">
            <span id="modal-counter-text">1 / 5</span>
        </div>
    </div>
</div>

## Who Am I?

I'm a software and security engineer with a background in electronic systems engineering and data science. I spend my time exploring the topic of security, distributed systems, and human life.

This space is my laboratory and observatory, where I document security research, build security or privacy focused tools, and share what I learn through writeups and experiments.

## What I Do

**Security Engineering & Research**: I like to keep things sharp. Continuous learning and document my approaches through detailed writeups. Topics include modern distributed Systems/API exploitation, DNS enumeration, OSINT, and web application security, product and cloud security.

**Privacy Tools & Experiments**: I build minimal tools that demonstrate security concepts and integrate security as part of the engineering stack. For example: [Digital Mirror](/saltlick/digital-mirror/) shows what information browsers expose to websites—a hands-on way to understand your digital fingerprint.

**Software Engineering**: I design and build secure, performant systems with a focus on cloud infrastructure, Kubernetes, distributed systems, auth*, and modern practices.

## Philosophy

- **Minimalism**: Less code means fewer bugs, faster performance, and clearer thinking. I believe in building only what's necessary.
- **Transparency with Defense-in-Depth**: I assume full disclosure. Tools and techniques are open-sourced and documented, with security enforced through layered, resilient controls, not secrecy.
- **User Privacy**: People should understand what data they're sharing. My work aim to make the invisible visible.
- **Learning in Public**: Every project teaches something new. I share both successes and failures to help others navigate similar challenges.

## Background & Experience

I work as a software security engineer, specializing in cloud infrastructure security, product security, and distributed systems. My technical foundation comes from studying electronic systems and software engineering, with additional focus on data science and machine learning.

## Contact & Collaboration

<div class="contributors-section">
    <div class="contributor-card primary-contributor">
        <div class="contributor-avatar">
            <img id="rotating-cow-small" src="/docs/images/cow1.jpg" alt="Thinking Cow" />
        </div>
        <div class="contributor-info">
            <h4>Tapasvi Bansal</h4>
            <p class="contributor-role">Security Engineer & Researcher | <a href="/herd/tapasvi/">Full Profile</a></p>
            <p class="contributor-bio">Interested in security research or software project collaboration, CTF challenges or hackathons, or discussing software security and privacy tools? Let's connect.</p>
            <div class="contributor-links">
                <a href="mailto:{{ site.author.email }}">Email</a>
                <a href="{{ site.social.github }}" target="_blank">GitHub</a>
                <a href="{{ site.social.linkedin }}" target="_blank">LinkedIn</a>
            </div>
        </div>
    </div>
</div>

## Recent Work

Check out my latest [security writeups](/posts/) covering CTF challenges, vulnerability research, and hands-on security techniques. I also build [experimental tools](/experiments/) that demonstrate web security concepts and privacy implications.

<style>
.cow-image-container {
    text-align: center;
    margin: 20px auto;
    padding: 15px;
    background-color: var(--subtle-bg);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    max-width: 400px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.cow-image-container:hover {
    border-color: var(--link-color);
    box-shadow: 0 0 15px rgba(255, 0, 255, 0.2);
    transform: scale(1.02);
}

.cow-image-container img {
    width: 100%;
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    transition: opacity 0.5s ease-in-out;
}

/* Modal Styles */
.image-modal {
    display: none;
    position: fixed;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.95);
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.modal-content {
    position: relative;
    margin: auto;
    padding: 20px;
    width: 90%;
    max-width: 900px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.modal-close {
    position: absolute;
    top: 20px;
    right: 30px;
    color: var(--link-color);
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    z-index: 10001;
    transition: color 0.2s ease;
}

.modal-close:hover,
.modal-close:focus {
    color: var(--link-hover-color);
}

.modal-body {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

.modal-body img {
    max-width: 100%;
    max-height: 70vh;
    width: auto;
    height: auto;
    border-radius: 4px;
    border: 2px solid var(--border-color);
}

.modal-nav {
    background-color: rgba(255, 0, 255, 0.2);
    border: 1px solid var(--link-color);
    color: var(--link-color);
    font-size: 40px;
    font-weight: bold;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s ease;
    flex-shrink: 0;
}

.modal-nav:hover {
    background-color: rgba(255, 0, 255, 0.4);
    color: var(--link-hover-color);
    transform: scale(1.1);
}

.modal-nav:active {
    transform: scale(0.95);
}

.modal-counter {
    text-align: center;
    margin-top: 20px;
    color: var(--text-color);
    font-size: 18px;
}

@media (max-width: 768px) {
    .cow-image-container {
        max-width: 300px;
        padding: 10px;
    }

    .modal-content {
        padding: 10px;
    }

    .modal-close {
        top: 10px;
        right: 15px;
        font-size: 30px;
    }

    .modal-nav {
        font-size: 30px;
        padding: 8px 15px;
    }

    .modal-body {
        gap: 10px;
    }

    .modal-body img {
        max-height: 60vh;
    }

    .modal-counter {
        font-size: 14px;
    }
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

.contributor-role a {
    color: var(--link-color);
    text-decoration: none;
    transition: color 0.2s ease;
}

.contributor-role a:hover {
    color: var(--link-hover-color);
    text-decoration: underline;
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
        '/docs/images/cow0.jpg',
        '/docs/images/cow1.jpg',
        '/docs/images/cow2.jpg',
        '/docs/images/cow3.jpg',
        '/docs/images/cow4.jpg'
    ];

    let currentIndex = 0;
    let modalIndex = 0;
    const imgElement = document.getElementById('rotating-cow');
    const slideshow = document.getElementById('cow-slideshow');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    const counterText = document.getElementById('modal-counter-text');

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

    function updateModalImage() {
        if (modalImg && counterText) {
            modalImg.style.opacity = '0';
            setTimeout(() => {
                modalImg.src = cowImages[modalIndex];
                counterText.textContent = `${modalIndex + 1} / ${cowImages.length}`;
                modalImg.style.opacity = '1';
            }, 200);
        }
    }

    function openModal() {
        modalIndex = currentIndex;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        updateModalImage();
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function nextImage() {
        modalIndex = (modalIndex + 1) % cowImages.length;
        updateModalImage();
    }

    function prevImage() {
        modalIndex = (modalIndex - 1 + cowImages.length) % cowImages.length;
        updateModalImage();
    }

    // Event listeners
    if (slideshow) {
        slideshow.addEventListener('click', openModal);
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalNext) {
        modalNext.addEventListener('click', nextImage);
    }

    if (modalPrev) {
        modalPrev.addEventListener('click', prevImage);
    }

    // Close modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        }
    });

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