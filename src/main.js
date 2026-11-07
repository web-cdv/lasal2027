import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-700.css";
import "./legacy-components.css";
import "./live.css";
import "./styles.css";
import "./expressive.css";
import "./motion-effects.css";
import "./layout-refinement.css";
import { initMotionEffects, moveFaqPill } from "./motion-effects.js";
import { animate, inView, stagger } from "motion";
const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
const reduced = motionPreference.matches;
// Content is present from first paint; entrance is decorative and never blocks input.
if (!reduced) {
  animate(
    ".arrival-line",
    { scaleX: [0, 1], opacity: [1, 0] },
    { duration: 1 },
  );
  animate(
    ".arrival",
    { opacity: [1, 0] },
    { duration: 0.3, delay: 1 },
  ).finished.then(() => document.querySelector(".arrival")?.remove());
  inView(
    ".section > h2, .ls-live__intro > header, .ls-row, .ar-card, .ls-live__day",
    (e) => {
      if (motionPreference.matches) return;
      animate(
        e,
        { opacity: [0.85, 1], transform: ["translateY(16px)", "translateY(0)"] },
        { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      );
    },
    { amount: 0.3 },
  );
} else document.querySelector(".arrival")?.remove();
initMotionEffects(motionPreference);
const dialog = document.querySelector(".lasal-nav-dialog"),
  toggle = document.querySelector(".lasal-nav-toggle");
let destinationFocus = null;
let menuAnimations = [], menuClosing = false;
const menuPanel = dialog.querySelector(".lasal-nav-panel");
const menuLayers = [...dialog.querySelectorAll(".menu-prelayers > div")];
function cancelMenuAnimations() { menuAnimations.forEach(a => a.cancel()); menuAnimations = []; }
const closeMenu = () => {
  if (!dialog.open || menuClosing) return;
  menuClosing = true;
  cancelMenuAnimations();
  if (motionPreference.matches) { dialog.close(); return; }
  const exit = animate([menuPanel, ...menuLayers.slice().reverse()], { x: ["0%", "100%"] }, { duration: .25, delay: stagger(.035), ease: [.4, 0, 1, 1] });
  menuAnimations.push(exit);
  exit.finished.then(() => { if (dialog.open) dialog.close(); });
};
dialog.addEventListener("cancel", e => { e.preventDefault(); closeMenu(); });
toggle.addEventListener("click", () => {
  dialog.showModal();
  dialog.classList.add("is-visible");
  menuClosing = false;
  cancelMenuAnimations();
  if (!motionPreference.matches) {
    menuAnimations.push(animate([...menuLayers, menuPanel], { x: ["100%", "0%"] }, { duration: .55, delay: stagger(.07), ease: [.22, 1, .36, 1] }));
    menuAnimations.push(animate(dialog.querySelectorAll(".lasal-nav-link > span:nth-child(2)"), { y: [55, 0], rotate: [7, 0], opacity: [.1, 1] }, { duration: .6, delay: stagger(.065, { startDelay: .18 }), ease: [.22, 1, .36, 1] }));
    menuAnimations.push(animate(dialog.querySelectorAll(".menu-socials a"), { y: [15, 0], opacity: [0, 1] }, { duration: .35, delay: stagger(.06, { startDelay: .4 }) }));
  }
  toggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
});
dialog.querySelector(".lasal-nav-close").addEventListener("click", closeMenu);
dialog.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    const href = a.getAttribute("href");
    destinationFocus = href?.startsWith("#")
      ? document.getElementById(href.slice(1))
      : null;
    closeMenu();
  }),
);
dialog.addEventListener("close", () => {
  cancelMenuAnimations();
  menuClosing = false;
  document.body.classList.remove("menu-open");
  toggle.setAttribute("aria-expanded", "false");
  dialog.classList.remove("is-visible");
  if (destinationFocus) {
    destinationFocus.setAttribute("tabindex", "-1");
    destinationFocus.focus({ preventScroll: true });
    destinationFocus.addEventListener(
      "blur",
      (e) => e.target.removeAttribute("tabindex"),
      { once: true },
    );
    destinationFocus = null;
  } else if (document.activeElement === document.body || dialog.contains(document.activeElement)) toggle.focus();
});
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) closeMenu();
});
const search = document.querySelector("#faq-search"),
  filters = [...document.querySelectorAll("[data-category][aria-pressed]")],
  items = [...document.querySelectorAll(".faq-list details")],
  status = document.querySelector("#faq-status");
let category = "general";
const norm = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
function filter(announce = true) {
  document.querySelector(".faq-prompt__clear").hidden = !search.value;
  const term = norm(search.value);
  let count = 0;
  for (const el of items) {
    const match = term
      ? norm(el.textContent + " " + el.dataset.keywords).includes(term)
      : el.dataset.category === category;
    el.hidden = !match;
    if (match) count++;
  }
  status.textContent = announce
    ? count
      ? `${count} preguntas encontradas.`
      : "No encontramos resultados. Prueba otra palabra o escríbenos por WhatsApp."
    : "";
}
document.querySelector(".faq-tools").hidden = false;
document.querySelector(".faq-filters").hidden = false;
filters.forEach((b) =>
  b.addEventListener("click", () => {
    category = b.dataset.category;
    search.value = "";
    filters.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    filter();
    moveFaqPill(b, filters, motionPreference.matches);
  }),
);
search.addEventListener("input", () => filter());
document.querySelector('.faq-prompt__clear').addEventListener('click',()=>{search.value='';filter();search.focus();});
filter(false);
const actions = document.querySelector(".floating-actions");
new ResizeObserver(() => {
  document.documentElement.style.setProperty(
    "--floating-height",
    `${actions.getBoundingClientRect().height + 40}px`,
  );
}).observe(actions);
const ga = import.meta.env.VITE_GA_ID,
  consent = document.querySelector(".consent"),
  settings = document.querySelector("#privacy-settings");
let started = false;
const read = () => {
  try {
    return localStorage.getItem("lasal-analytics");
  } catch {
    return null;
  }
};
function enableAnalytics() {
  if (started || !/^G-[A-Z0-9]+$/.test(ga || "")) return;
  started = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", ga);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga)}`;
  document.head.append(s);
}
if (ga) {
  settings.hidden = false;
  if (read() === "yes") enableAnalytics();
  else if (!read()) consent.hidden = false;
  settings.addEventListener("click", () => (consent.hidden = false));
  document.querySelectorAll("[data-consent]").forEach((b) =>
    b.addEventListener("click", () => {
      try {
        localStorage.setItem("lasal-analytics", b.dataset.consent);
      } catch {}
      consent.hidden = true;
      if (b.dataset.consent === "yes") {
        window[`ga-disable-${ga}`] = false;
        enableAnalytics();
      } else {
        window[`ga-disable-${ga}`] = true;
      }
    }),
  );
}

// Decorative enhancement; the original artwork remains underneath.
import("./grainient.js").then(({ initGrainient }) => initGrainient(document.querySelector(".hero-surface"))).catch(() => {});

import('./area-spotlights.js').then(({initAreaSpotlights})=>initAreaSpotlights(motionPreference));

import('./faq-waves.js').then(({initFaqWaves})=>initFaqWaves(document.querySelector('#preguntas'))).catch(()=>{});
