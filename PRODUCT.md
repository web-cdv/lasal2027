# La Sal 2027

La Sal is caminodevida’s creative and leadership conference for pastors and their creative teams. This independent Spanish-language website presents “Imagen & Semejanza,” the conference on 26–28 May 2027 in Lima, Peru, and La Sal Live on 29–30 May. Its purpose is to explain the experience, help visitors plan their attendance, answer practical questions, and direct ticket purchases to Eventbrite.

## Audience and tasks

Pastors, church leaders, and teams in worship, performing arts, communications, production, and leadership need clear dates, location, program information, participation details, and practical travel answers. Visitors should be able to find a relevant FAQ, contact the event through WhatsApp, and reach the external ticket checkout from mobile or desktop.

## Product scope

The independent homepage contains navigation, hero, introduction, program summary, Tendremos, five areas, La Sal Live, FAQ, footer, WhatsApp, and the ticket bar. La Sal Live appears before FAQ. The supplied price is $55; ticket policies, accommodation suggestions, schedules, and other event claims are editorial content supplied for the project, not independently verified commercial promises.

The complete Programa, Galería, and Notas pages remain external links to the active WordPress site at conferencialasal.com. They have not been migrated. Eventbrite handles checkout; WhatsApp handles contact. This repository can coexist with WordPress without changing the live site. No deployment has been performed as part of this implementation.

## Delivery constraints

- Plain HTML, CSS, and JavaScript with Vite as the build tool; no React.
- Motion supplies decorative entrance and section animations. Loading placeholders reserve image space; content and ticket links must remain usable without waiting for animation.
- Preserve the existing visual identity: IBM Plex Mono, cream paper texture, multicolor grain, dark sections, pink editorial accents, blue navigation, and numbered areas.
- Responsive layouts, keyboard access, meaningful headings, visible focus, reduced motion, and understandable loading/error feedback are implementation requirements.
- Build-time SEO, opt-in Google Analytics, and static asset caching support eventual static hosting.

## Content and future CMS

The present source is `content/site.json` plus `content/*.html`. The build script generates the page from these files. A future CMS adapter should produce this same content contract or replace its reading step; no CMS provider or live CMS integration is currently selected. Rich FAQ answers and HTML fragments are trusted repository content today. Sanitize CMS-supplied HTML with an explicit allowlist before inserting it; validate external links and structured fields at that boundary.

## Evidence and ownership

The supplied blocks are retained in `blocks/`. Public-site reference HTML, CSS, and downloaded source assets were collected from conferencialasal.com into `/workspace/lasal-review`; that workspace directory is provenance, not a runtime dependency. The initial findings are in `docs/audit/REVISION-LA-SAL.md` and concern the original WordPress implementation. They are not a certification of this independent site. The incumbent design and supplied event content remain authoritative; unknown operational details should be confirmed rather than invented.
