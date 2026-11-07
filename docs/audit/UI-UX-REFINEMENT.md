# Ajuste visual — 7 noviembre 2026

## Punto de partida

Los widgets y capturas enviados por el usuario definen la identidad. La revisión
anterior añadió rectángulos oscuros a título, fechas, mes y ubicación. Se eliminaron
para recuperar una composición continua, con un scrim azul sobre la imagen completa.
Se conservaron fotografía, grano, IBM Plex Mono, año circular, colores, distribución
de Áreas y La Sal Live antes de Preguntas frecuentes.

## Referencias consultadas

- [VOUSCon 2027](https://www.vouschurch.com/vouscon): revisión del HTML y portada en
  Chromium; fecha y sede junto a la identidad, imagen a todo el ancho y barra de
  acceso a entradas. Se adopta la jerarquía; no su vídeo, logotipo ni tipografía.
- [Passion 2027](https://www.passion2027.com/): HTML con sedes, fechas, hoteles y FAQ;
  navegación y llamada de registro visibles. Su contenido animado no se renderizó
  por completo en las capturas: no se afirma una revisión visual integral.
- [Global Leadership Summit](https://globalleadership.org/summit/): revisión del
  HTML, modalidades de participación y sedes diferenciadas. Referencia de arquitectura
  de información, no de un efecto visual comprobado.
- [La Sal actual](https://conferencialasal.com/): HTML accesible durante esta revisión;
  comparación con los bloques locales y capturas originales del usuario.

Los primeros intentos a passionconferences.com, vousconference.com y saltcommunity.com
respondieron 403. Se utilizaron las páginas oficiales alternativas citadas arriba.
No se descargaron ni incorporaron imágenes de terceros al sitio.

## UI/UX Pro Max

Se consultaron `creative conference editorial --design-system`,
`conference event editorial --domain landing` y
`reduced motion scroll animation --domain ux`.
La primera recomendación era genérica: se descartaron sus fuentes y paleta.
Se aplicaron alineación común, medida legible, contraste, estados de controles,
animación breve y respeto por movimiento reducido. Se mantuvo Motion existente,
sin añadir GSAP ni React.

## Resultado

- Márgenes compartidos de 56/36/20px, centrado para pantallas grandes.
- Padding vertical de sección 80/64/48px; tarjetas 32/28/24px.
- Banner sin fondos individuales, texto introductorio sobre papel.
- Cuerpo de Áreas y Tendremos a 16px, sin sombras ni hover de falsa interacción.
- FAQ alineada al resto, filtros subrayados y disclosures nativos con indicador.
- Menú numerado coherente, acceso al programa y enlaces a mapas de campus.
- Entradas de 600–700ms; menú 250ms; sin scroll forzado ni contadores artificiales.
- Espacio reservado para la barra flotante y tipografía mínima de 14px en el pie del banner.

Validación final en `docs/VALIDATION.md`. Los análisis automáticos no sustituyen una
prueba completa con lectores de pantalla o dispositivos físicos.
