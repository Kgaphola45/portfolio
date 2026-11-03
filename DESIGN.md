# DESIGN.md - Emmanuel Kgaphola Portfolio

## Visual Theme
Human, warm, editorial, not AI-generic. Feels like Linear + Vercel + 【entity-Apple¦canonical_name=Apple】. Weightless, floating cards, soft shadows.

## Palette
- Background: #0A0A0B (zinc-950)
- Surface: #18181B (zinc-900)
- Border: #27272A (zinc-800)
- Text: #FAFAFA / Muted #A1A1AA
- Accent: #6366F1 (indigo) - use sparingly
- No purple gradients, no Inter everywhere

## Typography
- Headings: Geist Sans 600, tracking-tight
- Body: Geist Sans 400, 16px/1.6
- Code: Geist Mono
- Bolder hierarchy: 48px hero, 24px section, 16px body

## Spacing & Style
- Tailwind only, no custom CSS
- Sections: py-24, Cards: p-6 rounded-xl border soft-shadow 0 20px 40px rgba(0,0,0,0.05)
- shadcn/ui components as base
- Mobile-first: 375px -> sm/md/lg

## Motion Rules (use 【entity-apple-design¦canonical_name=Apple】 + emil-design-eng skills)
- Use spring animations, not ease-in
- Duration 200ms for micro-interactions
- No fade-in on every section
- Hover + focus-visible on everything