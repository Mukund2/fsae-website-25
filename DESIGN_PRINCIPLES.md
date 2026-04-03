# Design Principles for Non-Vibe-Coded UI

## Key Links
- **Join Us Form**: https://docs.google.com/forms/d/e/1FAIpQLSc5dX8x-oh8OP0M61hb4o8S3POhIpPr7bCrbw0sXiaoXK3l6g/viewform

## Homepage Structure
1. **Hero**: Full-screen video (car driving fast, coming at viewer) + "Spartan Racing" text that appears 1-2s after video
2. **Car Showcase**: Left = 3D rotating car model (sr17.glb), Right = "Fastest Formula SAE car" text + stats + car sketches
3. **Join Us**: Bottom section (id="join-us"), nav "Join Us" links here, CTA links to Google Form above

---

## 1. Content Never Touches Edges
- Constrain content with max-w-5xl to max-w-7xl + mx-auto
- Always have horizontal padding (px-6 minimum)

## 2. Sections Breathe — Aggressively
- Vertical section padding: py-20 to py-32 (5-8rem)
- Space between sections > space within sections
- Cards get p-6 to p-8 internal padding

## 3. Two Font Families, Not One
- Serif for display/headings (e.g., Instrument Serif)
- Sans-serif for body (e.g., Geist, Inter)
- Monospace for labels/numbers/metadata (e.g., JetBrains Mono)

## 4. Typography Has Negative Letter-Spacing on Headings
- Display headings: letter-spacing: -0.02em (tighter)
- Uppercase labels/nav: tracking-[0.15em] to tracking-[0.3em]
- Light font weight on large headings (400, not 700)

## 5. Dark-First with Electric Blue Accent
- Background: #0A0A0A (near-black), Surface: #141414, Elevated: #1E1E1E
- Text: #EDEDED primary, rgba(255,255,255,0.5) muted, rgba(255,255,255,0.1) borders
- Primary accent: Electric blue #0EA5E9 (labels, stats, CTAs, interactive elements)
- Secondary accent: Gold #D4A843 (branding, "SPARTAN" in navbar, achievement highlights)
- Text hierarchy through opacity: text-white, text-white/70, text-white/50

## 6. Images Get Gradient Overlays, Not Raw Display
- Always overlay: bg-gradient-to-t from-black/70 via-black/30 to-transparent
- Images use object-cover
- Hover: group-hover:scale-105 with transition-transform duration-500

## 7. Borders Over Shadows
- Cards use border border-light-gray (1px) instead of shadow-md
- Reserve shadows for floating elements (dropdowns, modals)
- Use border-l-2 for pull quotes and accent dividers

## 8. Buttons Are Understated
- Small text: text-[13px], uppercase, tracked out (tracking-[0.15em])
- Minimal padding: px-8 py-3
- Hover = subtle background shift or border color change
- Outline/ghost variants for secondary actions. No gradients.

## 9. Navbar: Transparent → Dark Frosted Glass on Scroll
- Start transparent/hidden on homepage hero
- On scroll: bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/10
- Nav links: small, uppercase, tracked, text-[13px]

## 10. Animation Is Scroll-Triggered and Subtle
- Fade in + translate up (translateY(24px) → 0, opacity 0 → 1, 0.6s ease-out)
- Use IntersectionObserver, not scroll-position math
- Stagger siblings with increasing delay (0ms, 100ms, 200ms...)
- Never animate on page load all at once — reveal as user scrolls

## 11. Line Heights Are Intentional
- Headings: leading-[1.1] to leading-tight
- Body text: leading-relaxed (1.625-1.75)

## 12. Hero Sections Are Tall, Not Just Wide
- min-h-screen or min-h-[60vh]
- Center content vertically with flexbox
- One clear CTA

## 13. Labels/Metadata Use a Distinct Visual Language
- Tiny size: text-[11px] or text-xs
- Uppercase + wide tracking: uppercase tracking-[0.2em]
- Monospace font for dates/numbers
- Mid-gray color, never same weight as body text

## 14. Grid Gaps Create the Layout, Not Margins
- CSS Grid with explicit gaps (gap-3 to gap-8)
- Bento-style grids with varying card heights
- 1 col mobile → 2 col tablet → 2-3 col desktop

## 15. Full-Bleed Images Are Strategic, Not Default
- Most content is width-constrained
- Full-bleed images edge-to-edge used sparingly for impact

## 16. Interactive Micro-Effects Add Polish
- Mouse-tracking spotlight on cards
- Text scramble/decrypt animation on hero headlines
- Scroll-tracking vertical line on content-heavy pages

## 17. Responsive Scaling Is Proportional
- Font sizes step up at breakpoints: text-4xl → text-5xl → text-7xl
- Padding scales too: px-6 → px-8 → px-12

---

**Meta-Principle**: Vibe-coded sites fill space. Designed sites create space. Every element should have room to breathe. When in doubt, add more padding, use a smaller font, and leave more empty.
