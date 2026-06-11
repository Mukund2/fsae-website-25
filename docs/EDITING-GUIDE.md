# Editing Guide — SJSU Spartan Racing Website

This guide is for **future club members keeping the site up to date**. You do **not**
need to be a programmer. Almost everything is changed by editing one file and copying
an existing block. Each section below gives you the exact file and a copy-paste example.

If you get stuck, the matching data files also have short instructions written right
above the part you edit (look for the `HOW TO EDIT` comment blocks).

---

## Contents

1. [How editing works (read this first)](#1-how-editing-works-read-this-first)
2. [Add or remove a newsletter](#2-add-or-remove-a-newsletter)
3. [Add or edit a car](#3-add-or-edit-a-car)
4. [Add or edit a sponsor](#4-add-or-edit-a-sponsor)
5. [Edit team leads & subteams](#5-edit-team-leads--subteams)
6. [Edit the FAQ](#6-edit-the-faq)
7. [Where race results live](#7-where-race-results-live)
8. [Change the hero (background) video](#8-change-the-hero-background-video)
9. [Change the homepage "Highlights" slideshow](#9-change-the-homepage-highlights-slideshow)
10. [Edit text/copy on a page](#10-edit-textcopy-on-a-page)
11. [Merch store (Fourthwall)](#11-merch-store-fourthwall)
12. [Social links & contact info](#12-social-links--contact-info)
13. [Working with images](#13-working-with-images)
14. [Troubleshooting](#14-troubleshooting)
15. [Page → file map](#15-page--file-map)
16. [Known issues / future cleanup](#16-known-issues--future-cleanup)

---

## 1. How editing works (read this first)

The website content lives in plain text files. To make a change you:

1. **Open the project** and start the preview:
   ```bash
   npm install     # only the very first time
   npm run dev
   ```
   Open **http://localhost:3000** in your browser. As you save files, the page updates.

2. **Edit the file** for whatever you want to change (each section below tells you which).

3. **Check it** in the browser preview.

4. **Publish it:**
   ```bash
   npm run build           # makes sure there are no errors
   git add -A
   git commit -m "Describe your change"
   git push                # pushes to the main branch
   ```
   Vercel automatically rebuilds and the live site updates in ~1–2 minutes.

**Two rules that save you pain:**
- Keep the **commas, quotes, and `{ }` brackets** exactly as in the examples. The
  easiest way to add something is to **copy an existing block** and change the words.
- Run `npm run build` before pushing. If it prints an error, it tells you the file
  and line — usually a missing comma or quote.

---

## 2. Add or remove a newsletter

**File:** `src/components/home/newsletter.tsx`
**Shows on:** the homepage "Newsletters" section.

Newsletters are displayed as a flip-through of **image scans** (one image per page).

**To add one:**

1. Export each page of the newsletter as a JPG image.
2. Create a new folder: `public/images/newsletters/<folder-name>/`
   (use a short lowercase name with dashes, e.g. `september-2026`).
3. Put the pages inside, named **`page-01.jpg`, `page-02.jpg`, … `page-NN.jpg`**
   (always two digits — `page-01`, not `page-1`).
4. In `newsletter.tsx`, add **one line at the top** of the `newsletters` list:

   ```ts
   { date: "September 2026", title: "Your Title", pages: makePages("september-2026", 12) },
   ```
   - `date` — shown as the label (any text).
   - `title` — the newsletter's name.
   - `makePages("september-2026", 12)` — the **folder name** and the **number of pages**.

   The **newest newsletter goes first** (top of the list).

**To remove one:** delete its line (and optionally its image folder).

---

## 3. Add or edit a car

**File:** `src/data/cars.ts`
**Shows on:** the `/cars` page.

Cars are listed **newest first**. To add the latest car, copy a block to the **top**:

```ts
{
  slug: "sr-18",                                  // unique id, lowercase
  name: "SR-18",
  years: "2027-2026",                             // the FIRST year is shown big on the card
  badge: "Current Car",                           // optional small label (or delete this line)
  image: "/images/history/cars/sr-18.jpg",        // put the photo in public/images/history/cars/
  motor: "Emrax 228",                             // optional spec chips — delete any you don't have
  torque: "162 ft-lbs",
  battery: "8.4 kWh",
  description: "Add documented race results here.", // optional — leave out if you have no results
},
```

**Important:** only fill in `description` with **real, documented** results. If you don't
have results for a car yet, just leave that line out — the card will show the photo,
name, year, and specs. Don't invent numbers.

If you add a `"Current Car"` badge to the new car, remove it from the previous one.

---

## 4. Add or edit a sponsor

Sponsors appear in **two places**, and each has its own list:

**A) The Sponsors page (`/sponsors`)** — `src/data/sponsors.ts`

```ts
{
  name: "Acme Corp",
  tier: "gold",                          // title | platinum | gold | silver | bronze | partner
  url: "https://www.acme.com",           // optional — links the logo to their site
  logo: "/images/sponsors/acme.png",     // optional — put the logo in public/images/sponsors/
},
```
If you leave out `logo`, the sponsor's **name** shows as text instead of a logo.

**B) The scrolling logo strip on the homepage** — `src/components/home/sponsor-strip.tsx`

This is a **separate** list (the `SPONSORS` array near the top). Add the same kind of
block there too if you want the sponsor in the homepage scroller. **Update both lists**
when adding a major sponsor.

> Tip: logos look best as transparent PNG or SVG. See [Working with images](#13-working-with-images).

---

## 5. Edit team leads & subteams

**File:** `src/data/team.ts`

This file has **two lists**:

- **`team`** — the people shown on the **Leads** page (`/team`).
  ```ts
  { name: "Jane Doe", role: "Team Captain", image: "/images/team/jane-doe.jpg", linkedin: "https://linkedin.com/in/janedoe" },
  ```
  Put each person's photo in `public/images/team/`.

- **`subteams`** — the subteam cards on the **About** page (`/about`). Copy an existing
  block and change the fields (the file's comment lists exactly which fields it uses).

> Note: the names currently in this file are placeholders — replace them with the real
> roster.

---

## 6. Edit the FAQ

**File:** `src/data/faq.ts`
**Shows on:** the `/faq` page.

```ts
{
  question: "Your question here?",
  answer: "Your answer here.",
  category: "General",        // groups it under a tab; reuse an existing category or add a new one
},
```
Questions with the same `category` are grouped under the same tab. Existing categories
include `General` and `Membership`. To create a new tab, just use a new category name.

---

## 7. Where race results live

There is no separate "results" data file. Race results appear in two places:

- **On each car's card** (`/cars`) — written in that car's `description` in
  `src/data/cars.ts` (see [section 3](#3-add-or-edit-a-car)). This is where you add a
  car's competition finishes.
- **As text on the Racing page** (`/racing`) — `src/app/racing/racing-content.tsx`.
  Edit the wording directly in that file.

Only add **real, documented** results — don't invent placements.

---

## 8. Change the hero (background) video

The big looping video at the top of the homepage is a file, not code.

- **Replace** `public/videos/hero-broll.mp4` with your new video, keeping the **same
  filename** (`hero-broll.mp4`). That's it.
- Keep it compressed (a few MB, not hundreds) so the page loads fast. Export at 1080p,
  H.264, no audio.

The component that plays it is `src/components/home/car-showcase.tsx` if you ever need
to adjust how it's displayed.

---

## 9. Change the homepage "Highlights" slideshow

**File:** `src/components/home/image-slideshow.tsx`
**Shows on:** the homepage, under the sponsors strip ("Highlights from SR-17 Unveiling").

- The images are listed in the `SLIDES` array as paths like
  `"/images/slideshow/slide-01.jpg"`. Replace or add paths there.
- Put the actual image files in `public/images/slideshow/`.
- The caption text ("Highlights from SR-17 Unveiling") is the `<p>` near the bottom of
  the same file — change the words there.

---

## 10. Edit text/copy on a page

Each page is a file under `src/app/<page>/`. The visible text is written directly in the
page file — search for the words you see on the site and change them.

Examples:
- Homepage sections: `src/app/page.tsx` plus the files in `src/components/home/`.
- About page intro: `src/app/about/page.tsx`.
- Contact details: `src/app/contact/page.tsx`.

Tip: in your editor, use "Find in Files" (search the whole `src` folder) for the exact
text you want to change — it'll take you straight to the right file.

---

## 11. Merch store (Fourthwall)

The `/merch` store is **powered by Fourthwall** — products are pulled in automatically
from the Fourthwall dashboard, so you don't edit product code here.

- **To add / edit / remove products:** do it in the **Fourthwall dashboard**. The
  website shows whatever is live there.
- **Connection:** the site needs two secrets in `.env.local` (see the README):
  `FOURTHWALL_STOREFRONT_TOKEN` and `FOURTHWALL_SHOP_DOMAIN`. On Vercel, these are set
  in **Project → Settings → Environment Variables**.
- The code that talks to Fourthwall is `src/lib/fourthwall.ts` — you normally won't
  touch it.

---

## 12. Social links & contact info

**File:** `src/lib/constants.ts` — update the `SOCIAL_LINKS` (Instagram, LinkedIn,
Facebook). These feed the footer and the contact page in one place.

Other contact details (email, etc.) live on the contact page: `src/app/contact/page.tsx`.

---

## 13. Working with images

- All images live under `public/images/`, grouped by area
  (`sponsors/`, `team/`, `slideshow/`, `history/cars/`, `newsletters/<folder>/`, …).
- In code you reference them **without** the word `public` — e.g. a file at
  `public/images/team/jane.jpg` is written as `"/images/team/jane.jpg"`.
- **File names:** lowercase, no spaces, use dashes (`jane-doe.jpg`, not `Jane Doe.jpg`).
- **Keep them reasonably sized** (web photos ~1200–1600px wide, a few hundred KB). Huge
  images make the site slow. You can shrink them with any image tool, or:
  ```bash
  # example: resize to max 1600px wide and compress (needs ImageMagick)
  magick input.jpg -resize "1600x1600>" -quality 85 output.jpg
  ```

---

## 14. Troubleshooting

- **A change isn't showing up live:** make sure you `git push`ed, wait ~2 minutes for
  Vercel, then hard-refresh (Cmd/Ctrl+Shift+R).
- **`npm run build` shows an error:** read the file + line number it prints. Usually a
  missing comma, quote, or bracket near where you edited. Compare to a neighbor block.
- **An image is broken / blank:** check the path matches the real file exactly (case
  matters), and that the file is under `public/`.
- **The dev server won't start:** delete the `node_modules` folder and run
  `npm install` again.
- **Merch page is empty:** the Fourthwall environment variables are probably missing or
  wrong (see [section 11](#11-merch-store-fourthwall)).

---

## 15. Page → file map

| URL | File |
|---|---|
| `/` (home) | `src/app/page.tsx` + `src/components/home/*` |
| `/about` (subteams) | `src/app/about/page.tsx` |
| `/team` (leads) | `src/app/team/page.tsx` + `src/data/team.ts` |
| `/cars` | `src/app/cars/page.tsx` + `src/data/cars.ts` |
| `/racing` | `src/app/racing/*` |
| `/sponsors` | `src/app/sponsors/*` + `src/data/sponsors.ts` |
| `/sponsors/become-a-sponsor` | `src/app/sponsors/become-a-sponsor/*` |
| `/merch`, `/merch/[slug]` | `src/app/merch/*` (products from Fourthwall) |
| `/support` | `src/app/support/page.tsx` |
| `/contact` | `src/app/contact/page.tsx` |
| `/faq` | `src/app/faq/*` + `src/data/faq.ts` |

---

## 16. Known issues / future cleanup

For whoever does development work later (not content edits):

- **Placeholder data:** `src/data/team.ts` still has sample names — replace them with
  the real roster.
- **Lint:** `npm run lint` is clean except for one harmless `exhaustive-deps` warning in
  `src/hooks/use-scroll-reveal.ts`. Safe to leave.
- **Styling convention:** entrance/hover effects use CSS `@keyframes` (not `transition:`)
  on purpose — match that pattern when adding new animated components.
