import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-700.css";
import "./styles.css";
import "./expressive.css";
import "./design-system.css";
const colors = [
  ["Papel", "--paper", "#f6f2e9"],
  ["Texto", "--ink", "#242424"],
  ["Superficie oscura", "--dark", "#343434"],
  ["Acento rosa", "--pink", "#ff91a4"],
  ["Azul profundo", "--blue", "#303f7c"],
  ["Acción", "--action", "#c80c17"],
];
for (const [name, token, value] of colors) {
  const b = document.createElement("button");
  b.className = "swatch";
  b.innerHTML = `<span class="color-sample" style="background:${value}" aria-hidden="true"></span><strong>${name}</strong><span>${token}</span><span>${value}</span>`;
  b.setAttribute("aria-label", `Copiar ${name}: ${value}`);
  b.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(value);
      document.querySelector("#copy-status").textContent = `Copiado: ${value}`;
    } catch {
      document.querySelector("#copy-status").textContent =
        `Selecciona y copia este valor: ${value}`;
    }
  });
  document.querySelector("#swatches").append(b);
}
document
  .querySelector("#demo-button")
  .addEventListener(
    "click",
    () =>
      (document.querySelector("#demo-status").textContent =
        "Acción de ejemplo completada."),
  );
let timer;
document.querySelector("#replay").addEventListener("click", () => {
  clearTimeout(timer);
  const el = document.querySelector("#demo-media"),
    img = document.querySelector("#demo-image"),
    status = document.querySelector("#load-status");
  el.classList.toggle(
    "reduce-demo",
    document.querySelector("#reduce-demo").checked,
  );
  el.classList.remove("loaded");
  img.style.visibility = "hidden";
  status.textContent = "Demostración de carga…";
  timer = setTimeout(() => {
    el.classList.add("loaded");
    img.style.visibility = "";
    status.textContent = "Imagen disponible.";
  }, 1500);
});
