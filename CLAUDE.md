# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Anam Ibn Jafar, deployed on GitHub Pages at `https://anam-jafar.github.io/my_resume/`. Pure static site — no build step, no package manager, no framework.

## Development

No build or install commands. Open `my_resume/index.html` directly in a browser or serve with any static server:

```bash
python3 -m http.server 8000 --directory my_resume
```

Deployment is automatic via GitHub Pages from the `main` branch.

## Architecture

All site content lives under `my_resume/`:

- **`index.html`** — Main single-page portfolio (hero, about, experience, projects, blog, contact sections) with hash-based navigation (`#home`, `#about`, `#experience`, `#projects`, `#blog`, `#contact`)
- **`blogs.html`** — Blog listing page
- **`other-experiences.html`** — Additional experiences page
- **`js/main.js`** — All JavaScript: particle canvas animation, theme toggle (localStorage-persisted), scroll reveals via IntersectionObserver, project modals with YouTube embeds, contact form (Web3Forms API), blog loading from Markdown
- **`css/style.css`** — Complete styling with CSS custom properties for dark/light theming. Fonts: Outfit (body), Space Grotesk (headings)
- **`assets/`** — Images, blog Markdown files (`blogs/`), resume PDF (`files/`), favicon (`img/`)

## Key Patterns

- **Theming**: CSS variables toggled via `[data-theme]` attribute on `<body>`. Theme preference stored in `localStorage`.
- **Contact form**: Submits to Web3Forms API — requires the access key in the form's hidden input.
- **Blog content**: Written as Markdown in `assets/blogs/`, loaded dynamically via fetch in JS.
- **Project data**: Defined as a JS data structure in `main.js` with metadata (title, description, tech stack, links, images).
