# Transferable Design Philosophy

Distilled from the Framehaus production site. These are **principles**, not prescriptions — adapt the specifics (colors, fonts, imagery) to each project while keeping the structural thinking.

---

## 1. One Accent Color, Used Rarely

Pick a single accent color and use it only where it *means* something: emphasis words, hover states, timeline markers, active CTAs. Never on backgrounds, never as decoration. When color is rare, every use carries weight. Two accents max if the brand demands it — but one is almost always enough.

**Why:** Multiple accent colors dilute hierarchy and make the page feel like a template. Constraint creates meaning.

## 2. Three-Family Type Pairing

Use three distinct typeface roles:
- **Serif** for display/headings — gives editorial warmth, immediately breaks from AI/SaaS defaults
- **Sans-serif** for body — clean readability
- **Monospace** for labels, metadata, timestamps, section markers — creates a "technical documentation" texture

The tension between these three families *is* the design fingerprint. One family doing everything reads as generic.

**Specifics that transfer:**
- Display headings: light weight (400), tight letter-spacing (-0.02em to -0.04em)
- Mono labels: tiny (10-12px), uppercase, wide tracking (0.1-0.2em)
- Body: generous line-height (1.5-1.65), natural letter-spacing

## 3. Varied Section Spacing (Not Uniform)

Do NOT give every section the same padding. Vary it deliberately:
- Hero might be 150px top, 70px bottom
- Next section: 90px top, 60px bottom
- A heavy content section: 130px top, 110px bottom

Uniform 80px-everywhere screams "generated." Varied spacing signals a human made layout decisions based on content weight and visual rhythm.

## 4. Asymmetric Layouts Over Centered-Everything

Default to off-center compositions:
- Hero grids: unequal columns (e.g. 1.25fr / 0.75fr, not 1fr / 1fr)
- Image captions: bottom-left or bottom-right, never centered below
- Contact/CTA sections: text-left + form-right with unequal column widths
- Footer columns: first column wider than the rest

Centering everything is the #1 tell of AI-generated layouts. Asymmetry creates visual interest and directs the eye.

## 5. Whitespace Creates the Design

Space between sections should always be greater than space within sections. Content containers should max out at 1100-1200px even on wide screens. Horizontal padding should be generous (24-32px desktop, 20-24px mobile).

**The principle:** When in doubt, add more space. Designed sites create space; template sites fill it.

## 6. Buttons Are Understated

- Small text (13-14px), possibly uppercase with tracking
- Minimal padding, hard corners (2-4px border-radius, NOT 16px pills)
- Hover = color shift + tiny translateY(-1px), not dramatic scale
- Ghost/outline variants for secondary actions
- No gradients on buttons, ever

**Why hard corners:** Rounded pills are the default AI button. A 3px radius reads as intentional. A 16px radius reads as "I didn't think about it."

## 7. Border-Radius Is Small and Intentional

Cards, images, video frames: 3-6px radius. Not 0 (brutalist), not 16px (bubbly SaaS). This small radius says "I chose this number" rather than accepting a default.

## 8. Motion Is Varied and Subtle

Different elements should animate with different durations and properties:
- Hover color shifts: 0.2-0.25s
- Image scale on hover: 0.8-1s (slow, cinematic)
- Filter/saturation shifts: 0.5-0.6s
- Navigation transitions: 0.3s

Do NOT apply the same `transition: all 0.3s ease` to everything. Do NOT fade-in every element on scroll with the same animation. If you use scroll animations, stagger them and vary the motion (some translate up, some fade, some scale).

**Custom easing:** Use a cubic-bezier like `(0.2, 0.8, 0.2, 1)` instead of `ease` or `ease-in-out`. It's a small detail that adds craft.

## 9. Images Get Cinematic Treatment

- Slightly desaturated by default: `saturate(0.9) contrast(1.03)`
- On hover: `saturate(1.0) contrast(1.05)` — subtle pop back to full color
- Dark gradient overlays on bottom for text readability
- Subtle grain/noise texture via CSS (repeating-linear-gradient patterns, screen blend mode)
- Object-cover with intentional aspect ratios (not arbitrary)

**Why desaturate:** Toned-down images feel curated. Full-saturation stock photos feel like a template.

## 10. Hairline Borders Over Box Shadows

Use 1px borders (subtle, warm-toned) for separation instead of drop shadows. Reserve shadows for truly floating elements (dropdowns, modals). Borders are cleaner, more editorial, and age better across light/dark themes.

## 11. Warm Palette, Not Cool

Even on dark themes: avoid pure black (#000) and pure white (#fff).
- Dark backgrounds: warm near-black (#0A0A0A, #1C1A17)
- Light backgrounds: warm off-white/cream (#F3EFE3, #FAF7EC)
- Text: warm grays, not cool blue-grays
- Borders: tinted toward the palette, not neutral gray

**Why:** Pure black/white creates harsh contrast. Warm tones feel considered and human.

## 12. Labels and Metadata Are a Design System

Don't just make labels "small gray text." Give them a distinct visual language:
- Monospace font
- 10-12px, uppercase, wide letter-spacing (0.1-0.2em)
- Mid-tone color (not too light, not same as body)
- Used consistently for: dates, categories, section names, form labels, timestamps

This creates a visual layer that's unmistakably intentional.

## 13. Navigation Transitions on Scroll

Start with a transparent or minimal nav. On scroll, transition to:
- Frosted glass background (backdrop-blur)
- Reduced padding (feels like it "tightens")
- Subtle bottom border appears

This single interaction adds significant polish for minimal effort.

## 14. Responsive Means Content-Aware

Don't just stack columns on mobile. Adapt:
- Image captions move from positioned overlays to static text below
- Grid gaps reduce proportionally
- Font sizes step down at breakpoints (don't just clamp everything)
- Some decorative elements hide on mobile — that's fine
- Aspect ratios can change per breakpoint (e.g. 21:9 desktop → 16:10 mobile)

## 15. Full-Bleed Sections Are Strategic

Most content lives inside a max-width container. Occasionally break out to full-bleed for visual punctuation — a dark strip, an image gallery, a marquee carousel. The contrast between constrained and full-bleed creates rhythm.

## 16. No AI-Slop Decorations

Avoid these specific patterns that signal "generated, not designed":
- Abstract gradient blobs / mesh gradients as decoration
- Uniform border-radius: 16px on everything
- Purple-to-blue gradients
- 3-column icon grids with colored circle backgrounds
- Identical fade-in animations on every element
- Decorative illustrations or 3D renders (use real photography)
- Emoji as visual language in professional contexts

If a decoration doesn't serve a purpose (creating warmth, directing attention, establishing depth), remove it.

---

## Meta-Principle

> Every specific number should look *chosen*, not defaulted. A 3px radius, 11px label, 150px section padding — these are decisions. Round numbers and defaults (16px, 300ms, ease-in-out) are the absence of decisions. The accumulation of small, intentional choices is what separates designed from generated.
