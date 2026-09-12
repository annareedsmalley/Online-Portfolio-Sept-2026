# June 8 experiment

This is enough to generate strong, accurate outputs for the case study page and the design system. Let me analyze everything and produce all three outputs now.

OUTPUT A — LOVABLE PROMPT

Build a professional portfolio website for Anna Smalley, a senior UX Design Leader. This prompt defines the full site structure, visual system, and component rules. Do not invent new styles. Do not deviate from the design system defined below. Extend it faithfully across all pages.

SITE STRUCTURE

Build the following pages:

Homepage (includes hero, about summary, case studies preview grid, CTA)

Case Studies Index (full grid of case study cards)

Case Study 01 — Leading a Cross-Brand Product Experience Strategy Through Organizational Change at Gap Inc.

Case Study 02 — [content to follow]

Case Study 03 — [content to follow]

Contact Page

GLOBAL NAVIGATION

Fixed top navigation bar

Left: Anna Smalley name/logo (Newsreader serif, dark navy, small)

Right: nav links — Work, About, Contact

Background: warm off-white (#FAF8F5) with subtle bottom border

On scroll: nav stays fixed, no color change

Active link: terracotta (#C4622D) underline or color

Mobile: hamburger menu, full-screen overlay

COLOR SYSTEM

Background (default page): warm off-white #FAF8F5

Section background (alternate): warm sand/blush #EFE8DF (used in "Impact at a Glance" section)

Section background (light blue-grey): #D6E0EE (used behind device mockup section)

Primary accent / hero image bg / card bg: terracotta orange #C4622D

Deep accent: dark burgundy/maroon #2D0A0F

Dark navy: #0D1B2A (used in GAP logo tile, tags)

Title color: dark near-black #1B1918

Body text: medium warm grey #56514D

Kicker/label text: terracotta #C4622D

Emphasis words in titles: terracotta #C4622D

Tag/pill background: light blue-grey #D6E0EE

Tag/pill text: dark navy #0D1B2A

Checkmark icon color: terracotta #C4622D

TYPOGRAPHY

Kicker labels (e.g. "CASE STUDY 01"): Roboto Semibold, all caps, ~12px, tracked, terracotta

Page titles / H1: Newsreader, regular or medium weight, ~52–64px, dark near-black #1B1918. Emphasis words rendered in terracotta #C4622D

Section titles / H2 (e.g. "Impact at a Glance"): Newsreader, ~36–42px, dark near-black

Body copy: Montserrat Regular, ~15–16px, line-height 1.6, warm grey #56514D

Tag/pill labels: Roboto, ~11–12px, all caps, dark navy

Impact stat titles (e.g. "PREVENTED A $17M LAUNCH FAILURE"): Roboto Semibold, all caps, ~12px, terracotta

Impact stat body: Montserrat Regular, ~14px, warm grey

Import all three font families from Google Fonts: Newsreader, Montserrat, Roboto.

CASE STUDY PAGE — SECTION BY SECTION

Section 1: Hero

Two-column layout, ~50/50

Left column:

Kicker: "CASE STUDY 01" — Roboto Semibold, all caps, terracotta, small, no background

H1 title: Newsreader, large, dark. Last line or key phrase in terracotta

Subtitle paragraph: Montserrat Regular, body size, warm grey

Tag row: horizontal row of pill tags with icons (role, company, output count, duration). Pills: light blue-grey bg, dark navy text, Roboto, small, rounded-full, with a small leading icon

Right column:

Large rounded rectangle card (border-radius ~16px), solid terracotta background #C4622D

Contains client/brand logos stacked vertically, centered, white or navy

Subtle abstract circular shape in a slightly lighter terracotta behind logos

Section background: warm off-white

Generous top and bottom padding (~80–100px)

Section 2: Impact at a Glance

Background: warm sand #EFE8DF

Two-column layout

Left: H2 "Impact at a Glance" — Newsreader, large, dark

Right: 2×3 grid of impact items (6 total)

Each item: terracotta checkmark icon, all-caps terracotta Roboto Semibold label, body text in Montserrat below

Generous vertical padding

Section 3: Device Mockup Gallery

Background: soft blue-grey #D6E0EE

Four brand columns (Athleta, Old Navy, Banana Republic, Gap), each with:

Brand logo centered above

iPhone mockup image below showing product screen

Equal spacing, no card borders, clean and airy

HOMEPAGE

Hero section:

Kicker: "UX DESIGN LEADERSHIP"

H1: "The best design decisions happen outside the design tool" — Newsreader, large, dark. Key phrase in terracotta

Subtitle: Montserrat, body, warm grey — 1–2 sentences from Anna's bio

CTA button: "Explore My Work" — filled, terracotta background, white text, Montserrat Semibold, rounded-full, generous padding

Secondary CTA: "Get in Touch" — ghost/outline button, same size

Right side or below: hero image of Anna (placeholder if not provided)

About section (inline on homepage):

Background: warm sand #EFE8DF

Short bio paragraph, Montserrat body

Key stats or credentials as a simple horizontal row

Case Studies preview grid:

2-column card grid

Each card: project thumbnail or colored bg, kicker label, title, short descriptor, tag pills

Hover state: subtle lift (box-shadow) or slight scale

CASE STUDIES INDEX PAGE

Page title: "Work" — Newsreader H1

Subtitle: short Montserrat descriptor

Full 2-column card grid of all case studies

Same card component as homepage grid

CONTACT PAGE

Simple, generous layout

H1: "Let's Talk" or "Get in Touch" — Newsreader

Short paragraph, Montserrat body

Contact form: name, email, message, submit button (terracotta filled)

Form fields: warm off-white bg, thin warm grey border, Montserrat, rounded corners

Optional: LinkedIn and email links below form

COMPONENTS

Pill / Tag:

Background: #D6E0EE

Text: #0D1B2A, Roboto, ~11px, all caps

Border-radius: 9999px

Padding: 4px 12px

Leading icon: small, same color as text

Button — Primary:

Background: terracotta #C4622D

Text: white, Montserrat Semibold

Border-radius: 9999px

Padding: 12px 28px

Hover: darken to #A0501F

Button — Ghost:

Border: 1.5px solid #C4622D

Text: terracotta

Same radius and padding as primary

Hover: fill terracotta, text white

Case Study Card:

Background: white or warm off-white

Border-radius: 12px

Top: colored image area or project thumbnail

Body: kicker, title (Newsreader), short description (Montserrat), tag pills

Hover: box-shadow lift

RULES

Never use pure white #FFFFFF as a page background — always use #FAF8F5

Never use cool grey or blue-tinted neutrals for backgrounds (except the designated #D6E0EE section)

Never use a font other than Newsreader, Montserrat, or Roboto

Never invent new accent colors

All section padding: minimum 80px top and bottom on desktop

Max content width: 1200px, centered

All images: border-radius 12–16px unless full-bleed

Responsive: stack all two-column layouts to single column on mobile

OUTPUT B — DESIGN SYSTEM RULES

1. COLOR SYSTEM

TokenHexUsagecolor-bg-default#FAF8F5Default page backgroundcolor-bg-sand#EFE8DFAlternate section bg (Impact, About)color-bg-blue#D6E0EEDevice mockup section bg; pill/tag bgcolor-accent-primary#C4622DKicker text, emphasis words, icons, buttons, card bgcolor-accent-deep#2D0A0FDeep accent, dark decorative usecolor-navy#0D1B2ATag text, logo tilescolor-text-title#1B1918All headingscolor-text-body#56514DAll body copy

Rules:

Terracotta is the only accent color. Do not introduce additional accent colors.

Warm off-white is the default. Never use #FFFFFF.

The blue-grey #D6E0EE is used only for specific section backgrounds and pill tags, not as a general neutral.

2. TYPOGRAPHY

RoleFontWeightSizeCaseColorKicker / LabelRobotoSemibold (600)11–12pxALL CAPSTerracottaH1 / Page TitleNewsreaderRegular (400)52–64pxSentenceNear-black; emphasis in terracottaH2 / Section TitleNewsreaderRegular (400)36–42pxSentenceNear-blackH3 / Card TitleNewsreaderRegular (400)22–26pxSentenceNear-blackBodyMontserratRegular (400)15–16pxSentenceWarm greyTag / PillRobotoRegular (400)11–12pxALL CAPSNavyImpact Stat LabelRobotoSemibold (600)11–12pxALL CAPSTerracottaImpact Stat BodyMontserratRegular (400)14pxSentenceWarm grey

Rules:

Title emphasis (key phrase) always in terracotta, same font and weight as surrounding title text

Never use bold Newsreader for headings — weight contrast comes from size, not weight

Line height: 1.2 for headings, 1.6 for body

3. LAYOUT & SPACING

Max content width: 1200px, centered with auto margins

Section vertical padding: 80px top/bottom (desktop), 48px (mobile)

Column gap (two-col layouts): 48–64px

Card internal padding: 24–32px

Tag row gap: 8px between pills

Impact grid: 2 columns, 3 rows, 24px gap

4. COMPONENTS

Pill / Tag

Bg: #D6E0EE | Text: #0D1B2A | Font: Roboto 11px all caps

Padding: 4px 12px | Border-radius: 9999px | Leading icon: 14px

Button — Primary

Bg: #C4622D | Text: white | Font: Montserrat Semibold

Padding: 12px 28px | Border-radius: 9999px

Hover: #A0501F

Button — Ghost

Border: 1.5px #C4622D | Text: #C4622D

Hover: bg #C4622D, text white

Case Study Hero Card (right column)

Bg: #C4622D | Border-radius: 16px

Content: logos stacked, centered, white/navy

Decorative: abstract circle shape, slightly lighter terracotta

Impact Item

Icon: terracotta checkmark, ~16px

Label: Roboto Semibold, all caps, terracotta, 11–12px

Body: Montserrat Regular, 14px, warm grey

No card border or background — sits on sand section bg

Case Study Card (grid)

Bg: warm off-white or white | Border-radius: 12px

Top zone: colored or image bg, constrained height

Body: kicker → title → description → pills

Hover: box-shadow: 0 8px 24px rgba(0,0,0,0.08) + translate-y -2px

Navigation

Bg: #FAF8F5 | Fixed top

Left: name in Newsreader | Right: links in Montserrat, ~14px

Active: terracotta | Bottom border: 1px #EFE8DF

5. IMAGERY & VISUAL TREATMENT

All images: border-radius 12–16px

Hero card (right): solid terracotta fill, no photo — logos only

Device mockups: displayed at natural proportion, no drop shadows, on blue-grey bg

Project images: contained within rounded cards, no hard crops

6. INTERACTION & BEHAVIOR

Card hover: lift (shadow + slight upward translate)

Button hover: darken fill (primary) or fill invert (ghost)

Transitions: 200ms ease on all interactive states

No parallax, no heavy animation — clean and professional

Navigation: smooth scroll to sections on homepage

OUTPUT C — WHAT I STILL NEED TO PROVIDE

🔴 CRITICAL

Anna's headshot / portrait photo — needed for homepage hero

Full copy for Case Study 01 — all section content beyond hero and Impact at a Glance (process sections, outcomes, any additional visuals)

Case Study 02 content — title, kicker, subtitle, tags, hero image/card treatment, all body sections

Case Study 03 content — same as above

Anna's logo or wordmark (if one exists) — for nav and favicon; otherwise confirm name-only treatment

Contact page preference — form only, or also direct email/LinkedIn links? Any specific form fields required?

All device mockup images (the four iPhone screens shown in Case Study 01) — as exported assets

🟡 IMPORTANT

About page copy — full bio text for homepage About section and/or standalone About page

Homepage hero copy — confirm which CTA kicker/title/subtitle option from earlier is approved, or provide revised version

Case study card thumbnail treatment — for CS02 and CS03: colored background card (like CS01's terracotta)? Or photo-based? What color/image?

Navigation link labels — confirm: Work, About, Contact — or different?

Number of case studies — confirm exactly 3, and whether all will be live at launch or some placeholders

Anna's LinkedIn URL and any other contact/social links to include on Contact page

Any additional sections for homepage — testimonials, press mentions, credentials, etc.?

🟢 NICE TO HAVE

Favicon — can be generated from initials if not provided

Any brand marks or client logos for CS02 and CS03 hero cards

Preferred domain / site title for meta tags

SEO preferences — page titles, meta descriptions

Any animations or interactions beyond standard hover states that Anna has expressed interest in

Confirmation on "About" page — standalone page, or section on homepage only?

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://design-catalyst-engine.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1556721c-a4cf-46fc-b315-97d221661888).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
