# Implementation log

## 2026-11-06 — Lima

- Reviewed the existing La Sal identity and original WordPress audit. Retained source blocks and provenance from conferencialasal.com; downloaded references live in `/workspace/lasal-review`.
- Established an independent Vite project using plain HTML, CSS, JavaScript, and Motion. Content sources and the build generator produce the homepage; React is not used.
- Integrated La Sal Live before FAQ, retained the supplied visual language, and added image placeholders, reduced-motion handling, native FAQ disclosure, labeled filtering/search, navigation dialog behavior, and coordinated floating actions.
- Added production-configurable metadata and robots/sitemap generation, optional consent-gated GA4, and static-host cache header configuration.
- Documented scope in `PRODUCT.md`, requirements in `PRD.md`, visual tokens in `DESIGN.md`, component previews/extensions in `.impeccable/design.json`, and local/deployment instructions in `README.md`.
- Completed the interactive `design-system.html` artifact with color copying, component states and a repeatable skeleton demonstration. Initial five browser regression and axe accessibility checks passed. Additional error/loading checks accompany final polish.

This log records implementation and local verification. Hosting/domain cutover has not been performed. Full Programa, Galería, and Notas pages remain linked to the active WordPress site and have not been migrated. A CMS connection is future work.

- Self-hosted IBM Plex Mono; added fingerprinted asset URLs for immutable caching. Reduced banner from 8.4 MB to 512 KB and program image from 1.5 MB to 204 KB.
- Applied Impeccable polish: semantic year label, native disclosure controls, visible keyboard focus, readable hero surfaces, and image-failure fallback.

- Final validation: production build passed; all 8 Playwright tests passed, including axe checks on homepage and design-system artifact. Standalone artifact interactions/images verified. Production SEO and consent opt-in/revocation verified using an example URL and intercepted test GA ID; no real analytics event was sent.
- Impeccable final review: ship after correcting self-hosted font documentation, cached image failure fallback, and destination focus after menu navigation.
- Deferred experiment: banner dates connected by a line, photographic grain and subtle animation based on the supplied reference; develop after this baseline commit/push, with a mobile-specific composition.

## 2026-11-06 — GitHub Pages preview

- Added automatic GitHub Pages deployment from `main`, using the static `dist/` build and relative asset paths.
- Preview keeps staging noindex settings and analytics disabled. Hosting does not modify WordPress or its domain.

- GitHub Pages activation and deployment succeeded through the workflow. Verified HTTP 200 for the homepage and design system, mobile layout, images, FAQ filtering, and no JavaScript errors in the smoke test. Preview: https://web-cdv.github.io/lasal2027/.

## 2026-11-07 — Fidelidad visual y UI/UX Pro Max

- Eliminados los rectángulos del hero; contraste mediante una capa continua sobre el grano original.
- Unificados gutters, ritmo vertical, títulos y tamaño de lectura en Áreas/Tendremos.
- Simplificadas sombras de tarjetas y filtros FAQ; corregida numeración y disposición del menú.
- Añadidos mapas de sedes y entradas breves con Motion; conservado movimiento reducido.
- Actualizados sistema de diseño, artefacto, PRD y documentación de referencias.
- Incorporadas las skills instaladas por `uipro init --ai codex`.
- Validación: build y 9 pruebas aprobadas; seis tamaños revisados, contraste sobre imagen medido y artefacto autocontenido verificado.

## 2026-11-07 — Corrección de publicación

- Detectado Pages en modo `legacy` publicando la raíz de main además del workflow Vite.
  La publicación de código fuente podía sobrescribir `dist/` después de una comprobación correcta.
- El workflow exige Pages en modo `workflow` antes de desplegar y verifica los recursos públicos después. El cambio de Source requiere al administrador: la credencial disponible responde 403 al intentar modificarlo.
- El administrador seleccionó GitHub Actions y la API confirmó `build_type: workflow`.
- Nueva comprobación post-despliegue: rechaza HTML fuente y exige respuestas válidas de CSS, JS, imágenes y fuentes. Probada contra el build local; detecta correctamente la página sin compilar.

## 2026-11-07 — Propuesta de campaña, Passion 27 y SALT 2026

- Banner sin velo opaco, grano adicional y fechas conectadas con dibujo de línea.
- Párrafo introductorio blanco y centrado dentro del banner, después de ubicación/público.
- Cintillo de fechas pausable, menú de índice editorial, filtros/maps en pills.
- Liquid glass en la barra de entradas; WhatsApp verde con icono vectorial.
- Reveals en Áreas, actividades y fechas Live; controles de movimiento reducido.
- Padding de todas las secciones comprobado en siete tamaños; sistema de diseño y PRD actualizados.

