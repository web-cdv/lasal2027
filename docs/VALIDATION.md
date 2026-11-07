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
