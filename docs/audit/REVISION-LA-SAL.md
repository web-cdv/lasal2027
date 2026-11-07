# Revisión previa al sistema de diseño — La Sal 2027

Fecha: 6 de noviembre de 2026, hora de Perú. Método: Impeccable 4.8.0, playbook audit, detector sobre la portada a 390 × 844, lectura de bloques y CSS publicados, comprobaciones con Chromium/Playwright. Esta es una auditoría técnica con inventario visual y editorial; no una ejecución del comando critique ni una certificación WCAG.

## Dictamen

La identidad es reconocible, pero la implementación todavía no constituye un sistema coherente y reutilizable. Hay estilos locales mezclados con valores globales de Elementor, reglas que afectan otras secciones y controles incompletos para teclado. Conservar la identidad y formalizar sus reglas es más adecuado que sustituir la dirección visual.

Evaluación orientativa según la rúbrica de audit (no puntuación automática ni Lighthouse):

| Dimensión | Puntos / 4 | Evidencia |
|---|---:|---|
| Accesibilidad | 1 | Acordeones inaccesibles por teclado, contraste y estructura de títulos |
| Rendimiento | 2 | Existe carga diferida, pero fondos grandes e importaciones repetidas |
| Tokens y temas | 1 | Variables por bloque y kit Elementor sin fuente de verdad compartida |
| Responsive | 2 | Cinco anchos sin overflow, pero superposición de controles y texto pequeño |
| Integridad | 2 | Componentes identificables, con fugas CSS y comportamiento dependiente de JS |
| Total | 8/20 | Requiere correcciones importantes de implementación |

No se exige un selector de modo oscuro: las superficies claras y oscuras son parte de la composición actual.

## Alcance y fuentes

Se revisaron los seis archivos de texto adjuntos: HTML completo copiado desde F12, portada, Tendremos, Áreas, FAQ y preventa; además del WhatsApp pegado en el chat, textos de presentación y Programa, imágenes adjuntas y capturas de Elementor. El HTML desde F12 incluye administración: no debe convertirse directamente en el código de producción.

La portada pública y sus CSS están en /workspace/lasal-review. No se auditó el interior de Programa, Galería, Notas, Eventbrite ni WhatsApp; no se enviaron mensajes ni se hicieron compras. Las capturas anteriores de escritorio y móvil se revisaron como evidencia complementaria. No se comprobó en Safari, Firefox, teléfono físico, lector de pantalla real, zoom al 200 %, red móvil limitada ni todos los estados de contraste.

## Inventario de contenido y componentes

| Bloque | Contenido y función | Identidad a preservar |
|---|---|---|
| Navegación | Logo centrado, botón y panel lateral con enlaces | Marca blanca, IBM Plex Mono, panel azul |
| Portada | Imagen & Semejanza; 26–28 mayo 2027; Lima; dirección | Fondo multicolor con grano, texto blanco, año circular SVG |
| Presentación | Conferencia creativa y de liderazgo de caminodevida; audiencia de pastores y equipos; Live 29–30 mayo | Voz cercana, descripción del propósito |
| Programa | Miércoles 26, 6–8pm; jueves 27, 10am–8pm; viernes 28, 10am–7pm; enlace /programa/ | Papel crema, fotografía, reglas finas, CTA rojo |
| Tendremos | 7 sesiones; 12 talleres; 4 bloques 5 en 1, equivalentes a 20 mini talleres; 24 mesas | Cifras grandes, gris oscuro, títulos rosas, grilla editorial |
| Áreas | Alabanzas, Artes escénicas, Comunicaciones, Producción, Liderazgo | Cinco tarjetas numeradas; 3+2 en escritorio, 2+2+1 tablet, 1 columna móvil |
| FAQ | 15 preguntas: General 5, Registro 4, Extranjero 2, Otros 4 | Fondo oscuro, buscador, categorías, acordeones y superficies translúcidas |
| WhatsApp | +51 993 520 544; mensaje y evento ClickWhatsApp | Acción verde reconocible, ayuda contextual |
| Preventa | $55; Eventbrite 2027; apertura 3 octubre 2026, 12:00 Perú | Cápsula inferior translúcida, precio y Comprar |

La fecha de apertura de venta en 2026 no contradice la conferencia de 2027. El H1 «2026» encontrado en el DOM está oculto: no equivale a un año equivocado visible. Las políticas de entradas, niños, grabaciones, hoteles y pagos son contenido suministrado, no hechos comerciales verificados externamente.

