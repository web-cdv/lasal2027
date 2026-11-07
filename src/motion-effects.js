import { animate, stagger, scroll } from "motion";
import bannerUrl from "./assets/banner.webp";

let pillAnimation;
export function moveFaqPill(selected, filters, reduced) {
  const options = selected.parentElement;
  let indicator = options.querySelector(".faq-pill-glide");
  if (!indicator) {
    indicator = document.createElement("span");
    indicator.className = "faq-pill-glide";
    indicator.setAttribute("aria-hidden", "true");
    options.append(indicator);
  }
  if (!selected.offsetWidth) return;
  filters.forEach(button => button.classList.toggle("pill-highlighted", button === selected));
  const target = { left: selected.offsetLeft, top: selected.offsetTop, width: selected.offsetWidth, height: selected.offsetHeight };
  pillAnimation?.stop();
  if (reduced || !indicator.dataset.positioned) {
    for (const [key, value] of Object.entries(target)) indicator.style[key] = `${value}px`;
  } else {
    pillAnimation = animate(indicator, target, { type: "spring", bounce: .16, duration: .4 });
  }
  indicator.dataset.positioned = "true";
}

function imageState(image, shell, preference) {
  let timeout;
  let settled = false;
  let wipe;
  let observer;
  const retry = document.createElement("button");
  retry.type = "button";
  retry.className = "media-retry";
  retry.textContent = "Reintentar imagen";
  retry.hidden = true;
  shell.append(retry);
  const state = document.createElement("span");
  state.className = "lasal-sr-only";
  state.setAttribute("role", "status");
  shell.append(state);
  function finish(ok) {
    if (settled) return;
    settled = true;
    clearTimeout(timeout);
    observer?.disconnect();
    if (ok && document.activeElement === retry) {
      shell.tabIndex = -1;
      shell.focus({ preventScroll: true });
      shell.addEventListener("blur", () => shell.removeAttribute("tabindex"), { once: true });
    }
    shell.setAttribute("aria-busy", "false");
    shell.classList.add("loaded");
    shell.classList.toggle("failed", !ok);
    retry.hidden = ok;
    state.textContent = ok ? "" : "No se pudo cargar la imagen.";
    if (ok && !preference.matches) {
      wipe = animate(image, { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] }, { duration: .6, ease: [.22, 1, .36, 1] });
    }
  }
  function start() {
    wipe?.cancel();
    settled = false;
    retry.hidden = true;
    state.textContent = "";
    shell.classList.remove("loaded", "failed");
    shell.setAttribute("aria-busy", "true");
    // Lazy images receive a timeout only when requested, not while still below the fold.
    clearTimeout(timeout);
    timeout = setTimeout(() => finish(false), 12000);
    if (image.complete && image.naturalWidth) finish(true);
  }
  image.addEventListener("load", () => { settled = false; finish(true); });
  image.addEventListener("error", () => finish(false));
  retry.addEventListener("click", () => {
    start();
    const url = new URL(image.src);
    url.searchParams.set("retry", Date.now());
    image.src = url.href;
  });
  observer = new IntersectionObserver(([entry]) => {
    if (!settled && entry.isIntersecting) { start(); observer.disconnect(); }
  }, { rootMargin: "300px" });
  if (image.complete) {
    finish(image.naturalWidth > 0);
  } else observer.observe(image);
  preference.addEventListener("change", () => { if (preference.matches) wipe?.cancel(); });
}

