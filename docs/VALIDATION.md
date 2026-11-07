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
- Último ajuste del cintillo: 14 pruebas aprobadas con comprobación de desplazamiento ligado al scroll, ausencia de bucle automático y estado estático con movimiento reducido.

## Grainient, menú escalonado y PillNav — revisión actual

- Build y 14 pruebas aprobadas, incluido escaneo axe, teclado, filtros, movimiento reducido y cintillo autónomo.
- Grainient WebGL2 comprobado en Chromium con SwiftShader: canvas listo a 1440px y 390px, sin errores JavaScript ni overflow móvil; pérdida de contexto oculta el canvas y conserva el fondo original.
- Revisión visual de hero, menú y FAQ a 320/390/1440px. En móvil, título y regla de Tendremos empiezan ambos a 20px.
- Adaptación del código de React Bits con licencia incluida en public/react-bits-license.txt. Safari/Firefox y GPU de dispositivos físicos pendientes de verificación.

## 2026-11-07 — Fondo fiel a la referencia y tipografía limpia

- Eliminados todos los contornos de texto del hero y del ejemplo del sistema de diseño, sin añadir sombras.
- Imagen original como base visible, encuadrada al 100% × 140% desde arriba para conservar azul, horizonte verde/ámbar y rosa inferior.
- Grainient mezcla soft-light al 32%: ocho muestras del arte original, lavanda/azul/celeste/verde/ámbar/coral/rosa/crema. Movimiento más lento (.35), menor seda (.12), grano .13 y tamaño 1.6. Textura adicional al 46%; se preservan las fibras originales.
- Build y 14 pruebas aprobadas. Capturas desktop/móvil y contorno computado de 0px comprobados.

## 2026-11-07 — Auditoría tipográfica, menú y contraste

- Menú alineado con StaggeredMenu: panel blanco, tipografía sans serif, enlaces negros, números/acento rojo; cierre textual con SVG pequeño, sin círculo doble ni cabecera negra. Corregida herencia que dejaba enlaces blancos sobre crema.
- Escala fluida: cuerpo 16px, títulos de sección 32–64px, subtítulos 20–26px, hero 32–72px. Reglas de mayor especificidad neutralizan cambios de orden CSS del build.
- Banner: transición clara adelantada en el shader y texto oscuro en ubicación/introducción. Sin superposición de fotografía.
- SpotlightCard claro sólo en #areas: adaptación del código de React Bits con su función de caída, beam, ambient y flare, intensidad del tema claro y movimiento reducido. Sin sombras/borde por preferencia del usuario.
- Tendremos plano sin hover iluminado; restauradas líneas estructurales en actividades, programa, Live y FAQ.
- Verificados 320/390/768/1440/1920px sin overflow; un único h1, títulos consistentes. 15 pruebas aprobadas, incluido nuevo escaneo axe con menú abierto a 320px.
- SEO: título/descripción, lang es, encabezados semánticos, imagen social, canonical/sitemap/robots y Event con organizador disponibles al configurar VITE_SITE_URL. Preview continúa noindex para evitar duplicar WordPress. Navegadores físicos y lector de pantalla requieren validación manual adicional.

## 2026-11-07 — Buscador FAQ inspirado en Prompt Bar

- Barra única gris carbón, radio16px, lupa vectorial, campo16px y botón circular para borrar. Sin bordes decorativos, sombras ni controles ajenos a buscar preguntas.
- Conserva etiqueta accesible, resultados anunciados, búsqueda por tildes/categorías y foco de teclado. Borrar devuelve el foco al input; control mínimo44px.
- Revisión integrada: cintillo con copias de al menos100vw, revelado del propósito sin blur, líneas equilibradas y fila práctica del hero bajada manteniendo texto oscuro.
- Propuesta HTML alternativa de Tendremos permanece sin aplicar.
