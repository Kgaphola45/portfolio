# DESIGN.md - Emmanuel Kgaphola Portfolio

## Visual Theme
Human, warm, editorial, not AI-generic. Feels like Linear + Vercel + Apple with tactile analog warmth, subtle grain texture, asymmetric hierarchy, and overlapping floating cards.

## Palette
- Background: #121212 (warm dark charcoal)
- Surface: #1A1918 (warm charcoal surface)
- Border: #2A2826 (warm subtle border)
- Text: #F5F5F0 (warm off-white) / Muted #A39E93
- Accent: #E07A5F (terracotta) - use sparingly
- No purple gradients, no Inter everywhere

## Typography
- Headings: Geist Sans 600, tracking-tight
- Body: Geist Sans 400, 16px/1.6
- Code / Hero Location Badge: Geist Mono (ONLY for the Johannesburg badge in the hero and actual code snippets)
- Bolder hierarchy: 48px hero & primary 99.9% uptime stat, 24px section, 16px body

## Spacing & Style
- Tailwind only, no custom CSS, no arbitrary pixel values
- Hero: Left 65% width headline column, overlapping profile card (-20px margin, soft shadow 0 20px 40px rgba(0,0,0,0.15)), asymmetric stats (48px 99.9% uptime anchor + quiet supporting figures)
- Sections: py-24, Cards: p-6 rounded-xl border
- Mobile-first: 375px -> sm/md/lg

## Motion Rules (use apple-design + emil-design-eng skills)
- Use spring animations, not ease-in
- Tactile spring hover + pointer-down response on primary Email button
- Duration 200ms for micro-interactions
- No fade-in on every section
- Hover + focus-visible on everything
