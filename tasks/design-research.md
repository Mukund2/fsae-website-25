# Design Research Notes — April 2026

Goal: Warm (not dark) design with gold/blue palette, reduced white space, more animations, professional cohesive look.

---

## 1. Framehaus (framehaus.vercel.app)

### Background Texture (NOT polka dots — it's a grain overlay)
Framehaus uses a `body::before` pseudo-element with two overlapping radial gradients at different scales (3px and 7px) at very low opacity (`rgba(28,26,23, .018)` and `.012`) with `mix-blend-mode: multiply`. This creates a subtle film grain / noise effect on top of a warm cream background. It's tactile and adds analog warmth without being distracting.

**CSS technique to adapt:**
```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(28,26,23,.018) 1px, transparent 0),
    radial-gradient(circle at 2px 2px, rgba(28,26,23,.012) 1px, transparent 0);
  background-size: 3px 3px, 7px 7px;
  mix-blend-mode: multiply;
}
```

### Image Styling — "Cinematic" treatment
- **Multi-layered shadows:** `0 24px 60px -24px rgba(28,26,23,.4)` + `0 8px 22px -10px rgba(28,26,23,.18)` — creates depth without heaviness
- **Subtle filter adjustments:** `saturate(.9) contrast(1.03)` — muted, professional tones
- **Rounded corners:** Small `border-radius: 4px`
- **Gradient overlays:** Linear/radial overlays from transparent to dark `rgba(28,26,23, .3-.45)` at the bottom of images
- **Captions:** Positioned bottom-left/right, semi-transparent background, text-shadow. Positioned slightly off-center for editorial feel.

### Full-Width Layout Break
Uses a `.still-full` class that escapes the constrained container (1180px `max-width`):
- `max-width: 100%; padding: 0; margin: 100px 0 0;`
- `border-radius: 0` (no rounding on full-bleed)
- `aspect-ratio: 21/9` — cinematic ultrawide
- Captions shift to `left: 42px; right: 42px` for breathing room

**Takeaway for us:** One or two images per page section should break out of the content container for visual variety and impact.

### Color Palette
- **Creams (backgrounds):** `#F3EFE3`, `#EBE6D5`, `#D9D2BA`
- **Inks (text):** `#1C1A17` (near-black) through `#9A9485` (taupe)
- **Accents:** Clay/burnt terracotta `#B03A1C`, oxblood `#7A2A2A`, muted gold `#B08328`
- **Lines/borders:** `#C8C0A4`, `#DDD6BE`

**Relevance to us:** Their warm cream + gold + clay palette is very close to what we want. We'd substitute our gold and Spartan blue while keeping the warm cream base.

### Typography System
- **Serif display:** Fraunces (variable font, SOFT axis for curvature)
- **Sans body:** Instrument Sans
- **Mono labels:** IBM Plex Mono
- Three font families = clear hierarchy without chaos

**Relevance:** We already use Chakra Petch (display), Space Grotesk (body), JetBrains Mono (labels). Good parallel. Consider adding font-variation-settings for more nuance.

### Animations & Hover Effects
- **Nav stick:** Adds `stuck` class on scroll > 40px, triggers padding/blur transitions (`.3s cubic-bezier(0.2, 0.8, 0.2, 1)`)
- **Backdrop blur on nav:** `backdrop-filter: blur(14px) saturate(1.3)`
- **Image hover:** `transform: scale(1.02)` + filter shift to `saturate(1) contrast(1.05)` (1s ease)
- **Button hover:** Color shift + `translateY(-1px)` (lift effect)
- **Link underline:** Expands from 14px to 22px on hover
- **Carousel/marquee:** Infinite loop via `requestAnimationFrame`, pauses on hover

**IMPORTANT:** Since CSS transitions freeze our site, implement these via `@keyframes` or `requestAnimationFrame` only. The cubic-bezier values and timing are still useful reference.

