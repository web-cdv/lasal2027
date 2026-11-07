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

## 2026-11-07 — Auditoría tipográfica, menú y contraste

- Menú alineado con StaggeredMenu: panel blanco, tipografía sans serif, enlaces negros, números/acento rojo; cierre textual con SVG pequeño, sin círculo doble ni cabecera negra. Corregida herencia que dejaba enlaces blancos sobre crema.
- Escala fluida: cuerpo 16px, títulos de sección 32–64px, subtítulos 20–26px, hero 32–72px. Reglas de mayor especificidad neutralizan cambios de orden CSS del build.
- Banner: transición clara adelantada en el shader y texto oscuro en ubicación/introducción. Sin superposición de fotografía.
- SpotlightCard claro sólo en #areas: adaptación del código de React Bits con su función de caída, beam, ambient y flare, intensidad del tema claro y movimiento reducido. Sin sombras/borde por preferencia del usuario.
- Tendremos plano sin hover iluminado; restauradas líneas estructurales en actividades, programa, Live y FAQ.
- Verificados 320/390/768/1440/1920px sin overflow; un único h1, títulos consistentes. 15 pruebas aprobadas, incluido nuevo escaneo axe con menú abierto a 320px.
- SEO: título/descripción, lang es, encabezados semánticos, imagen social, canonical/sitemap/robots y Event con organizador disponibles al configurar VITE_SITE_URL. Preview continúa noindex para evitar duplicar WordPress. Navegadores físicos y lector de pantalla requieren validación manual adicional.

- Bandas Creatividad/Comunidad/Visión a todo el viewport, con repetición suficiente para pantallas amplias y recorte sin overflow. Separadores estructurales conservados; tarjetas y controles sin borde.

## 2026-11-07 — ScrollReveal por palabras

- Texto de propósito revelado por palabras con Motion: scrub reversible ligado al scroll, fade .15→1, blur 4→0px, duración .8 y stagger .2; sin rotación, desplazamiento ni suavizado adicional.
- Texto semántico presente en HTML sin duplicación; sin JavaScript y con movimiento reducido se muestra íntegro.
- Fila de público/ubicación/dirección del hero bajada 56px en escritorio y 32px en móvil, manteniendo el color oscuro.

## 2026-11-07 — Composición de fechas fiel a la referencia

- Ruta compacta con 26/27/28 inclinados, mayo en minúscula al lado del último punto, línea fina y estrellas pequeñas. Pie Conferencia La Sal 2027 / Lima – Perú. Tema Imagen & Semejanza secundario y año circular sustituido visualmente por el pie.
- Azul ultramar profundo, coral más vivo, horizonte elevado y grano multiescala con agrupaciones, motas y fibras procedurales; sin imagen superpuesta.
- Responsive sin overflow a 320/390/768/1440px. Se conserva el texto accesible con todas las fechas.

## 2026-11-07 — Áreas claras y fondo anterior del banner

- Áreas: vidrio esmerilado lavanda grisáceo translúcido, texto oscuro, sin borde/sombra. Spotlight circular blanco .15, 240px, suavidad .7, proximidad80, smoothing .3, flare activo, ambient desactivado. Validación: opacidad en reposo0 y hover .1496, responsive y axe aprobados.
- Restaurado Grainient del commit 33d8f7f por aclaración del usuario: la referencia era sólo para la composición de fechas. Se mantienen fechas compactas/inclinadas y mayo en minúscula; no se aplican el nuevo grano ni la nueva paleta del póster.

- Texto de propósito: revelado sólo por opacidad, sin blur; ancho de lectura 42ch, líneas naturales equilibradas, alineación izquierda y alturas de línea consistentes en móvil/escritorio.

- Fila práctica del hero recolocada más abajo: 128px de separación en escritorio, 72px en móvil; conserva el color oscuro.

- Cintillo en bucle continuo con dos copias de al menos un viewport cada una, evitando huecos en pantallas amplias y conservando el reinicio a -50%.

## 2026-11-07 — Buscador FAQ inspirado en Prompt Bar

