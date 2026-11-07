import { animate, stagger, scroll } from "motion";
import bannerUrl from "./assets/banner.webp";

const jellyAnimations = new Map();
export function jellyFilter(selected, filters, reduced) {
  for (const button of filters) {
    jellyAnimations.get(button)?.forEach((animation) => animation.cancel());
    jellyAnimations.delete(button);
  }
  if (reduced) return;
  jellyAnimations.set(selected, [
    animate(selected.querySelector(".filter-fill"), {
      scaleX: [.94, 1.05, .99, 1], scaleY: [1.04, .94, 1.02, 1],
    }, { duration: .48, ease: "easeOut" }),
    animate(selected.querySelector(".filter-dot"), { scale: [.2, 1] }, {
      type: "spring", stiffness: 500, damping: 18,
    }),
  ]);
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
  const ink = [...document.querySelectorAll(".scroll-line__ink")];
  function setupScroll() {
    scrollStops.forEach((stop) => stop());
    scrollStops = [];
    ink.forEach((line) => line.style.removeProperty("clip-path"));
    if (preference.matches) return;
    for (const line of ink) {
      const animation = animate(line, { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] }, { duration: 1, ease: "linear" });
      const detach = scroll(animation, { target: line.parentElement, offset: ["start 90%", "end 45%"] });
      scrollStops.push(() => { detach(); animation.cancel(); });
    }
  }
  if (!preference.matches) {
    // Stagger without a blocking loader: content remains usable if JS is interrupted.
    const group = document.querySelectorAll(".is-hero__title > span, .date-route__labels li, .is-hero__year, .is-hero__footer, .event-intro p");
    entrance.push(animate(group, { opacity: [.15, 1], y: [24, 0], filter: ["blur(6px)", "blur(0px)"] }, { duration: .65, delay: stagger(.075), ease: [.22, 1, .36, 1] }));
    entrance.push(animate(".date-route__line", { strokeDasharray: ["0 1", "1 1"] }, { duration: 1.2, delay: .25, ease: "easeInOut" }));
  }
  setupScroll();
  preference.addEventListener("change", () => {
    if (preference.matches) {
      entrance.forEach((animation) => animation.cancel());
      jellyAnimations.forEach((animations) => animations.forEach((animation) => animation.cancel()));
      jellyAnimations.clear();
    }
    setupScroll();
  });
}