### Overall Aesthetic
Refined minimalism with cinematic sensibility. Anti-template. Handcrafted feel from variable fonts, film grain, and intentional imperfection.

---

## 2. Anduril (anduril.com)

### Card/Grid Layout System
- **Masonry-style grid** with varying card dimensions
- Cards have `tall` and `wide` layout classes creating visual dynamism
- Breakpoints: desktop (full) and 768px (tablet/mobile)
- Grid maintains alignment despite different card sizes

### Card Design Patterns
- **Image-dominant:** High-quality imagery fills most of the card
- **Flat design:** No visible drop shadows — cards rely on image prominence
- **Minimal text overlay:** Short taglines directly on cards
- **Clean borders:** Subtle or no borders
- **Interactive CTAs:** Seamlessly integrated into card structure

### "Qualities" Card Pattern (from careers page)
Instead of showing people, they show value cards:
- Each card: **Single-word title** + **2-3 sentence description** + **High-quality image**
- Emphasizes culture/values over individual bios
- Clean, conceptual approach

**Takeaway for team leads:** We could combine this with people photos — a card with the person's photo, their name, role title, and a short value statement about their subteam. Keep it conceptual, not just a headshot grid.

### Color & Typography
- **Palette:** Deep black (#000), signature lime-green accent (#DFF140), neutral grays, white
- **Typography:** HelveticaNowDisplay (Hairline through ExtraBold), Elios-Regular for accents
- **Hierarchy:** Font weight differentiation, image size variation, strategic spacing

### Animations
- Progress bar: `all 1000ms ease` transitions
- Image preloading with responsive resolution
- Smooth CSS transitions for interactive states

### Overall Aesthetic
Minimalist brutalism meets high-tech precision. Heavy white space, bold typography, strategic imagery. The lime-green accent is memorable against the dark palette.

**What to adapt:** The card sizing variation (tall/wide), image-dominant cards, and conceptual value statements. NOT the dark palette or brutalist feel.

---

## 3. Ditto (ditto.ai)

Could not fully access the site (403 error). Based on search research:

### Brand Approach
- Positions as anti-swipe dating — curated matches via AI
- Clean, modern, approachable aesthetic
- Creates "match posters" as a brand artifact — visual identity through a consistent format

### Typography
- **Poppins** (geometric sans-serif) as primary typeface, multiple weights (100-900)
- Conveys approachability and modernity

### Design Philosophy
- Simplicity and clarity over feature overload
- Consistent UI patterns (standardized border-radius .375rem-50rem)
- Accessibility-conscious (respects reduced-motion preferences)
- Mobile-first responsive grid

**Limited data available.** The key takeaway is brand coherence through a consistent visual artifact/format and approachable typography.

---

## 4. MRacing (University of Michigan FSAE)

### What Works
- **Michigan blue + gold palette** — strong institutional identity with contemporary appeal
- **24-column grid** (desktop), 8-column (mobile) — sophisticated responsive system
- **Hero image + Instagram feed gallery** — balances storytelling with social proof
- **50px margins** in gallery blocks for breathing room
- **Sticky header** with clear navigation
- **Sponsor showcase** with prominent logo placement
- **Social integration** (Instagram, YouTube, LinkedIn)

### Navigation Structure
Team | Cars & History (subcategories) | Join | Sponsors + Donate/Contact CTAs

**What to adapt:** The blue/gold palette is exactly our target. Their sponsor and social integration patterns are worth emulating.

---

## 5. General Sports Website Design Best Practices (2025-2026)

### Key Principles
1. **Team colors as strategic accents** — headers, buttons, and key UI elements, not everywhere
2. **Bold typography + full-bleed imagery** — energy and emotion of the sport
3. **Consistent color scheme** throughout — cohesive, modern design
4. **Mobile-first** — 64.95% of sports fans access on mobile
5. **Fast loading** — especially on mobile
6. **Essential features:** Team roster with bios, schedules, news, photo/video galleries
7. **Content rhythm:** One post per week during season

### Visual Trends
- Full-bleed hero photography/video
- Card-based layouts for team members and content
- Bold condensed display fonts for headers
- Strategic use of team accent color (not overwhelming)
- White space as a design element
- Social media integration as content (Instagram feeds, etc.)

---

## Synthesis: Design System Recommendations for Spartan Racing

### Color Palette (Gold/Blue, Warm Base)

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Background (primary) | Warm cream | `#F3EFE3` | Main page backgrounds (from Framehaus) |
| Background (secondary) | Light gold | `#EBE6D5` | Alternating sections |
| Background (tertiary) | Deep cream | `#D9D2BA` | Card backgrounds, subtle contrast |
| Text (primary) | Near-black | `#1C1A17` | Headings, body text |
| Text (secondary) | Warm gray | `#6B6560` | Captions, metadata |
| Text (tertiary) | Taupe | `#9A9485` | Muted labels |
| Accent (primary) | Spartan Gold | `#B08328` or team gold | CTAs, highlights, stats |
| Accent (secondary) | Spartan Blue | TBD from brand | Navigation, links, hover states |
| Accent (warm) | Burnt orange | `#FF8000` | Retained from current McLaren accent |
| Border/line | Warm line | `#C8C0A4` | Dividers, card borders |

### Typography (Keep Current Stack)
- **Display:** Chakra Petch — techy/angular, works for racing
- **Body:** Space Grotesk — modern geometric
- **Mono:** JetBrains Mono — labels/metadata
- Consider variable font settings for more nuance

### Background Texture
Adopt Framehaus grain overlay technique:
- Two overlapping radial-gradients at very low opacity
- `mix-blend-mode: multiply` on warm cream base
- Creates subtle analog warmth, distinguishes from flat white

### Image Treatment (from Framehaus)
- Multi-layered box-shadows for depth
- Subtle `saturate(.9) contrast(1.03)` filter
- Gradient overlay at bottom for caption readability
- Small border-radius (4px)
- Hover: slight scale (1.02) + saturation boost

### Card System for Team Leads (from Anduril + Framehaus)
- **Image-dominant cards** — photo takes 60-70% of card
- **Variable card sizes** — featured leads get larger cards (Anduril's tall/wide system)
- **Minimal text:** Name, role, one-line statement
- **No heavy shadows** — flat or very subtle elevation
- **Hover effect:** Scale 1.02 + filter shift (via @keyframes, NOT CSS transitions)

### Full-Width Break Pattern (from Framehaus)
- One section per page breaks out of content container
- `aspect-ratio: 21/9` for cinematic impact
- No border-radius on full-bleed elements
- Shifted captions at `left: 42px`

### Animation Guidelines (respecting our CSS transition constraint)
All via `@keyframes` or `requestAnimationFrame`:
- Nav: backdrop blur on scroll, padding change
- Images: hover scale + filter shift
- Buttons: translateY(-1px) lift on hover
- Marquee/carousel: RAF-based infinite scroll
- Scroll-triggered reveals: IntersectionObserver + @keyframes fade-in

### Navigation
- Sticky header with backdrop blur (`blur(14px) saturate(1.3)`)
- Clean links: Team | Cars | About | Sponsors | Join
- CTA button in nav for "Support" or "Donate"
- Hidden on homepage hero (existing behavior), visible elsewhere

---

## Action Items

1. **Update global CSS** with warm cream background + grain overlay texture
2. **Create card component** for team leads with Anduril-inspired sizing variants
3. **Add image styling utility** with Framehaus-inspired shadows + filters
4. **Implement full-width break** pattern for key hero images
5. **Update color variables** to gold/blue warm palette
6. **Add nav backdrop blur** via @keyframes (not CSS transitions)
7. **Design team lead cards** — image-dominant, variable sizes, minimal text