## Hallazgos priorizados

16 hallazgos consolidados: P0: 0; P1: 4; P2: 11; P3: 1. Ausencia de P0 observado no acredita el proceso de compra externo.

| ID | Prioridad | Ubicación / evidencia | Impacto y recomendación | Referencia / siguiente acción |
|---|---|---|---|---|
| A01 | P1 | FAQ, .faq-question: 15 DIV con tabIndex -1 y sin aria-expanded | No se abren con teclado. Usar button o details/summary, con estado y asociación de panel | WCAG 2.1.1, 4.1.2; impeccable harden |
| A02 | P1 | Programa/Tendremos/Áreas/FAQ no son H2; H1 salta a H3 | La jerarquía visual no se comunica semánticamente. H1 de portada, H2 por sección y H3 de tarjetas | WCAG 1.3.1; impeccable harden |
| A03 | P1 | Descripción sobre imagen: detector mide 2,6:1 en muestra móvil | Lectura insuficiente. Dar superficie o protección tonal estable y volver a medir en todos los fondos/anchos | WCAG 1.4.3; impeccable colorize |
| A04 | P1 | FAQ, .tab-button: botones sin relación ni estado de selección accesible | Implementar patrón tabs con relaciones y teclado, o filtros con estado accesible; no basta la clase active | WCAG 4.1.2; impeccable harden |
| A05 | P2 | .is-hero__footer p: 9 px móvil, tres avisos del detector | Ubicación y audiencia difíciles de leer. Establecer mínimo legible y probar ampliación; el tamaño solo no es un incumplimiento WCAG automático | impeccable typeset |
| A06 | P2 | .event-container y .float, 320 y 390 × 844 | Sus rectángulos se superponen aproximadamente 8,8 px. Coordinar posición según altura real y reservar espacio para contenido/foco | impeccable adapt |
| A07 | P2 | Fondo2-3.png: 8.427.059 bytes; Foto-programa.png: 1.548.563 | Transferencia costosa. Variantes AVIF/WebP y responsive; conservar textura visible y medir calidad. No se midieron Core Web Vitals | impeccable optimize |
| A08 | P2 | Kit global: Roboto/Roboto Slab; widgets: IBM Plex Mono; tooltip: Poppins | Tipografía y dependencias sin criterio común. Consolidar familia, pesos y carga; no eliminar una fuente sin revisar usos | impeccable extract |
| A09 | P2 | FAQ: documento HTML completo, :root, *, body, a, strong, .container | Reglas alcanzan otros bloques. Convertir a componente y encapsular estilos; separar documento y contenido | impeccable harden |
| A10 | P2 | Tendremos: --bg: ##343434 | Color inválido: fondo depende del contenedor. Token de superficie válido; mantener dirección gris observada | impeccable extract |
| A11 | P2 | Programa, texto blanco sobre #F6121C: aviso 4,2:1 | Validar tamaño/peso efectivos antes de declarar incumplimiento; ajustar token del CTA para 4,5:1 en texto normal | impeccable colorize |
| A12 | P2 | FAQ, respuesta «Cuándo y dónde»; duplicación niños/edad | Falta la fecha solicitada y hay política duplicada. Completar con fechas ya suministradas y usar una fuente editorial única; no inventar edad mínima | impeccable clarify |
| A13 | P2 | .event-buy: href # y hidden hasta ejecutar JS; WhatsApp llama fbq sin comprobarlo | Compra depende de JS y tracking puede lanzar error si falta Pixel. Enlace real y visible como base; mejora progresiva y guarda de tracking | impeccable harden |
| A14 | P2 | FAQ searchInput solo tiene placeholder; noResults sin región de estado; búsqueda sin normalización de tildes | Añadir etiqueta persistente/accesible y anuncio discreto de resultados; normalizar búsqueda. No se afirma que bebes falle: ambos casos probados devolvieron 2 | WCAG 3.3.2 / 4.1.3 según implementación; impeccable harden |
| A15 | P2 | FAQ/WhatsApp con animaciones sin alternativa propia; navegación reduce todo a 0,01ms | Definir política de movimiento reducido que conserve estados y feedback; evitar soluciones globales indiscriminadas | impeccable animate |
| A16 | P3 | Áreas: Comuni-<br>caciones y Artes<br>escénicas | Cortes rígidos también en móvil. Mantener nombres íntegros y adaptar saltos al espacio; revisar líneas sueltas sin reescribir contenido factual | impeccable typeset |

