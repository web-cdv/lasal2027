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

## Animaciones y carga progresiva

Hero escalonado, sección editorial ligada al scroll y selección elástica de categorías.
La carga nunca sustituye textos estáticos por skeletons ni bloquea la página completa.
Imágenes con estados loading/ready/error y reintento, siempre con salida tras 12s.
La siguiente iteración de ReactBits espera el ajuste del usuario: paleta entregada,
fondo actual conservado. Quitar sombras y usar el glass suministrado sin timer vencido.

## 2026-11-07 — Navegación, filtros y fondo Grainient

- Cintillo autónomo de 32s, sin enlace al scroll ni botón separado. Pausa con foco, hover, toque, pestaña oculta o fuera de pantalla; estático con movimiento reducido.
- Márgenes internos heredados de Elementor eliminados en Tendremos y Áreas; reglas alineadas al contenido. FAQ centrado con preguntas alineadas a la izquierda.
- Menú lateral escalonado inspirado en StaggeredMenu: capas lila/violeta, numeración, enlaces reales y redes solicitadas, con diálogo nativo y Escape.
- FAQ con General, Registro, Extranjero y Otros en una barra unida. Indicador compartido con glide y resorte bounce 0.16, sin intro ni colapso; selección accesible con aria-pressed.
- Grainient de React Bits adaptado a JavaScript/WebGL2, carga separada de 5.4 KB gzip aprox. Siete colores; franjas azules amplias, verde/ámbar estrechas, coral/rosa/lila abajo. Ángulo 170° en las coordenadas del shader para conservar la composición vertical; flow .7, silk .37, grano .08, escala .3, velocidad .6, contraste 1.01, variación 11 y stir .9.
- Grano fijo y textura superpuesta; resolución limitada a DPR 1, pausa fuera de pantalla/pestaña oculta y movimiento reducido. Imagen original de respaldo ante ausencia o pérdida de WebGL. No se modifica WordPress.

## 2026-11-07 — Grainient autónomo y superficies sin bordes

- Grainient opaco, sin mezcla con la imagen: paleta de ocho muestras y horizonte curvo verde/ámbar sobre coral y rosa. La imagen sólo sirve de fallback sin WebGL; se retira la textura SVG superpuesta.
- Eliminados bordes decorativos; se mantienen indicadores de foco del teclado y la ruta SVG de fechas.
- La Sal Live utiliza los mismos tokens de padding que las secciones. Verificado a 390px: 20px en ambos, sin overflow.
- Áreas oscuras con haz blanco de intensidad .15, tamaño 240px, proximidad 80px, suavizado .3 y ambiente tenue, adaptado a JavaScript de la referencia SpotlightCard. Sin borderGlow por la petición de quitar bordes. Sin grano en tarjetas; movimiento reducido y táctil mantienen ambiente estático.
- Propósito editorial con bandas Creatividad / Comunidad / Visión, logo y movimiento suave. Cintillo amarillo lima, texto de mayor peso y logos en lugar de asteriscos, conservando dimensiones y fechas.
