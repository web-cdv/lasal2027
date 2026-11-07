import fs from "node:fs";
import { load } from "cheerio";
const d = JSON.parse(fs.readFileSync("content/site.json"));
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const part = (n) => fs.readFileSync(`content/${n}.html`, "utf8");
const live = load(part("live"));
live("link").remove();
fs.writeFileSync("src/live.css", live("style").text());
live("style").remove();
live(".ls-live").attr("id", "la-sal-live");
let html = `<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#343434"><title>${esc(d.title)}</title><meta name="description" content="${esc(d.description)}"><meta name="robots" content="noindex,follow"><meta property="og:title" content="${esc(d.title)}"><meta property="og:description" content="${esc(d.description)}"><meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/src/assets/logo.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet"></head><body><a class="skip-link" href="#contenido">Saltar al contenido</a><div class="arrival" aria-hidden="true"><span>LA SAL</span><span class="arrival-line"></span></div><div class="hero-surface">${part("navigation")}<main id="contenido">${part("hero")}<p class="event-intro">${esc(d.intro)}</p></div><section class="section paper program" id="programa" aria-labelledby="program-title"><div class="media-shell"><img src="/src/assets/programa.webp" alt="Participantes compartiendo una fotografía en la conferencia La Sal" width="1067" height="794" loading="lazy" decoding="async"></div><div><h2 id="program-title">Programa</h2><p>${esc(d.program)}</p><ul class="schedule-list">${d.schedule.map((t) => `<li>${esc(t)}</li>`).join("")}</ul><a class="button" href="https://conferencialasal.com/programa/">Ver programa completo</a></div></section><section class="section dark" id="tendremos" aria-labelledby="activities-title"><h2 id="activities-title">Tendremos</h2>${part("activities")}</section><section class="section paper" id="areas" aria-labelledby="areas-title"><h2 id="areas-title">Áreas</h2><div class="ar-wrap"><div class="ar-grid">${d.areas.map((a, i) => `<article class="ar-card"><span class="ar-index" aria-hidden="true">0${i + 1}</span><h3 class="ar-name">${esc(a.name)}</h3><p class="ar-desc">${esc(a.description)}</p></article>`).join("")}</div></div></section>${live("body").html()}<section class="section dark faq-section" id="preguntas" aria-labelledby="faq-title"><h2 id="faq-title">Preguntas frecuentes</h2><p>Todo lo que necesitas saber a tu alcance.</p><div class="faq-tools" hidden><label for="faq-search">Buscar en las preguntas frecuentes</label><input id="faq-search" type="search" placeholder="Entradas, hospedaje, niños…"><fieldset class="faq-filters" hidden><legend>Filtrar por categoría</legend>${d.categories.map((c, i) => `<button type="button" data-category="${c.id}" aria-pressed="${i === 0}">${esc(c.label)}</button>`).join("")}</fieldset><p id="faq-status" role="status" aria-live="polite"></p></div><div class="faq-list">${d.faq.map((f, i) => `<details data-category="${f.category}" data-keywords="${esc(f.keywords)}"><summary>${esc(f.question)}</summary><div class="faq-answer">${f.answer}</div></details>`).join("")}</div></section></main><footer class="site-footer">La Sal · caminodevida · Lima, Perú · 2027<button type="button" id="privacy-settings" hidden>Preferencias de analítica</button></footer><aside class="floating-actions" aria-label="Entradas y contacto"><a class="whatsapp" href="https://wa.me/51993520544?text=Hola%2C%20quisiera%20informaci%C3%B3n%20de%20La%20Sal" target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp <span aria-hidden="true">↗</span></a><div class="ticket-bar"><p>Preventa <span>${esc(d.price)}</span></p><a class="button button-light" href="${esc(d.ticketUrl)}">Comprar entradas</a></div></aside><aside class="consent" aria-label="Preferencias de analítica" hidden><p>Podemos usar Google Analytics para entender cómo se utiliza la web. Tú eliges si permites estas mediciones.</p><button type="button" data-consent="yes">Aceptar analítica</button><button type="button" data-consent="no">Continuar sin analítica</button></aside><script type="module" src="/src/main.js"></script></body></html>`;
// Keep main as a valid single landmark; background wrapper includes only navigation and hero.
html = html
  .replace(
    '<div class="hero-surface">',
    '<main id="contenido"><div class="hero-surface">',
  )
  .replace('<main id="contenido">' + part("hero"), part("hero"));
const $ = load(html);
$('img[src*="logo-la-sal"]').attr("src", "/src/assets/logo.png");
$(".lasal-nav-logo").attr("href", "#contenido");
$(".lasal-nav-links").prepend(
  '<a class="lasal-nav-link" href="#la-sal-live">La Sal Live</a><a class="lasal-nav-link" href="#preguntas">Preguntas frecuentes</a>',
);
$(".ls-kicker").each((i, e) => {
  const h = $("<h3>").attr("class", $(e).attr("class")).text($(e).text());
  $(e).replaceWith(h);
});
$('a[target="_blank"]').attr("rel", "noopener noreferrer");
$("script:not([src])").remove();
$(".is-hero__year").attr("role", "img");
$('link[href*="fonts.googleapis"],link[href*="fonts.gstatic"]').remove();
$(".lasal-nav-widget").append(
  '<noscript><nav class="nojs-nav" aria-label="Enlaces sin JavaScript"><a href="#programa">Programa</a> · <a href="#la-sal-live">La Sal Live</a> · <a href="#preguntas">Preguntas frecuentes</a></nav></noscript>',
);
fs.writeFileSync("index.html", $.html());
