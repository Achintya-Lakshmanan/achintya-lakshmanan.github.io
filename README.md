# Achintya Lakshmanan Portfolio

Personal portfolio site built with **Vite + React + TypeScript**, **Tailwind CSS**, and **Framer Motion**. Deployed as a static site to GitHub Pages at [https://achintya-lakshmanan.github.io](https://achintya-lakshmanan.github.io).

## Quick start

```bash
npm install
npm run dev      # local development
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Updating content

All site content lives in a single typed file:

```
src/data/content.ts
```

Edit the `content` object (and the TypeScript interfaces at the top of the file if you need new fields). Components render generically from these arrays. You do **not** need to touch UI code to add entries.

### Add a project

Append an object to `content.projects`:

```ts
{
  id: 'unique-slug',
  title: 'Project Title',
  period: 'Jan 2026 to Present',
  description: 'One or two sentences about what you built and the outcome.',
  tags: ['Python', 'PyTorch'],
  highlights: ['Optional bullet metrics'], // optional
  link: 'https://...', // optional
}
```

### Add experience

Append to `content.experience`. Set `category` to `'research'` or `'industry'` so the Experience tabs filter correctly:

```ts
{
  id: 'unique-slug',
  title: 'Role Title',
  organization: 'Lab or Company',
  period: 'Mon YYYY to Present',
  category: 'research', // or 'industry'
  highlights: [
    'Bullet point with impact / metrics.',
  ],
}
```

### Add education, skills, or achievements

- **Education** → `content.education` (`Education` interface)
- **Skills** → `content.skills` (group by category, list skill strings)
- **Achievements** → `content.achievements`
- **Bio / socials / tagline roles** → top-level fields on `content` (`bio`, `socials`, `taglineRoles`, etc.)

## Deploy to GitHub Pages

This repo is set up as a **user site** (`username.github.io`) with Vite `base: '/'`.

1. Push to the `main` branch of `Achintya-Lakshmanan/Achintya-Lakshmanan.github.io` (or your user-site repo).
2. In the GitHub repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow at `.github/workflows/deploy.yml` runs on every push to `main`: installs deps, builds, and deploys the `dist` folder via `actions/deploy-pages`.

You can also trigger a deploy manually from the **Actions** tab (`workflow_dispatch`).

## Project structure

```
src/
  data/content.ts     # ← all content (edit here)
  components/         # UI sections (generic over content arrays)
  hooks/              # scroll spy, reduced-motion helpers
  App.tsx
  main.tsx
  index.css
.github/workflows/deploy.yml
```

## Design notes

- Dark theme (`#0a0a0f`) with violet → cyan accent gradient
- Space Grotesk (display) + Inter (body) via `@fontsource`
- Scroll-reveal and hover micro-interactions respect `prefers-reduced-motion`
