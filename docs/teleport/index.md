<section class="posts-section">
    <h2>Recent Posts</h2>

    {% for post in site.posts limit:3 %}
    <article class="post-item">
        <a href="{{ post.url | relative_url }}" class="post-title">{{ post.title }}</a>
        <div class="post-date">{{ post.date | date: "%Y-%m-%d" }}</div>
        <div class="post-excerpt">{{ post.excerpt | strip_html | truncate: 200 }}</div>
    </article>
    {% endfor %}
</section>

<section class="posts-section">
    <h2>Quick Links</h2>
    <article class="post-item">
        <a href="/saltlick/digital-mirror/" class="post-title">Digital Mirror</a>
        <div class="post-excerpt">See what information your browser exposes to websites. A comprehensive tool for understanding your digital fingerprint.</div>
    </article>
</section>