## Anna Smalley — UX Leadership Portfolio

A warm, editorial portfolio site for a senior UX Design Leader. Three live pages, one shared design system, no extra accent colors, no white backgrounds.

### Pages in this build

1. **Homepage (`/`)** — Hero, About section, Case Studies preview grid, contact CTA.
2. **Case Study 01 (`/work/gap-inc`)** — Full detail page for "Leading a Cross-Brand Product Experience Strategy Through Organizational Change at Gap Inc."
3. **Contact (`/contact`)** — Form + direct email + LinkedIn links.

CS02/CS03 are skipped entirely for now — homepage grid shows only CS01.
About lives as a homepage section only (no standalone page).
Nav: **Work · About · Contact** (About scrolls to homepage section).

### Design system (locked)

**Colors** — warm off-white `#FAF8F5` default bg, sand `#EFE8DF` for About + Impact sections, blue-grey `#D6E0EE` for the device gallery + pill tags, terracotta `#C4622D` as the only accent, deep maroon `#2D0A0F`, navy `#0D1B2A` for tag text, near-black `#1B1918` headings, warm grey `#56514D` body. No pure white anywhere.

**Typography** — Newsreader (headings, regular weight, size-driven hierarchy), Montserrat (body), Roboto (kickers/tags, all caps, semibold). Emphasis words inside headings rendered in terracotta. Line-height 1.2 headings / 1.6 body.

**Components** — Pill (blue-grey bg, navy text, rounded-full, leading icon), Primary button (terracotta fill, rounded-full, hover `#A0501F`), Ghost button (terracotta outline, fills on hover), Case Study Card (rounded 12px, hover lift), Impact Item (terracotta check + caps label + body), fixed top Nav with terracotta active state.

**Layout** — Max width 1200px, 80px section padding desktop / 48px mobile, 48–64px column gaps, 24px grid gaps. All two-column layouts collapse to single column on mobile. All images rounded 12–16px.

### Page details

**Homepage**
- Hero: kicker "UX DESIGN LEADERSHIP", H1 "The best design decisions happen outside the design tool" with "outside the design tool" in terracotta, subtitle, Primary CTA "Explore My Work" + Ghost "Get in Touch". Right column: terracotta portrait placeholder card with abstract circle motif and "AS" monogram (swappable for real headshot later).
- About section (sand bg): short bio paragraph + horizontal row of credential stats (years of experience, brands led, teams scaled, etc. — placeholder copy).
- Case Studies preview: single CS01 card in a 2-col grid layout (one slot filled, layout ready for more).
- Closing CTA band linking to Contact.

**Case Study 01**
- Section 1 — Hero: kicker "CASE STUDY 01", H1 with terracotta emphasis on the closing phrase, subtitle, pill row (Role · Company · Outputs · Duration with leading icons). Right column: terracotta card with stacked Athleta / Old Navy / Banana Republic / Gap text-logo treatments + abstract circle.
- Section 2 — Impact at a Glance (sand bg): H2 left, 2×3 grid of 6 impact items right, each with terracotta check, caps label, body sentence. Includes "Prevented a $17M launch failure" as the lead stat.
- Section 3 — Device Mockup Gallery (blue-grey bg): 4 columns, each with brand wordmark above and a stylized iPhone-frame mockup below containing a representative product screen rendered in the design system colors (CSS-drawn placeholders, no external images).

**Contact**
- H1 "Let's Talk", short paragraph.
- Form: name, email, message, submit (terracotta filled). Client-side validation with zod (trim, length caps, email format), inline error messages, success toast. No backend wiring — submissions log to console with a clear TODO.
- Below form: large email link + LinkedIn link as ghost-style buttons.

**Global**
- Fixed top nav, warm off-white bg with 1px sand bottom border, name in Newsreader left, links in Montserrat right, terracotta active state, mobile hamburger → full-screen overlay.
- Smooth-scroll behavior for in-page anchor links (About).
- 404 page restyled to match the system.

### Technical notes

- React Router routes: `/`, `/work/gap-inc`, `/contact`, catch-all 404.
- Design tokens added to `src/index.css` as HSL CSS variables (`--bg-default`, `--bg-sand`, `--bg-blue`, `--accent`, `--accent-deep`, `--navy`, `--text-title`, `--text-body`) and mapped in `tailwind.config.ts` as semantic color names. No hex values in components — Tailwind classes only.
- Google Fonts (Newsreader, Montserrat, Roboto) loaded via `<link>` in `index.html`; Tailwind `fontFamily` extended with `serif` (Newsreader), `sans` (Montserrat), `mono`/`label` (Roboto for kickers).
- Reusable components in `src/components/`: `Nav`, `Footer`, `Pill`, `PrimaryButton`, `GhostButton`, `Kicker`, `SectionTitle`, `CaseStudyCard`, `ImpactItem`, `DeviceMockup`, `BrandLogoTile`.
- Contact form uses `react-hook-form` + `zod` (already in stack via shadcn form), inline errors, sonner toast on success.
- Lucide icons used for pill icons, check marks, hamburger, social links.
- All images are CSS/SVG placeholders styled in-system — easy to swap for real assets later via clearly named props.
- Fully responsive at 375 / 768 / 1200+ breakpoints; two-col → one-col stacks on mobile.

### What's intentionally out of scope (per your answers)

- Case Study 02 and 03 detail pages and grid cards.
- Standalone About page.
- AI-generated headshot / device imagery / client logos.
- Backend for contact form (no Lovable Cloud wiring this round).
- Analytics, SEO meta beyond sensible defaults, favicon customization, animations beyond hover/transition.
