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
let html = `<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#343434"><title>${esc(d.title)}</title><meta name="description" content="${esc(d.description)}"><meta name="robots" content="noindex,follow"><meta property="og:title" content="${esc(d.title)}"><meta property="og:description" content="${esc(d.description)}"><meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/src/assets/logo.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet"></head><body><a class="skip-link" href="#contenido">Saltar al contenido</a><div class="arrival" aria-hidden="true"><span>LA SAL</span><span class="arrival-line"></span></div><div class="hero-surface">${part("navigation")}<main id="contenido">${part("hero")}<div class="event-intro"><p>${esc(d.intro)}</p></div></div>${part("ribbon")}<section class="section paper program" id="programa" aria-labelledby="program-title"><div class="media-shell"><img src="/src/assets/programa.webp" alt="Participantes compartiendo una fotografía en la conferencia La Sal" width="1067" height="794" loading="lazy" decoding="async"></div><div><h2 id="program-title">Programa</h2><p>${esc(d.program)}</p><ul class="schedule-list">${d.schedule.map((t) => `<li>${esc(t)}</li>`).join("")}</ul><a class="button" href="https://conferencialasal.com/programa/">Ver programa completo</a></div></section><section class="section dark" id="tendremos" aria-labelledby="activities-title"><h2 id="activities-title">Tendremos</h2>${part("activities")}</section>${part("statement")}<section class="section paper" id="areas" aria-labelledby="areas-title"><h2 id="areas-title">Áreas</h2><div class="ar-wrap"><div class="ar-grid">${d.areas.map((a, i) => `<article class="ar-card"><span class="ar-index" aria-hidden="true">0${i + 1}</span><h3 class="ar-name">${esc(a.name)}</h3><p class="ar-desc">${esc(a.description)}</p></article>`).join("")}</div></div></section>${live("body").html()}<section class="section dark faq-section" id="preguntas" aria-labelledby="faq-title"><h2 id="faq-title">Preguntas frecuentes</h2><p>Todo lo que necesitas saber a tu alcance.</p><div class="faq-tools" hidden><label class="lasal-sr-only" for="faq-search">Buscar en las preguntas frecuentes</label><div class="faq-prompt"><svg class="faq-prompt__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></svg><input id="faq-search" type="search" placeholder="Busca tu pregunta…" autocomplete="off" aria-controls="faq-results"><button class="faq-prompt__clear" type="button" aria-label="Borrar búsqueda" hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg></button></div><fieldset class="faq-filters" hidden><legend>Filtrar por categoría</legend><div class="faq-filter-options">${d.categories.map((c, i) => `<button type="button" data-category="${c.id}" aria-pressed="${i === 0}"><span class="filter-fill" aria-hidden="true"></span><span class="filter-radio" aria-hidden="true"><span class="filter-dot"></span></span><span>${esc(c.label)}</span></button>`).join("")}</div></fieldset><p id="faq-status" role="status" aria-live="polite"></p></div><div class="faq-list" id="faq-results">${d.faq.map((f, i) => `<details data-category="${f.category}" data-keywords="${esc(f.keywords)}"><summary>${esc(f.question)}</summary><div class="faq-answer">${f.answer}</div></details>`).join("")}</div></section></main><footer class="site-footer">La Sal · caminodevida · Lima, Perú · 2027<button type="button" id="privacy-settings" hidden>Preferencias de analítica</button></footer><aside class="floating-actions" aria-label="Entradas y contacto"><a class="whatsapp" href="https://wa.me/51993520544?text=Hola%2C%20quisiera%20informaci%C3%B3n%20de%20La%20Sal" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.5 4.2 1.6 6L0 24l6.2-1.6A12 12 0 0 0 12 24c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5ZM12 22a10 10 0 0 1-5.1-1.4l-.4-.2-3.7 1 1-3.6-.3-.4A10 10 0 1 1 12 22Zm5.5-7.5c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6L8.8 6.8c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 2.9 1.3 3.1c.1.2 2.2 3.3 5.3 4.7.8.3 1.4.5 1.8.6.8.3 1.5.2 2.1.1.6-.1 1.8-.8 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.5Z"/></svg><span>Escríbenos <span class="lasal-sr-only">por WhatsApp</span></span><span aria-hidden="true">↗</span></a><div class="ticket-bar"><p>Preventa <span>${esc(d.price)}</span></p><a class="button button-light" href="${esc(d.ticketUrl)}">Comprar entradas</a></div></aside><aside class="consent" aria-label="Preferencias de analítica" hidden><p>Podemos usar Google Analytics para entender cómo se utiliza la web. Tú eliges si permites estas mediciones.</p><button type="button" data-consent="yes">Aceptar analítica</button><button type="button" data-consent="no">Continuar sin analítica</button></aside><script type="module" src="/src/main.js"></script></body></html>`;
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
  '<a class="lasal-nav-link" href="#programa">Programa</a><a class="lasal-nav-link" href="#la-sal-live">La Sal Live</a><a class="lasal-nav-link" href="#preguntas">Preguntas frecuentes</a>',
);
$(".lasal-nav-link").each((i, el) => {
  const link = $(el);
  const label = link.find("span").length ? link.find("span").eq(1).text() : link.text();
  link.html(`<span class="lasal-nav-number" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><span>${esc(label)}</span><span class="lasal-nav-arrow" aria-hidden="true">↗</span>`);
});
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
