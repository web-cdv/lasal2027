import fs from "node:fs";
import path from "node:path";
import { load } from "cheerio";
const root = path.resolve("dist");
const $ = load(fs.readFileSync(path.join(root, "design-system.html"), "utf8"));
const mime = {
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".webp": "image/webp",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};
const data = (file) =>
  `data:${mime[path.extname(file)] || "application/octet-stream"};base64,${fs.readFileSync(file).toString("base64")}`;
$('link[rel="stylesheet"]').each((i, e) => {
  const file = path.resolve(root, $(e).attr("href"));
  let css = fs
    .readFileSync(file, "utf8")
    .replace(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]*))\s*\)/g, (all, double, single, bare) => {
      const url = double ?? single ?? bare;
      return url.startsWith("data:") || url.startsWith("#")
        ? all
        : `url("${data(path.resolve(path.dirname(file), url))}")`;
    });
  $(e).replaceWith(`<style>${css}</style>`);
});
$('link[rel="modulepreload"]').remove();
$("img").each((i, e) =>
  $(e).attr("src", data(path.resolve(root, $(e).attr("src")))),
);
$("script[src]").each((i, e) => {
  let js = fs
    .readFileSync(path.resolve(root, $(e).attr("src")), "utf8")
    .replace(/import["'][^"']+["'];?/g, "");
  $(e).replaceWith(`<script type="module">${js}</script>`);
});
$('a[href^="./"]').attr("href", "https://github.com/web-cdv/lasal2027");
$("a.button").text("Ver proyecto en GitHub");
fs.mkdirSync("docs/artifacts", { recursive: true });
fs.writeFileSync("docs/artifacts/design-system.html", $.html());