## Interpretación del detector

Salida original: docs/audit/impeccable-mobile.json. Se completó con código de salida 2, que indica hallazgos, no fallo de ejecución. Hay 5 avisos principales y 8 recomendaciones: tres textos pequeños, un salto de encabezado, una muestra de contraste; las recomendaciones incluyen contraste del CTA, dos palabras sueltas y cinco índices numerados.

Los índices 01–05 NO se consideran un defecto por sí mismos: pertenecen al diseño aportado por el usuario y pueden conservarse. Las recomendaciones estéticas automáticas no tienen autoridad para reemplazar la marca. El contraste sobre imágenes debe medirse por estado; el valor muestreado no representa toda la página.

## Resultados y límites

- Sin overflow horizontal a 320, 390, 768, 1024 y 1440 px, altura 844. Esto no prueba gestos táctiles ni zoom.
- Menú abre, cierra con Escape y devuelve el foco. No se completó prueba exhaustiva de trampa de foco.
- Buscar entrada: 4 resultados; bebes y bebés: 2 cada uno; zzzzzz: 0. Las keywords explican coincidencias pese a no normalizar tildes.
- Hospedajes: comprobación previa a 390 px mostró altura y contenido de 844 px sin recorte. El max-height:1000px sigue siendo frágil al ampliar texto; no reportar recorte actual como confirmado.
- La fotografía tiene alt vacío. Es una decisión editorial pendiente: si solo ambienta puede ser decorativa; si comunica una actividad relevante, describirla. Los fondos decorativos no necesitan alt.
- Los fondos se cargan diferidamente: una captura sin recorrer la página puede mostrar el color de respaldo. No confundirlo con el diseño final ni con un recurso roto.
- Los originales Artes-web.webp (1.109.334 bytes) y artes-cel-scaled.webp (1.944.184 bytes) son inventario, no prueba de que esos originales se descarguen en cada viewport; el navegador seleccionó variantes srcset.

## Base para el futuro sistema, aún no normativa

Preservar: tono creativo y cercano; audiencia pastoral y equipos; IBM Plex Mono como identidad dominante; papel crema y grano multicolor; alternancia de superficies claras/oscuras; números y líneas editoriales; rosa para Tendremos; rojo de acción; tratamiento translúcido acotado a ayuda/venta/FAQ.

Valores observados, no tokens aprobados: oscuro #343434 y #242424; blanco #FFFFFF; tarjetas #F2F2F2, hover #E7E7E7, borde #CFCFCF; rosa #FF91A4; CTA #F6121C; panel azul rgba(55,71,139,.98); WhatsApp #25D366. El kit contiene colores heredados sin uso acreditado: no deben incorporarse todos a la paleta oficial.

Definir después: roles de color por superficie y contraste, escala tipográfica legible, espaciado, anchos, grillas y breakpoints, radios según función, bordes/sombras, movimiento, capas flotantes, estados de foco/hover/selección/deshabilitado, política de imágenes, iconos y contenido. Evitar convertir diferencias accidentales entre widgets en reglas oficiales.

Inventario de componentes a documentar: Header, NavigationDialog, Hero, EventIntro, ProgramSection, ScheduleRow, ActivityRow, AreaCard, FAQSearch, CategoryTabs, FAQAccordion, HotelCard, WhatsAppAction, TicketBar y botones/enlaces compartidos.

## Secuencia recomendada

1. Usar este informe para acordar la fuente de verdad de diseño y contenido; conservar el material existente.
2. impeccable extract/document: formalizar tokens y componentes una vez fijada la implementación de referencia, diferenciando valores observados de decisiones nuevas.
3. impeccable harden: semántica, teclado, estados, aislamiento CSS y mejora progresiva.
4. impeccable colorize/typeset/adapt/optimize: contraste, legibilidad, capas móviles y recursos.
5. impeccable audit: repetir detección y pruebas manuales, añadir lector de pantalla, zoom y navegadores.
6. impeccable polish: revisión visual final contra el sistema documentado.

Esta entrega documenta la auditoría. No modifica los bloques ni crea aún un DESIGN.md normativo.
