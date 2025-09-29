# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-powered GitHub Pages website for "Thinking Cow" - a personal website accessible at https://www.thinkingcow.dev/. The site focuses on security research, digital privacy, and web development experiments with a dark minimalist theme.

## Build System

The site uses Jekyll with GitHub Pages for static site generation:
- **Jekyll**: Static site generator with Liquid templating
- **Sass**: CSS preprocessing with custom dark theme
- **Markdown**: Content authoring with front matter
- **GitHub Pages**: Automatic building and deployment

## Commands

### Local Development
```bash
# Install dependencies
bundle install

# Serve locally (if Jekyll installed)
bundle exec jekyll serve

# Build site
bundle exec jekyll build
```

### Content Management
- **Posts**: Add markdown files to `_posts/` with format `YYYY-MM-DD-title.md`
- **Pages**: Create `.md` files in root with front matter
- **Content**: Markdown files in `docs/` directory for reference

## Key Files

- `_config.yml` - Jekyll configuration and site settings
- `_layouts/` - Page templates (default, post, page)
- `_sass/main.scss` - Main stylesheet with dark theme variables
- `assets/css/style.scss` - CSS entry point
- `_posts/` - Blog posts in markdown format
- `mirror.html` - Interactive browser fingerprinting tool
- `Gemfile` - Ruby dependencies for GitHub Pages

## Architecture

Jekyll-based static site with:
- **Dark theme**: Custom Sass with CSS variables, monospace typography
- **Responsive layout**: Mobile-first design with 750px max-width
- **Navigation**: Home | About Me | Posts | Extras | Mirror
- **Content types**: Pages (markdown), Posts (markdown), Mirror tool (HTML/JS)
- **Collections**: Automatic post listing and pagination
- **SEO**: Jekyll SEO tag plugin integration

## Development Guidelines

### Content Creation
- **Blog posts**: Use `_posts/YYYY-MM-DD-title.md` format with front matter
- **Pages**: Create `.md` files with layout and permalink in front matter
- **Styling**: Modify `_sass/main.scss` for theme changes

### Deployment
- **GitHub Pages**: Automatic deployment from `main` branch
- **Custom domain**: Configured via `CNAME` file
- **Build**: GitHub automatically runs Jekyll build on push

### Theme Customization
- **Colors**: Modify CSS variables in `:root` selector
- **Typography**: Iosevka monospace font stack
- **Layout**: Responsive grid with mobile breakpoints


