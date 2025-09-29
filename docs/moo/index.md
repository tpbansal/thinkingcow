<section class="posts-section">

    {% for post in site.posts %}
    <article class="post-item">
        <a href="{{ post.url | relative_url }}" class="post-title">{{ post.title }}</a>
        <div class="post-date">{{ post.date | date: "%Y-%m-%d" }}</div>
        {% if post.excerpt %}
        <div class="post-excerpt">{{ post.excerpt | strip_html | truncate: 200 }}</div>
        {% endif %}
    </article>
    {% endfor %}

    {% if site.posts.size == 0 %}
    <p>No posts yet. Check back soon!</p>
    {% endif %}
</section>