// Table of Contents Generator and Scroll Spy
(function() {
  'use strict';

  function initTableOfContents() {
    const tocContainer = document.querySelector('.toc-container');

    if (!tocContainer) return;

    // Get target from data attribute or fall back to common selectors
    const targetSelector = tocContainer.getAttribute('data-toc-target') || '.post-content, .page-content, .content';
    const content = document.querySelector(targetSelector);

    if (!content) {
      tocContainer.style.display = 'none';
      return;
    }

    // Find all headings (H2 and H3)
    const headings = content.querySelectorAll('h2, h3');

    // Only show TOC if there are at least 3 headings
    if (headings.length < 3) {
      tocContainer.style.display = 'none';
      return;
    }

    // Generate TOC HTML
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    headings.forEach((heading, index) => {
      // Add ID to heading if it doesn't have one
      if (!heading.id) {
        heading.id = `section-${index}`;
      }

      const listItem = document.createElement('li');
      listItem.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-item toc-item-h3' : 'toc-item';

      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.className = 'toc-link';

      listItem.appendChild(link);
      tocList.appendChild(listItem);
    });

    const tocContent = tocContainer.querySelector('.toc-content');
    if (tocContent) {
      tocContent.appendChild(tocList);
    }

    // Smooth scroll behavior
    const tocLinks = tocContainer.querySelectorAll('.toc-link');
    tocLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

          // Update URL without jumping
          history.pushState(null, null, `#${targetId}`);
        }
      });
    });

    // Scroll spy - highlight active section
    let currentActive = null;

    function updateActiveLink() {
      const scrollPos = window.scrollY + 100; // Offset for better UX

      let activeHeading = null;
      headings.forEach(heading => {
        if (heading.offsetTop <= scrollPos) {
          activeHeading = heading;
        }
      });

      if (activeHeading && activeHeading !== currentActive) {
        // Remove previous active
        tocLinks.forEach(link => link.classList.remove('active'));

        // Add active to current
        const activeLink = tocContainer.querySelector(`a[href="#${activeHeading.id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
          currentActive = activeHeading;

          // Scroll the active link into view within the TOC container
          activeLink.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest'
          });
        }
      }
    }

    // Dynamic TOC positioning based on scroll
    function updateTocPosition() {
      // Only apply dynamic positioning on wide screens
      if (window.innerWidth <= 1300) return;

      const scrollY = window.scrollY;
      const startTop = 450;
      const endTop = 50;
      const scrollRange = 400; // Pixels to scroll before reaching final position

      // Calculate new top position
      let newTop = startTop - (scrollY / scrollRange) * (startTop - endTop);
      newTop = Math.max(endTop, Math.min(startTop, newTop));

      tocContainer.style.top = newTop + 'px';
    }

    // Throttle scroll event for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          updateActiveLink();
          updateTocPosition();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Initial call
    updateActiveLink();

    // Mobile toggle functionality
    const tocToggle = document.querySelector('.toc-toggle');
    if (tocToggle) {
      tocToggle.addEventListener('click', function() {
        tocContainer.classList.toggle('toc-expanded');
      });
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTableOfContents);
  } else {
    initTableOfContents();
  }
})();