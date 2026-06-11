# SJSU Spartan Racing — Team Website

The official website for San José State University's Formula SAE team. Built with
Next.js (App Router), React, TypeScript, and Tailwind CSS; deployed on Vercel.

> **New here / non-developer?** Read **[docs/EDITING-GUIDE.md](docs/EDITING-GUIDE.md)** —
> it explains, in plain language, how to change every part of the site (add a
> newsletter, add a car, edit sponsors, swap the hero video, etc.) with copy-paste
> examples. This README is the technical overview.

---

## Quick start

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the local dev server
```

Then open **http://localhost:3000**. The site reloads automatically as you edit files.

Other commands:

```bash
npm run build    # production build (run this before pushing to catch errors)
npm run start    # serve the production build locally
npm run lint     # check code style
```

**Requirements:** [Node.js](https://nodejs.org) 20 or newer.

---

## Environment variables

Create a file named `.env.local` in the project root. It is **not** committed to
git (it holds secrets). Only the **merch store** needs these:

```bash
FOURTHWALL_STOREFRONT_TOKEN=ptkn_xxxxxxxx   # from the Fourthwall dashboard
FOURTHWALL_SHOP_DOMAIN=your-shop.fourthwall.com
```

Everything else on the site works without any environment variables. If these are
missing, only the `/merch` page is affected.

---

## Deploying

The site is hosted on **Vercel** and deploys automatically:

1. Commit your changes and **push to the `main` branch**.
2. Vercel builds and publishes within ~1–2 minutes.
3. Refresh the live site (hard-refresh with Cmd/Ctrl+Shift+R to bypass cache).

If a deploy fails, it's almost always a build error — run `npm run build` locally
first; it will show the same error with the file and line number.

---

## Project structure

```
src/
  app/                 Each folder = one page (URL). e.g. app/cars/page.tsx → /cars
    layout.tsx         Wraps every page (navbar, footer, fonts)
    globals.css        Global styles, colors, and animations
  components/          Reusable UI pieces, grouped by area
    home/              The sections that make up the homepage
    layout/            Navbar, footer
    cars/ about/ team/ merch/  …feature-specific components
  data/                ← EDIT THESE to change content (cars, sponsors, team, FAQ…)
  lib/                 Helpers (fonts, social links, Fourthwall merch client)
  hooks/               Small reusable React hooks
  types/               TypeScript type definitions
public/
  images/              All images, grouped by area (sponsors, team, slideshow…)
  videos/              The hero background video
docs/
  EDITING-GUIDE.md     Plain-language "how to change X" instructions
```

### Where do I change…?

| To change… | Edit this file |
|---|---|
| The cars on `/cars` | `src/data/cars.ts` |
| Sponsors (sponsors page) | `src/data/sponsors.ts` |
| Sponsor logos scrolling on the homepage | `src/components/home/sponsor-strip.tsx` |
| Team leads / subteams | `src/data/team.ts` |
| FAQ | `src/data/faq.ts` |
| Race results | each car's `description` in `src/data/cars.ts`; racing copy in `src/app/racing/racing-content.tsx` |
| Newsletters | `src/components/home/newsletter.tsx` |
| Homepage "Highlights" slideshow | `src/components/home/image-slideshow.tsx` |
| Hero background video | replace `public/videos/hero-broll.mp4` |
| Social media links | `src/lib/constants.ts` |
| Merch products | the Fourthwall dashboard (auto-synced) |

Full step-by-step instructions for each are in **[docs/EDITING-GUIDE.md](docs/EDITING-GUIDE.md)**.

---

## Pages

`/` home · `/about` subteams · `/team` leads · `/cars` car lineage ·
`/racing` competition · `/sponsors` (+ `/sponsors/become-a-sponsor`) ·
`/merch` (+ `/merch/[slug]`) · `/support` · `/contact` · `/faq`

---

## Tech notes

- **Framework:** Next.js (App Router) — pages are folders under `src/app`.
- **Styling:** Tailwind CSS v4. Theme colors/animations live in `src/app/globals.css`.
- **Animations:** plain CSS `@keyframes` + an IntersectionObserver scroll-reveal
  pattern (no animation libraries). Avoid CSS `transition:` for entrance/hover —
  use keyframes, matching the existing components.
- **Merch:** pulled live from Fourthwall's Storefront API (`src/lib/fourthwall.ts`).
- **Newsletters:** displayed as a page-flip "flipbook" of image scans.
