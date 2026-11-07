import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-700.css";
import "./legacy-components.css";
import "./live.css";
import "./styles.css";
import { animate, inView } from "motion";
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    ".section > h2",
    (e) => {
      animate(
        e,
        { opacity: [0.7, 1], transform: ["translateY(12px)", "translateY(0)"] },
        { duration: 0.45 },
      );
    },
    { amount: 0.3 },
  );
} else document.querySelector(".arrival")?.remove();
for (const img of document.querySelectorAll(".media-shell img")) {
  const done = () => img.parentElement.classList.add("loaded");
  img.addEventListener("load", done, { once: true });
  img.addEventListener(
    "error",
    () => {
      done();
      img.parentElement.classList.add("failed");
    },
    { once: true },
  );
  if (img.complete) {
    done();
    if (!img.naturalWidth) img.parentElement.classList.add("failed");
  }
}
const dialog = document.querySelector(".lasal-nav-dialog"),
  toggle = document.querySelector(".lasal-nav-toggle");
let destinationFocus = null;
const closeMenu = () => dialog.close();
toggle.addEventListener("click", () => {
  dialog.showModal();
  dialog.classList.add("is-visible");
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
  } else toggle.focus();
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
  }),
);
search.addEventListener("input", () => filter());
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
