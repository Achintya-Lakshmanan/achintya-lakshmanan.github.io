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

### What lives where

- **Hero** → `badge`, `tokens`, `bio`, `now`, `terminal` (the `agent_loop.py` lines), `photo`, `socials`
- **Research** → `featured` (the large AURA card), `research` (the 2×2 grid; `tone` picks the status pill, `accent` the bar color), `publication`
- **Experience** → `experience`, listed in the order written (most recent first). The `t=` step badges count down automatically. `Prof. Rui Zhang` is linked wherever it appears in `context`, `bio`, or `now`.
- **Software** → `software` (optional `badge`, `images`, `caption`, `link`)
- **About** → `education`, `skills`, `achievements`, `alsoAchieved`

Keep the research grid at an even number of cards so no card sits alone on the last row.

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
  data/bars.ts        # deterministic heights for the decorative bar charts
  components/         # one component per section
  hooks/useScrollSpy.ts
  App.tsx
  main.tsx
  index.css           # design tokens and all styles
.github/workflows/deploy.yml
```

## Design notes

- Dark, LLM/RL-themed page: near-black ground (`#0A0C10`) with two accents only, mint `#7AF0C0` and violet `#A78BFA`.
- Bricolage Grotesque for display type, IBM Plex Sans for reading, IBM Plex Mono for labels.
- Theme motifs: the name split into tokens, an `agent_loop.py` terminal with a reward sparkline, logit-style bars on research cards, `t=` step badges on the experience timeline, and a rising reward curve behind the contact section. The bars are decorative and carry no data.
- 3D touches are CSS only: the tilted terminal, the arXiv cover, and the angled NotchNest screenshots, which flatten on hover.
- `prefers-reduced-motion` disables all animation. Content is prerendered, so it is readable without JavaScript.
- Check narrow-screen layouts at 320px and 390px when changing type sizes or copy.
- The design was worked out in a Claude design canvas before being built here.

## Content and metadata

- Verify factual claims against current notes and source code. Do not publish private paths, unpublished projects, draft metrics, or links to private repositories.
- AURA's current planner comparison differs from its historical four-proposal controller. Its heat reference is a calibration target, not a held-out behavioral prediction benchmark. Keep activity selection and execution outcomes separate.
- RAG links point to the actual public unified-prompt result table, not a nonexistent `results/tables/final_base_scores.csv` path. Do not merge adversarial-prompt, unified-prompt, faithfulness, and later replication conclusions.
- SQL search began as a course project. An upstream link identifies the decoder's lineage, not a public link to the private implementation. Do not claim equal-compute gains before that comparison exists.
- Haze leaderboard metrics are omitted until the challenge, track, and leaderboard can be identified. Do not invent an event name. Keep the résumé out until the user supplies the version they want to publish.
- Introduce the whole project before its technical mechanics. Do not turn every card into an experiment report or force constraints and features into a result slot. Keep negative findings and their scope in the evaluation notes, with an optional brief finding on the card.
- Update `index.html`, `public/social-card.svg`, `public/social-card.png`, `public/robots.txt`, and `public/sitemap.xml` together when the canonical URL or public positioning changes.
