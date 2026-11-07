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
  whatsapp: "#25d366"
typography:
  display:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "clamp(40px,5.2vw,76px)"
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

Live uses a lavender/pink/cream translucent gradient over the banner, with dark violet text. This override in `src/styles.css` takes precedence over the base cream Live fragment. The menu uses the paper texture with dark ink, numbered links and an editorial full-width index. Do not treat unused Elementor kit colors as design tokens.

## Typography

IBM Plex Mono is the display and body family, with monospace fallback; weights 400, 500, 600, and 700 are self-hosted through @fontsource/ibm-plex-mono. Uppercase display headings and tightly spaced dates create the poster character. Body paragraphs keep generous line height; program and Live copy use a maximum of 65 characters where specified.

The hero title scales from 40px to 76px; its ampersand and dates retain their own hierarchy. White text sits directly on the supplied photograph without a blanket overlay. A narrow glyph outline and shadow preserve letter edges. The centered white introduction is inside the banner after the audience/location footer. Section headlines use the fluid headline token. Live has a distinct fluid title (`clamp(40px,6vw,80px)`) with a mobile override. Activity figures descend from 120px to 88px and 72px. Activity and area copy are 16px; hero footer text is overridden to 14px for legibility. Avoid restoring the original 9px mobile footer.

## Layout

Sections span the page, using the documented gutters and vertical rhythm. At 1024px the program's two columns become one, and at 640px section spacing becomes compact. The area grid has twelve tracks with three unequal cards followed by two equal cards; tablet shows two columns and mobile one. Preserve the actual content order.

FAQ tools and accordions align with the section gutters; answers are capped at 75ch. Shared `--page-inset` adds centering above a 1440px content width. Navigation, introduction, Program, Areas, activities and Live all use this inset. Live starts with a two-column introduction and date/content schedule rows; those stack at 900px, and campus columns stack at 600px. Legacy hero/navigation rules additionally use 767px and a 370px or short-height adjustment.

The floating actions are centered with a maximum width of 800px and 16px side clearance. WhatsApp sits above the ticket capsule. JavaScript measures their combined height for bottom clearance; the footer reserves that space. Keep content and keyboard focus reachable around these controls.

## Elevation & Depth

Paper texture, translucent overlays, and fine rules supply most depth. Area cards retain the original pale gray and asymmetric grid, with a fine border and no shadow or hover lift. They are informational, not clickable. The navigation panel uses a lateral shadow (`-18px 0 50px rgba(12,20,60,.24)`). The ticket bar uses a light translucent surface, dark text, beveled highlights and a 20px backdrop blur; unsupported browsers receive an opaque cream fallback.

## Shapes

Most controls and area cards have gently softened corners using the control radius. Ticket and contact actions use the larger capsule radii; the ticket bar becomes 24px on mobile. Schedule and FAQ rows use straight divider rules. FAQ filters and campus links use pill controls. Preserve the circular year motif and supplied logo rather than substituting generic marks.

## Components

Primary buttons use action red with white text, a minimum 48px height, and a darker hover. Ticket buttons use paper with ink and a pill shape. Keyboard focus uses a 3px focus-colored outline offset by 5px.

FAQ search uses a visible label, dark input, light text, a 54px minimum height, and rounded corners. Category buttons expose selection with `aria-pressed`; the selected pill uses a pink fill and dark text. Disclosure indicators change from plus to cross without replacing native summary semantics. Questions use native `details`/`summary`, ruled rows, and spacious answers. Search results are announced through a status region.

Navigation uses a white logo on the left, a labeled pill toggle on the right, and a paper modal index. Keep the dialog's close control, Escape handling, and focus restoration. Area cards preserve indices 01–05 and natural title wrapping. Live uses date rows and campus columns rather than extra decorative cards.

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


## Campaign proposal — current visual authority (2026-11-07)

This iteration supersedes the continuous navy scrim from the previous refinement.
`src/expressive.css` is loaded after the retained/base CSS and defines these exceptions:

- Original banner colors, no opaque overlay; static tiled SVG grain at .32 opacity.
- White hero type with a local dark edge, connected 26/27/28/Mayo route and original year circles.
- Introductory paragraph inside the banner, after audience/location, centered and white.
- Horizontal pink dates ribbon, with a visible pause control; static without JS or under reduced motion.
- Light liquid-glass ticket capsule, dark purchase pill, bright green WhatsApp with vector icon.
- Full-width paper menu styled as a numbered event index; all links scroll inside short viewports.
- Pill filters and campus maps; page sections share 80/64/48px vertical and 56/36/20px lateral padding.
- Reveal of activity rows, area cards and Live dates; one-shot SVG path draw. Never hide initial content.
- Ribbon pauses on user request, focus, hover, offscreen, hidden tab and reduced-motion preference.

Reference: Passion 27 and the user-supplied https://salt2026.com/home/.
No external artwork, fonts or videos were copied.


## Motion y revisión sin sombras — 2026-11-07

La petición más reciente elimina box-shadow, text-shadow y drop-shadow de todas las
superficies. La barra adapta el código de liquid glass suministrado: degradado oscuro,
blur 25px, saturación 200%, bordes asimétricos claros y botón blanco. Se refuerza la
parte izquierda del degradado para sostener la etiqueta; no se restaura el countdown
ya vencido del 3 de octubre de 2026. El contorno fino del texto del banner permanece;
no es una sombra ni un velo sobre la fotografía.

Motion: hero con stagger de 75ms y entrada de 650ms; línea de fechas en 1,2s.
Sección intermedia de cuatro frases con relleno ligado al scroll, sin fijar la página.
Filtros FAQ conservan botones aria-pressed y añaden un indicador elástico decorativo.
Skeletons conectados a carga real de imágenes, wipe de 600ms al cargar y reintento
tras error/12s; no se simula una espera para textos HTML ni se bloquea toda la web.
Movimiento reducido cancela entradas y animaciones de scroll.

Paleta fotográfica aproximada: docs/artifacts/banner-palette.json. No sustituye
los tokens funcionales de marca; se entrega para el próximo ajuste de ReactBits.

Último ajuste: el cintillo no tiene botón de pausa ni reproducción automática.
Su desplazamiento está ligado al scroll con Motion y se desactiva con movimiento reducido.
Esto sustituye las reglas anteriores de reproducción/pausa del cintillo.
