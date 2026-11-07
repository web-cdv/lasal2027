# La Sal 2027 — Product requirements

Working specification · 6 November 2026, Lima. `PRODUCT.md` defines durable scope and audience; `DESIGN.md` defines the incumbent visual system. This document records the delivery requirements and their acceptance criteria.

## Objective

Provide an independent, maintainable conference homepage for La Sal 2027 that preserves the supplied identity, explains the event and La Sal Live, and directs visitors to registration and support. Keep the active WordPress site available while this repository is developed and reviewed.

## Required experience

| Requirement | Acceptance criterion |
|---|---|
| Homepage information | Hero, introduction, program summary, Tendremos, areas, Live, FAQ, and footer render as readable HTML. |
| Live placement | La Sal Live appears immediately before FAQ. |
| Registration and support | Real Eventbrite and WhatsApp links remain available without waiting for animations. |
| FAQ | Labeled search supports accented queries; category selection is exposed; disclosures work by keyboard; results are announced. |
| Navigation | Modal menu supports close/Escape and restores focus; headings and landmarks provide structure. |
| Responsive design | Content fits narrow/mobile and desktop layouts; floating controls reserve clearance. |
| Motion and loading | Decorative Motion animations respect reduced motion; image placeholders reserve space and expose an error fallback. |
| Visual continuity | Supplied imagery, typography, grain, surfaces, numbered cards, and colors guide polish. |
| Documentation | Product, requirements, design tokens, design previews, run instructions, and dated progress log are reviewable. |

## Technical requirements

Use plain HTML, CSS, and JavaScript, with Vite builds and Motion. Do not introduce React. Content lives in `content/site.json` and HTML fragments; a future CMS adapter must validate fields and sanitize rich HTML. No CMS integration is claimed now.

Production builds may opt into canonical metadata, structured Event data, sitemap, and indexing through `VITE_SITE_URL`; staging must leave it unset. Optional GA4 via `VITE_GA_ID` requires affirmative consent. Static hosting must revalidate HTML and cache fingerprinted assets; provider-specific headers require deployment verification.

## Boundaries and release evidence

Programa, Galería, and Notas remain on WordPress; their full pages are outside this migration. Eventbrite checkout and WhatsApp conversations are external services. No purchase, message, deployment, domain switch, or live WordPress update is part of this local implementation.

Browser checks should cover mobile overflow, navigation focus, FAQ, reduced motion, images, and consent. Automated accessibility results complement manual review and do not certify WCAG compliance. Record actual outcomes after tests complete; do not substitute the old WordPress audit for current validation. Hosting target, final production URL, analytics property, CMS choice, and any further page migrations remain future decisions.

## Next experiment — after baseline publication to Git

Explore a hero composition inspired by the user-provided date artwork: 26, 27 and 28 connected by a thin line ending at mayo; retain La Sal identity, photographic color treatment and grain. Assess subtle animation with a reduced-motion alternative. Design mobile independently rather than scaling a desktop image. This experiment is not implemented in the baseline.

## Ajuste visual solicitado — 2026-11-07

Restaurar fidelidad a los widgets originales: eliminar cajas de contraste del banner,
normalizar gutters y ritmo vertical, conservar la identidad tipográfica/fotográfica,
y aportar interacción útil con Motion existente, navegación, FAQ y mapas de campus.
Referencias revisadas y decisiones en `docs/audit/UI-UX-REFINEMENT.md`.

## Propuesta de campaña — 2026-11-07

Implementados: banner sin velo oscuro con grano, fechas conectadas, párrafo blanco
centrado dentro del banner, cintillo pausable, glass en entradas, pills, WhatsApp verde
y menú de índice editorial. Mantener padding uniforme y movimiento reducido.
Referencia adicional confirmada por el usuario: https://salt2026.com/home/.