export function initMotionEffects(preference) {
  const hero = document.querySelector(".hero-surface");
  const background = new Image();
  const fallback = document.createElement("div");
  fallback.className = "hero-media-feedback";
  fallback.setAttribute("role", "status");
  fallback.innerHTML = '<span>Cargando imagen de portada…</span><button type="button" hidden>Reintentar fondo</button>';
  hero.append(fallback);
  let timeout;
  let settled = false;
  function finishBackground(ok) {
    if (settled) return;
    settled = true;
    clearTimeout(timeout);
    hero.dataset.mediaState = ok ? "ready" : "error";
    if (ok && fallback.contains(document.activeElement)) {
      hero.tabIndex = -1;
      hero.focus({ preventScroll: true });
      hero.addEventListener("blur", () => hero.removeAttribute("tabindex"), { once: true });
    }
    fallback.hidden = ok;
    fallback.querySelector("span").textContent = ok ? "" : "La imagen de portada no está disponible.";
    fallback.querySelector("button").hidden = ok;
    if (ok) hero.style.backgroundImage = `url("${background.src}")`;
  }
  function requestBackground() {
    settled = false;
    clearTimeout(timeout);
    hero.dataset.mediaState = "loading";
    fallback.hidden = false;
    fallback.querySelector("span").textContent = "Cargando imagen de portada…";
    fallback.querySelector("button").hidden = true;
    timeout = setTimeout(() => finishBackground(false), 12000);
    background.src = new URL(bannerUrl, location.href).href;
    if (background.complete && background.naturalWidth) finishBackground(true);
  }
  background.addEventListener("load", () => { settled = false; finishBackground(true); });
  background.addEventListener("error", () => finishBackground(false));
  fallback.querySelector("button").addEventListener("click", () => {
    requestBackground();
    const url = new URL(bannerUrl, location.href);
    url.searchParams.set("retry", Date.now());
    background.src = url.href;
  });
  requestBackground();
  for (const image of document.querySelectorAll(".media-shell img")) imageState(image, image.parentElement, preference);

  let entrance = [];
  let scrollStops = [];
  const words = [...document.querySelectorAll("#statement-title .reveal-word")];
  function setupScroll() {
    scrollStops.forEach((stop) => stop());
    scrollStops = [];
    words.forEach(word => { word.style.removeProperty("opacity"); word.style.removeProperty("filter"); });

    if (preference.matches) return;
    const animation = animate(words, { opacity: [.15, 1], filter: ["blur(4px)", "blur(0px)"] }, { duration: .8, delay: stagger(.2), ease: "linear" });
    const detach = scroll(animation, { target: document.querySelector("#statement-title"), offset: ["start 85%", "end 40%"] });
    scrollStops.push(() => { detach(); animation.cancel(); });
  }
  if (!preference.matches) {
    // Stagger without a blocking loader: content remains usable if JS is interrupted.
    const group = document.querySelectorAll(".is-hero__title > span, .date-route__labels li, .is-hero__year, .is-hero__footer, .event-intro p");
    entrance.push(animate(group, { opacity: [.15, 1], y: [24, 0], filter: ["blur(6px)", "blur(0px)"] }, { duration: .65, delay: stagger(.075), ease: [.22, 1, .36, 1] }));
    entrance.push(animate(".date-route__line", { strokeDasharray: ["0 1", "1 1"] }, { duration: 1.2, delay: .25, ease: "easeInOut" }));
  }
  const faqFilters = [...document.querySelectorAll(".faq-filters button")];
  const options = document.querySelector(".faq-filter-options");
  const selectedFilter = () => faqFilters.find(button => button.getAttribute("aria-pressed") === "true");
  for (const button of faqFilters) {
    button.addEventListener("pointerenter", () => moveFaqPill(button, faqFilters, preference.matches));
    button.addEventListener("focus", () => moveFaqPill(button, faqFilters, preference.matches));
  }
  options.addEventListener("pointerleave", () => moveFaqPill(selectedFilter(), faqFilters, preference.matches));
  options.addEventListener("focusout", () => moveFaqPill(selectedFilter(), faqFilters, preference.matches));
  new ResizeObserver(() => moveFaqPill(selectedFilter(), faqFilters, true)).observe(options);
  setupScroll();
  preference.addEventListener("change", () => {
    if (preference.matches) {
      entrance.forEach((animation) => animation.cancel());
      pillAnimation?.complete();
    }
    setupScroll();
  });
}

// Autonomous ribbon, with no separate pause button. Focus/hover/tap can stop it.
const ribbon = document.querySelector(".event-ribbon");
let ribbonPaused = false;
ribbon.tabIndex = 0;
ribbon.setAttribute("aria-description", "El movimiento se detiene al enfocar o pasar el cursor. Pulsa Espacio o toca para detenerlo o reanudarlo.");
function toggleRibbon() { ribbonPaused = !ribbonPaused; ribbon.classList.toggle("ribbon-stopped", ribbonPaused); }
ribbon.addEventListener("click", toggleRibbon);
ribbon.addEventListener("keydown", e => { if (e.code === "Space" || e.code === "Enter") { e.preventDefault(); toggleRibbon(); } });
new IntersectionObserver(([entry]) => ribbon.classList.toggle("ribbon-offscreen", !entry.isIntersecting)).observe(ribbon);
document.addEventListener("visibilitychange", () => ribbon.classList.toggle("ribbon-hidden", document.hidden));
