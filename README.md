# Achintya Lakshmanan Portfolio

Personal portfolio site built with Vite, React, TypeScript, and Tailwind CSS. Deployed as a static site to GitHub Pages at [https://achintya-lakshmanan.github.io](https://achintya-lakshmanan.github.io).

## Quick start

```bash
npm install
npm run dev      # local development
npm run build    # production build → dist/
npm run check    # lint + production build
npm run preview  # preview the production build
npm run models   # rebuild the 3D models with Blender (only needed after editing scripts/models/tree.py)
```

## Updating content

All site content lives in a single typed file:

```
src/data/content.ts
```

Edit the `content` object (and the TypeScript interfaces at the top of the file if you need new fields). Components render generically from these arrays. You do **not** need to touch UI code to add entries.

### What lives where

- **Hero** → `hero` (`eyebrow`, `sub`, and `demo`, the caption on the live panel), `socials`. The headline sentence is in `components/Hero.tsx`.
- **Research** → `research.interests` (the lead), `research.current` (the three large cards: what each project asks, never what it found), `research.publication` (the compact published card and its two results), `research.earlier` (the haze-removal card).
- **Engineering** → `software`. Optional `badge`, `stats`, `team`, `images`, `caption`, `links`, and `frame` (an address shown in a browser bar above each screenshot).
- **Experience** → `experience`, most recent first, with a `points` list each. `short`, `start` and `end` (YYYY-MM; leave `end` out for a current role) place the role on the chart. `timeline.from` and `timeline.to` set the chart's range, so move `to` forward as time passes.
- **About** → `about` (paragraphs), `photo`, `education`, `achievements`, `skills`.
- **Contact** → `contactCopy`, `email`.

In any string rendered through `<RichText>` (hero `sub`, experience `points`), wrap a figure in `**double asterisks**` to highlight it. `Prof. Rui Zhang` is linked wherever it appears in those strings.

Keep `research.current` at three cards, or a multiple of three, so no card sits alone on a row.

## Deploy to GitHub Pages

This repo is set up as a **user site** (`username.github.io`) with Vite `base: '/'`.

1. Push to the `main` branch of `Achintya-Lakshmanan/Achintya-Lakshmanan.github.io` (or your user-site repo).
2. In the GitHub repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow at `.github/workflows/deploy.yml` runs on every push to `main`: installs deps, builds, and deploys the `dist` folder via `actions/deploy-pages`.

You can also trigger a deploy manually from the **Actions** tab (`workflow_dispatch`).

## Project structure

```
src/
  data/content.ts          # ← all content (edit here)
  scenes/stack.ts          # the renderer, colours and shared helpers, in both themes
  scenes/journey.ts        # the three.js scene behind the whole page: scroll, camera, labels; loaded on demand
  scenes/subject.ts        # what the journey needs from the object it shows
  scenes/subjects/tree.ts  # the object: a search tree, built from the Blender models
  scenes/subjects/tree.layout.json  # where every branch is; written by scripts/models/tree.py, never by hand
  scenes/subjects/stack.ts # the earlier layer stack, only loaded by the dev server for comparison
  scenes/portrait.ts       # three.js scene for the About photo drawn as points; loaded on demand
  components/              # one component per section, plus Journey (the page-long 3D scene and the gates between sections), Portrait (About photo), TileText (the letter-tile reveal) and Timeline (experience chart)
  hooks/usePageEffects.ts  # scroll reveal, progress line, parallax, card tilt, magnetic buttons
  hooks/                   # also scroll spy and theme toggle
  App.tsx
  main.tsx
  index.css                # design tokens and all styles
scripts/prerender.mjs      # renders the page to static HTML after the build
scripts/models/tree.py     # builds the 3D models in Blender
scripts/models/pack.mjs    # compresses them
public/models/tree.glb     # the result, fetched by the page
.github/workflows/deploy.yml
```

## 3D models

The search tree is modelled in Blender, from a script, so there is no `.blend` file to keep: `scripts/models/tree.py` is the source.

```bash
npm run models
```

This needs Blender 4.2 or later. It is looked for at `/Applications/Blender.app/Contents/MacOS/Blender`; set `BLENDER` to its path if it lives elsewhere. The command does two things:

1. `scripts/models/tree.py` runs inside Blender with no window. It lays out the branches of each of the five levels, builds every mesh, and writes `public/models/tree.glb` and `src/scenes/subjects/tree.layout.json`. The two files describe the same tree, so commit them together.
2. `scripts/models/pack.mjs` compresses the `.glb` with meshopt (about 1.8 MB down to 0.5 MB). three.js unpacks it as it loads.

What is in the file:

- `limbs_0` to `limbs_4`: each level's branches, as bevelled Bezier curves that fork off one another.
- `gems_0` to `gems_4`: the cut stones at the branch tips, and a halo around each stone of the first ring.
- `core`, `cage`, `gimbal_outer`, `gimbal_inner`: the crystal at a decision, the lattice around it, and the two rings of the gyroscope it sits in.
- `platter_glass`, `platter_frame`, `orbit`: the dial under a decision.
- `vertebra`: a collar of the trunk.

To see the models without the page, render previews from Blender:

```bash
/Applications/Blender.app/Contents/MacOS/Blender -b -P scripts/models/tree.py -- --preview some/folder
node scripts/models/pack.mjs   # the line above rewrites the .glb unpacked, so pack it again
```

How the page animates one mesh per level: every vertex of `limbs_N` and `gems_N` carries a `_twig` value saying which branch it is on. Each frame `tree.ts` writes every branch's brightness and sway into a small texture, and the shader looks its branch up there. Growth is a radius: nothing further from the trunk than `reach` is drawn, which is how the tree grows in on arrival and how the outermost ring appears in the close view.

The earlier layer stack is still in `scenes/subjects/stack.ts`. Under `npm run dev` a switcher in the bottom left corner swaps to it (`?design=stack`); production builds never load it.

## Hero prototypes

Six candidate hero animations live in `prototypes/`, on a page of their own that only the dev server serves. The first (the model) became the hero and the fifth (particles) became the About photo; the rest are kept for reference and can be deleted:

```bash
npm run dev
# then open http://localhost:5173/prototypes.html
```

Switch between them with the tabs or the number keys 1 to 6. The page is not part of the production build, so nothing in `prototypes/` ships until one is chosen and moved into `src/`. `cannon-es` (physics for the letter blocks) and `@fontsource-variable/bricolage-grotesque` (the variable font for the living type) are dev dependencies for the same reason.

## Design notes

- Two accents only, mint `#7AF0C0` and violet `#A78BFA`, on a near-black ground. A light theme mirrors the same tokens (`:root[data-theme='light']` in `index.css`). The navbar toggle saves the choice; first visits follow the system setting.
- **The page is a trip through a search tree.** One canvas sits behind the whole page (`scenes/journey.ts`, mounted by `components/Journey.tsx`). It shows a trunk of five decisions, each with the branches it explored spread over a glass dial, and rollouts running out along them as beads of light. Each decision is a section of the page; the list is `LAYERS` in `components/layers.ts`.
  - In the hero, which is taller than the screen with its contents pinned, scrolling pulls the levels apart and names them. A label, or the level itself, jumps to that section. The pointer turns the tree.
  - Before each section there is an empty stretch of page, a `<Gate />` in `App.tsx`. There the camera picks out that section's level and dives until it is leaning over it and the level fills the screen.
  - The section is then read on top of its level, through a veil of the page colour (`.journey .section` in `index.css`). The level grows a further ring of branches, and they light one after another as the section goes by. At the end the camera pulls back out and moves on to the next level.
  - The length of each flight is the gate height, `.journey .gate` in `index.css`. The timing inside a gate is `PICK_BY` and `DIVE_FROM` in `scenes/journey.ts`.
- **The name arrives as tiles.** `TileText` renders the real text, then scrambles each letter and lets it settle. The text is in the prerendered page, so it reads correctly without scripts and for screen readers.
- **The About photo is drawn as points** sampled from a square around the face (`CROP` in `scenes/portrait.ts`; adjust it if the photo changes). They fly in when the photo scrolls into view and scatter away from the pointer. Without WebGL the ordinary photo stays.
- **Reduced motion.** With the system setting on, the page is an ordinary one: no gates, opaque sections, and the model sits still in the hero, where scrolling still opens it. The portrait appears already assembled, and the parallax stays still. The Play button in the bottom right corner turns the full journey on, and that choice is saved (`localStorage` key `motion`). The class `journey` on `<html>`, set by the inline script in `index.html`, is what switches the page between the two.
- The scene follows the theme: glowing branches on the dark ground, inked ones on the light one, with the ground matched to the page colour. three.js is a separate chunk (about 130 KB gzipped) and the models are another 0.5 MB, both fetched after the text is on screen. If WebGL is unavailable, or the models fail to load, the page falls back to the ordinary one.
- The experience chart has one labelled row per role, drawn to scale from the `start` and `end` dates. The filter chips above it are its colour legend. Each row shows the organization's logo and name. Hovering a row highlights the matching entry below and the other way round; clicking a row keeps it highlighted. Neither the chart nor the filter chips ever move the page.
- Motion: headings and the name rise into place, sections reveal on scroll, large outlined section numbers move slower than the page, cards lean toward the pointer. All of it is off under `prefers-reduced-motion`.
- Content is prerendered, so it is readable without JavaScript.
- Organization logos live in `public/logos` and sit on white tiles; a missing or broken logo falls back to a monogram.
- Bricolage Grotesque for display type, IBM Plex Sans for reading, IBM Plex Mono for labels.
- Check narrow-screen layouts at 320px and 390px when changing type sizes or copy.

## Content and metadata

- Verify factual claims against the résumé and source code. Do not publish private paths, draft metrics, links to private repositories, or a phone number.
- Unpublished research (AURA, steering, DPO for secure code) gets a question and a one-line description only. No results, scale figures or target venues until the papers are out.
- The DPO project is separate from the published paper and does not involve steering. Do not describe it as a follow-up.
- The haze challenge's name is not on the site because it has not been confirmed. Do not invent one.
- The published paper's figures (3,242 programs, 96% fewer vulnerabilities, 58.55% → 22.19%) are the ones in its arXiv abstract.
- The context-sharing and search-guided SQL projects are left off the site for now, as are the résumé and CV downloads.
- Say what was built by whom on team projects (`built` and `team`).
- Update `index.html`, `public/social-card.svg`, `public/social-card.png`, `public/robots.txt`, and `public/sitemap.xml` together when the canonical URL or public positioning changes.
