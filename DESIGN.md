---
name: La Sal 2027
description: Existing conference identity translated into an independent static homepage.
colors:
  paper: "#f6f2e9"
  ink: "#242424"
  dark: "#343434"
  pink: "#ff91a4"
  blue: "#303f7c"
  action: "#c80c17"
  action-hover: "#a50812"
  white: "#ffffff"
  card: "#F2F2F2"
  card-hover: "#E7E7E7"
  card-border: "#CFCFCF"
  focus: "#566ed2"
  whatsapp: "#173e27"
typography:
  display:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "clamp(38px,5.3vw,76px)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-2px"
  headline:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "clamp(2rem,5vw,5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-.035em"
  body:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "1rem"
    lineHeight: 1.8
  area-title:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "clamp(17px,2vw,23px)"
rounded:
  control: "4px"
  contact: "24px"
  ticket-button: "30px"
  ticket-bar: "40px"
spacing:
  gutter-desktop: "56px"
  gutter-tablet: "36px"
  gutter-mobile: "20px"
  section-desktop: "80px"
  section-tablet: "64px"
  section-mobile: "48px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  button-ticket:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.ticket-button}"
    padding: "12px 24px"
  area-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "32px"
---

# Design System: La Sal 2027

## Overview

The existing conference identity is the authority: a textured event poster expressed through monospaced typography, generous section rhythm, large numbers, and contrasting paper and charcoal surfaces. “Textured event poster” is a description of the implementation, not a newly approved brand slogan.

The multicolor grain and supplied photography carry the atmosphere. Controls remain readable and familiar, while the numbered areas and editorial rules connect practical information to the conference identity. Preserve this language when adding screens.

**Key Characteristics:**
- IBM Plex Mono throughout.
- Cream paper, dark sections, and multicolor grain.
- Large activity figures and numbered area cards.
- Restrained floating ticket and contact controls.

## Colors

Action red directs attention to the program CTA; blue grounds navigation and Live accents. Pink marks activity headings on the dark surface. Paper and ink provide the primary reading pair; white is used on dark and image surfaces. Cards use the dedicated pale gray, border, and hover tokens.

Live uses a lavender/pink/cream translucent gradient over the banner, with dark violet text. This override in `src/styles.css` takes precedence over the base cream Live fragment. The navigation panel retains its translucent blue (`rgba(55,71,139,.98)`). Do not treat unused Elementor kit colors as design tokens.

## Typography

IBM Plex Mono is the display and body family, with monospace fallback; weights 400, 500, 600, and 700 are self-hosted through @fontsource/ibm-plex-mono. Uppercase display headings and tightly spaced dates create the poster character. Body paragraphs keep generous line height; program and Live copy use a maximum of 65 characters where specified.

The hero title scales from 38px to 76px; its ampersand and dates retain their own hierarchy. White text sits directly on the supplied photograph with a single continuous navy scrim, never separate rectangles behind each label. The introduction continues onto the paper surface. Section headlines use the fluid headline token. Live has a distinct fluid title (`clamp(40px,6vw,80px)`) with a mobile override. Activity figures descend from 120px to 88px and 72px. Activity and area copy are 16px; hero footer text is overridden to 14px for legibility. Avoid restoring the original 9px mobile footer.

## Layout

Sections span the page, using the documented gutters and vertical rhythm. At 1024px the program's two columns become one, and at 640px section spacing becomes compact. The area grid has twelve tracks with three unequal cards followed by two equal cards; tablet shows two columns and mobile one. Preserve the actual content order.

FAQ tools and accordions align with the section gutters; answers are capped at 75ch. Shared `--page-inset` adds centering above a 1440px content width. Navigation, introduction, Program, Areas, activities and Live all use this inset. Live starts with a two-column introduction and date/content schedule rows; those stack at 900px, and campus columns stack at 600px. Legacy hero/navigation rules additionally use 767px and a 370px or short-height adjustment.

The floating actions are centered with a maximum width of 800px and 16px side clearance. WhatsApp sits above the ticket capsule. JavaScript measures their combined height for bottom clearance; the footer reserves that space. Keep content and keyboard focus reachable around these controls.

## Elevation & Depth

Paper texture, translucent overlays, and fine rules supply most depth. Area cards retain the original pale gray and asymmetric grid, with a fine border and no shadow or hover lift. They are informational, not clickable. The navigation panel uses a lateral shadow (`-18px 0 50px rgba(12,20,60,.24)`). The ticket bar uses translucency and a 16px backdrop blur.

## Shapes

Most controls and area cards have gently softened corners using the control radius. Ticket and contact actions use the larger capsule radii; the ticket bar becomes 24px on mobile. Schedule and FAQ rows use straight divider rules. Preserve the circular year motif and supplied logo rather than substituting generic marks.

## Components

Primary buttons use action red with white text, a minimum 48px height, and a darker hover. Ticket buttons use paper with ink and a pill shape. Keyboard focus uses a 3px focus-colored outline offset by 5px.

FAQ search uses a visible label, dark input, light text, a 54px minimum height, and rounded corners. Category buttons expose selection with `aria-pressed`; the selected button uses pink text and a thicker underline. Disclosure indicators change from plus to cross without replacing native summary semantics. Questions use native `details`/`summary`, ruled rows, and spacious answers. Search results are announced through a status region.

Navigation uses a centered white logo and a blue modal panel. Keep the dialog's close control, Escape handling, and focus restoration. Area cards preserve indices 01–05 and natural title wrapping. Live uses date rows and campus columns rather than extra decorative cards.

The image shell reserves its aspect ratio and shows a 1.5s shimmer while loading, then the photograph or a failure message. Motion provides a brief arrival indicator, 600–700ms hero/section entries, 600ms activity row reveals and a 250ms menu entry; content is visible before animation. Reduced motion disables animation/transitions and smooth scrolling, removes the arrival indicator, and retains a static placeholder. Never use the entrance treatment to block access to the page.

## Do's and Don'ts

- Do preserve the supplied imagery, typography, numbered areas, and alternating surfaces.
- Do keep readable text protection over textured images.
- Do preserve keyboard focus, native FAQ disclosure, and reduced-motion behavior.
- Do use the final cascade: legacy components, Live styles, then independent overrides.
- Don't replace the incumbent identity with a generic component-library theme.
- Don't reinstate clipped names, hidden essential content, or tiny hero footer text.
- Don't infer unimplemented visual states or a dark-mode switch from this palette.

Source: `src/styles.css`, `src/legacy-components.css`, `src/live.css`, and the original-site review in `docs/audit/REVISION-LA-SAL.md`. The sidecar contains extension metadata and representative component previews; CSS remains the implementation source.


## Refinement with UI/UX Pro Max — 2026-11-07

The user's original blocks remain the authority. UI/UX Pro Max supplies spacing,
contrast, input and motion guidance, not a replacement palette or font pairing.
The generic Outfit / Work Sans recommendation was rejected in favor of IBM Plex Mono.

- Shared vertical rhythm: 80 / 64 / 48px; area card padding: 32 / 28 / 24px.
- Do not place opaque boxes behind the hero title, dates, month or location.
- Keep the original paper, grain, photograph, year circles and section sequence.
- Reserve floating-action clearance in both the hero and page end; maintain scroll padding.
- Use real utility for interaction: local section links, keyboard FAQ and campus maps.
- Do not make noninteractive cards look clickable, animate counters from zero,
  hijack scrolling, autoplay video or add dependency-heavy decoration.

Research and limits: [reference review](docs/audit/UI-UX-REFINEMENT.md).