- Barra única gris carbón, radio16px, lupa vectorial, campo16px y botón circular para borrar. Sin bordes decorativos, sombras ni controles ajenos a buscar preguntas.
- Conserva etiqueta accesible, resultados anunciados, búsqueda por tildes/categorías y foco de teclado. Borrar devuelve el foco al input; control mínimo44px.
- Revisión integrada: cintillo con copias de al menos100vw, revelado del propósito sin blur, líneas equilibradas y fila práctica del hero bajada manteniendo texto oscuro.
- Propuesta HTML alternativa de Tendremos permanece sin aplicar.

## 2026-11-07 — Waves en FAQ

- Código Waves proporcionado verificado contra la fuente de React Bits y adaptado a JavaScript/WebGL2, sin añadir React. Sólo #preguntas, decorativo aria-hidden y pointer-events none.
- Configuración: blanco normal/acento, spacing11, amplitud37, twist.5, speed1, radio175, strength.9, sólido, ancho.75, rotación0, escala1, variación3, bounce.3, return1.4, fade0, opacidad.2, mouse/click/intro activos, lightModefalse.
- ResizeObserver adapta el canvas a las respuestas y filtros; DPR1, pausa fuera de vista y pestaña oculta, movimiento reducido estático y fondo carbón de respaldo sin WebGL.
- Build y pruebas responsive, teclado/búsqueda y axe aprobadas; WebGL comprobado con Chromium SwiftShader sin errores JS.

## 2026-11-07 — FAQ estable y propuesta Tendremos aplicada

- FAQ reserva la altura de la categoría más alta para el ancho actual; se recalcula al cambiar ancho/fuentes. Respuestas abiertas pueden aumentar la reserva, que se conserva al filtrar. Estado de resultados con espacio reservado.
- Recuperados iconos SVG de información, ticket, avión y ayuda. Acordeón nativo details/summary con chevron rotativo y animación medida de 320ms; movimiento reducido sin animación, sin max-height que recorte respuestas.
- Propuesta Tendremos aprobada y aplicada: tres formatos en la columna izquierda, Mesas en la derecha con título junto al24, descripción y notas. Una columna bajo900px. Separadores estructurales y superficies planas preservados.
- 16 pruebas aprobadas incluyendo altura constante por categoría y búsqueda sin resultados en móvil/escritorio.

- Áreas: superficie blanca opaca más clara que el papel jaspeado. Spotlight circular lavanda .20 para distinguir el movimiento sobre blanco, radio240, suavidad.7 y flare; sin luz ambiental, bordes ni sombras.

## 2026-11-07 — Apertura de marca con logo y grano

- Loading breve a pantalla completa: logo original, textura de grano estática, manchas azul/coral/rosa y luz que sigue al cursor con requestAnimationFrame.
- Se retira al resolver fuentes e imagen del hero (mínimo450ms), o por límite1800ms más salida420ms. Sin porcentaje artificial ni esperas para contenido secundario.
- Botón Entrar, Escape y foco de teclado fuera del loading permiten omitirlo. No bloquea scroll/puntero ni oculta el contenido semántico. Sin JS permanece oculto; con movimiento reducido se omite.
- Probados carga detenida, omisión/foco al contenido, no-JS, movimiento reducido, teclado y axe. Captura revisada en escritorio.

## 2026-11-07 — Loading oscuro, cursor y composición práctica

- Sustituida apertura coloreada por fondo #101011, logo ensamblado en cuatro franjas y contador porcentual sin botón visible. El avance refleja resolución de fuentes, logo y hero, interpolado visualmente; no mide bytes. Límite1800ms independiente del porcentaje para recursos detenidos, sin forzar100 si fallan en resolver.
- Escape/foco externo omiten el loading; sin JS o con movimiento reducido permanece fuera de vista.
- Cursor inspirado en TargetCursor: esquinas rojas, giro2s, ajuste y parallax sutil en controles, sin dependencias adicionales. Sólo puntero preciso, desactivado en inputs, móvil, teclado y movimiento reducido.
- Cómo llegar alineado a la derecha de nombre/dirección del campus con margen automático y wrap responsive; conserva enlaces reales.
- Público/ubicación agrupados directamente encima del párrafo introductorio con40px,32px móvil. Campo claro del shader adelantado para dar contraste a ambos.
