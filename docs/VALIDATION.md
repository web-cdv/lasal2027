# Validación de la base independiente

- `npm run build`: completado sin errores.
- `PLAYWRIGHT_EXECUTABLE_PATH=/usr/bin/chromium npm test`: 8 pruebas aprobadas.
- Anchos comprobados: 320, 390, 768 y 1440 px, sin desbordamiento horizontal.
- Navegación: apertura, Escape, devolución de foco y foco en destino de enlaces internos.
- FAQ: búsqueda con tildes, filtros, sin resultados y apertura por teclado.
- Sin JavaScript: contenido, 15 preguntas y enlace de compra disponibles.
- Imagen: carga y fallback ante fallo; skeleton respeta movimiento reducido.
- Axe WCAG A/AA: sin infracciones detectadas en las muestras de portada móvil y artefacto. No constituye certificación de accesibilidad.
- Sistema visual: demos, paleta y estado de carga comprobados; HTML autocontenido verificado con recursos embebidos.
- SEO de producción: canonical, robots y datos estructurados generados con URL de ejemplo, separada del build staging.
- Google Analytics: no solicita el script sin consentimiento; acepta y revoca con ID de prueba interceptado localmente. No se verificó una propiedad real ni se enviaron eventos reales.
- Cache: configuración preparada para hosting compatible con `_headers`; las cabeceras reales se validarán cuando se elija y despliegue el hosting.
- Impeccable polish: revisión visual independiente y correcciones de semántica, foco, fuentes y fallback completadas.

Pendiente: Safari/Firefox, dispositivos físicos y lector de pantalla; proveedor de hosting, dominio final, CMS, propiedad GA real y migración de las páginas secundarias enlazadas a WordPress. No se alteró WordPress ni DNS.

## Refinamiento UI/UX Pro Max — 2026-11-07

- Build completado y **9 pruebas Playwright aprobadas**, incluyendo menú por teclado en horizontal.
- Comprobación visual/layout a 320, 390, 768, 844 (horizontal), 1440 y 1920px: sin overflow;
  navegación, introducción y secciones comparten el mismo inset.
- Contraste del banner muestreado en capturas con texto oculto, sobre los rectángulos de cada
  etiqueta: mínimo 4,37:1 en titulares grandes (requisito 3:1) y 5,12:1 en textos pequeños
  (requisito 4,5:1). Métricas conservadas en `docs/audit/layout-refinement.json`.
- Axe A/AA sin infracciones detectadas en portada móvil y sistema de diseño.
- Artefacto HTML autocontenido regenerado, acción de demostración operativa, sin errores JS.
- Bundle principal: aproximadamente 23,5 KB gzip. Sin librerías nuevas de ejecución ni vídeo.
- Limitaciones: referencias externas parcialmente animadas; resultados en Chromium,
  no una certificación ni comprobación de todos los navegadores/dispositivos.

## Propuesta de campaña — banner sin velo y cintillo

- Build completado; 10 pruebas aprobadas, incluyendo pausa/reanudación del cintillo y cambio de preferencia de movimiento.
- Siete tamaños: 320, 375, 390, 768, 844 horizontal, 1440 y 1920px, sin overflow.
- Programa, Tendremos, Áreas, Live y FAQ comparten padding: 48×20 móvil, 64×36 tablet, 80×56 escritorio y centrado en pantalla amplia. Métricas en campaign-layout.json.
- Párrafo introductorio dentro de hero-surface, centrado y blanco, después del footer informativo.
- Axe A/AA sin infracciones detectadas en las muestras. Las métricas antiguas del scrim NO describen este banner; la lectura sobre la fotografía usa contorno/sombra local y revisión visual.
- Artefacto autónomo regenerado, demo operativa, sin errores JS.
- Comprobador de recursos probado sobre build; maneja correctamente SVG inline con referencias internas de filtros.
- Safari/Firefox y dispositivos físicos siguen pendientes. Liquid glass tiene fallback opaco cuando no existe soporte de backdrop-filter.

## Motion y glass sin sombras

- Build y 14 pruebas Playwright aprobadas: hero con fallo/reintento, fotografía con fallo/reintento, texto ligado al scroll y movimiento reducido, cambios rápidos de categorías y teclado.
- Revisión móvil de sección intermedia y filtros; sin overflow a 320/390/768/1440px.
- Skeletons sólo durante carga real; sin JavaScript el HTML y las imágenes nativas siguen disponibles. Feedback absoluto para evitar saltos al resolver el fondo.
- Corregida recuperación de foco: un evento close tardío del menú no roba foco a un control ya activo.
- Artefacto autónomo regenerado, acción de prueba operativa sin errores JS.
- Efectos adaptados con Motion JavaScript a partir de la descripción y adjuntos: las tres URLs externas respondieron 403 y no se afirma equivalencia visual exacta.