## 2026-11-07 — Motion, skeleton real y revisión de glass

- Entrada escalonada del hero con Motion y sección intermedia de texto ligado al scroll.
- Respuesta elástica de los filtros FAQ, manteniendo teclado y selección accesible.
- Skeleton real del fondo y fotografía, wipe al cargar, timeout de 12s y reintentos; HTML y fuentes fallback siempre visibles.
- Eliminadas sombras de texto, cajas y filtros; glass adaptado al código suministrado sin countdown vencido.
- Paleta HEX muestreada del banner guardada para el próximo ajuste de ReactBits.
- Referencias web solicitadas devolvieron 403; se adaptaron los efectos descritos y el adjunto Vue a Motion JavaScript, sin afirmar una copia exacta ni añadir React/Vue.
- Retirado el botón de pausar por petición del usuario. El cintillo ahora responde al scroll; sin bucle automático y estático con movimiento reducido.

## 2026-11-07 — Navegación, filtros y fondo Grainient

- Cintillo autónomo de 32s, sin enlace al scroll ni botón separado. Pausa con foco, hover, toque, pestaña oculta o fuera de pantalla; estático con movimiento reducido.
- Márgenes internos heredados de Elementor eliminados en Tendremos y Áreas; reglas alineadas al contenido. FAQ centrado con preguntas alineadas a la izquierda.
- Menú lateral escalonado inspirado en StaggeredMenu: capas lila/violeta, numeración, enlaces reales y redes solicitadas, con diálogo nativo y Escape.
- FAQ con General, Registro, Extranjero y Otros en una barra unida. Indicador compartido con glide y resorte bounce 0.16, sin intro ni colapso; selección accesible con aria-pressed.
- Grainient de React Bits adaptado a JavaScript/WebGL2, carga separada de 5.4 KB gzip aprox. Siete colores; franjas azules amplias, verde/ámbar estrechas, coral/rosa/lila abajo. Ángulo 170° en las coordenadas del shader para conservar la composición vertical; flow .7, silk .37, grano .08, escala .3, velocidad .6, contraste 1.01, variación 11 y stir .9.
- Grano fijo y textura superpuesta; resolución limitada a DPR 1, pausa fuera de pantalla/pestaña oculta y movimiento reducido. Imagen original de respaldo ante ausencia o pérdida de WebGL. No se modifica WordPress.

## 2026-11-07 — Fondo fiel a la referencia y tipografía limpia

- Eliminados todos los contornos de texto del hero y del ejemplo del sistema de diseño, sin añadir sombras.
- Imagen original como base visible, encuadrada al 100% × 140% desde arriba para conservar azul, horizonte verde/ámbar y rosa inferior.
- Grainient mezcla soft-light al 32%: ocho muestras del arte original, lavanda/azul/celeste/verde/ámbar/coral/rosa/crema. Movimiento más lento (.35), menor seda (.12), grano .13 y tamaño 1.6. Textura adicional al 46%; se preservan las fibras originales.
- Build y 14 pruebas aprobadas. Capturas desktop/móvil y contorno computado de 0px comprobados.

## 2026-11-07 — Grainient autónomo y superficies sin bordes

- Grainient opaco, sin mezcla con la imagen: paleta de ocho muestras y horizonte curvo verde/ámbar sobre coral y rosa. La imagen sólo sirve de fallback sin WebGL; se retira la textura SVG superpuesta.
- Eliminados bordes decorativos; se mantienen indicadores de foco del teclado y la ruta SVG de fechas.
- La Sal Live utiliza los mismos tokens de padding que las secciones. Verificado a 390px: 20px en ambos, sin overflow.
- Áreas oscuras con haz blanco de intensidad .15, tamaño 240px, proximidad 80px, suavizado .3 y ambiente tenue, adaptado a JavaScript de la referencia SpotlightCard. Sin borderGlow por la petición de quitar bordes. Sin grano en tarjetas; movimiento reducido y táctil mantienen ambiente estático.
- Propósito editorial con bandas Creatividad / Comunidad / Visión, logo y movimiento suave. Cintillo amarillo lima, texto de mayor peso y logos en lugar de asteriscos, conservando dimensiones y fechas.
