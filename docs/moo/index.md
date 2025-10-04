<section class="posts-section">
    <div class="posts-header">
        <p>Browse all posts or <a href="{{ '/tags/' | relative_url }}">filter by tag</a></p>
    </div>

    {% for post in site.posts %}
    <article class="post-item">
        <a href="{{ post.url | relative_url }}" class="post-title">{{ post.title }}</a>
        <div class="post-date">{{ post.date | date: "%Y-%m-%d" }}</div>
        {% if post.excerpt %}
        <div class="post-excerpt">{{ post.excerpt | strip_html | truncate: 200 }}</div>
        {% endif %}
        {% if post.tags and post.tags.size > 0 %}
        <div class="post-tags-preview">
            {% for tag in post.tags limit:4 %}
                <a href="{{ '/tags/' | relative_url }}#{{ tag | slugify }}" class="tag-small">{{ tag }}</a>
            {% endfor %}
        </div>
        {% endif %}
    </article>
    {% endfor %}

    {% if site.posts.size == 0 %}
    <p>No posts yet. Check back soon!</p>
    {% endif %}
</section>

<style>
.posts-header {
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--border-color);
    font-size: 13px;
    opacity: 0.8;
}

.posts-header a {
    color: var(--link-color);
}

.post-tags-preview {
    margin-top: 10px;
    font-size: 11px;
}

.tag-small {
    display: inline-block;
    padding: 3px 8px;
    margin-right: 6px;
    margin-bottom: 4px;
    border: 1px solid var(--border-color);
    border-radius: 3px;
    color: var(--link-color);
    text-decoration: none;
    transition: all 0.2s ease;
}

.tag-small:hover {
    background: var(--link-color);
    color: var(--bg-color);
    border-color: var(--link-color);
}
</style>