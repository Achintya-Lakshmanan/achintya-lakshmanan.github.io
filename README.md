# Achintya Lakshmanan Portfolio

Personal portfolio site built with Vite, React, TypeScript, and Tailwind CSS. Deployed as a static site to GitHub Pages at [https://achintya-lakshmanan.github.io](https://achintya-lakshmanan.github.io).

## Quick start

```bash
npm install
npm run dev      # local development
npm run build    # production build → dist/
npm run check    # lint + production build
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
  subtitle: 'Optional short subtitle',
  tagline: 'One-line hook shown large at the top of the card.',
  period: 'Jan 2026 to Present',
  kind: 'research', // or 'build'
  scope: 'personal', // for builds: 'personal' or 'team'; omit for research
  context: 'Course project', // optional project origin or collaboration label
  summary: 'A concise description of the project and the problem it addresses.',
  contribution: 'A short, visible description of what you personally built.',
  highlight: 'Optional finding or recognition. Omit when there is no result.',
  approach: 'Optional. The technical write-up in the expandable panel; omit to hide it.',
  tags: ['Python', 'PyTorch'],
  evidence: ['A result, limitation, or honest current status.'],
  status: 'Evaluation in progress', // optional
  study: [{ label: 'Controlled comparison', text: 'What stays fixed and what changes.' }], // optional protocol inside details
  images: [{ src: '/projects/app.png', alt: 'Description of the app view', width: 1080, height: 574 }], // optional
  imageCaption: 'Actual app view with sample data.',
  links: [ // optional; only add verified public URLs
    { label: 'Project repository', href: 'https://...', kind: 'github' },
  ],
}
```

### Add experience

Append to `content.experience`. Keep two or three concise bullets per role. Entries are sorted by start date, most recent first:

```ts
{
  id: 'unique-slug',
  title: 'Role Title',
  organization: 'Lab or Company',
  period: 'Mon YYYY to Present',
  category: 'research', // or 'teaching' / 'industry'
  context: 'What the product or research group does.',
  highlights: [
    'Bullet point with impact / metrics.',
  ],
}
```

### Add education, skills, or achievements

- **Education** → `content.education` (`Education` interface)
- **Skills** → `content.skills` (group by category, list skill strings)
- **Achievements** → `content.achievements`
- **Hero / socials** → top-level fields on `content` (`positioning`, `bio`, `socials`, etc.)

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

- Warm paper, charcoal text, and terracotta accents. Full-width project panels use muted backgrounds, with dark green reserved for AURA.
- Inter for reading and Georgia italic for the name and contact heading.
- The page order is research, experience, then software. Industry work appears only under experience. Software is grouped into personal software and team projects. Set a build's `scope` to put it in the right group. Each panel leads with what the project does and a short, visible personal contribution. Status labels are visible. Add a compact finding or recognition only where one exists. Methods, full evaluation notes, and the featured protocol expand across the full panel width.
- Projects are text-led. App images must come from the app itself. The NotchNest gallery uses its own SwiftUI view renders with sample data, labelled as such. No invented diagrams or interface mockups are used.
- Type entrances, panel reveals, and hover feedback supply motion. The navigation includes a pause control, the rotating hero accent pauses offscreen, and `prefers-reduced-motion` disables animation. Content remains visible without JavaScript.
- Check narrow-screen layouts at 320px and 390px when changing type sizes or copy.
- The original layout study is preserved on `codex/portfolio-design-study`. An earlier motion study is on `codex/motion-project-study`. The user rejected its diagram-based graphics and selected full-width project panels. App imagery was reintroduced by request on September 30, 2026.
- The project scale and transitions take cues from [Giats's project gallery](https://giats.me/projects), found through [Awwwards](https://www.awwwards.com/sites/https-giats-me). [Jordan Delcros](https://jordan-delcros.com/) was also reviewed, but its immersive 3D approach was not used. Earlier typography references were [Dennis Snellenberg](https://dennissnellenberg.com/) and [Gianluca Gradogna](https://gianlucagradogna.com/). No reference-site text, code, or assets were copied.

## Content and metadata

- Verify factual claims against current notes and source code. Do not publish private paths, unpublished projects, draft metrics, or links to private repositories.
- AURA's current planner comparison differs from its historical four-proposal controller. Its heat reference is a calibration target, not a held-out behavioral prediction benchmark. Keep activity selection and execution outcomes separate.
- RAG links point to the actual public unified-prompt result table, not a nonexistent `results/tables/final_base_scores.csv` path. Do not merge adversarial-prompt, unified-prompt, faithfulness, and later replication conclusions.
- SQL search began as a course project. An upstream link identifies the decoder's lineage, not a public link to the private implementation. Do not claim equal-compute gains before that comparison exists.
- Haze leaderboard metrics are omitted until the challenge, track, and leaderboard can be identified. Do not invent an event name. Keep the résumé out until the user supplies the version they want to publish.
- Introduce the whole project before its technical mechanics. Do not turn every card into an experiment report or force constraints and features into a result slot. Keep negative findings and their scope in the evaluation notes, with an optional brief finding on the card.
- Update `index.html`, `public/social-card.svg`, `public/social-card.png`, `public/robots.txt`, and `public/sitemap.xml` together when the canonical URL or public positioning changes.
