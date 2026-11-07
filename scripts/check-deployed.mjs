import { load } from "cheerio";

const site = new URL(process.argv[2]);
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function read(url, type) {
  const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  const mime = response.headers.get("content-type") || "";
  if (!type.test(mime)) throw new Error(`Unexpected content type ${mime}: ${url}`);
  return response.text();
}
async function check() {
  const pageUrl = new URL(site);
  pageUrl.searchParams.set("deployment-check", Date.now());
  const html = await read(pageUrl, /text\/html/);
  const $ = load(html);
  const styles = $('link[rel="stylesheet"]').map((i, el) => $(el).attr("href")).get();
  const scripts = $('script[type="module"][src]').map((i, el) => $(el).attr("src")).get();
  const images = $('img[src]').map((i, el) => $(el).attr("src")).get();
  if (!styles.length || !scripts.length || !images.length) throw new Error("Missing compiled resources in published HTML");
  const resources = [...styles, ...scripts, ...images];
  if (resources.some((src) => /(^|\/)src\//.test(src))) throw new Error("Source HTML published instead of Vite dist/");
  const css = await Promise.all(styles.map(async (src) => {
    const url = new URL(src, site);
    return { url, text: await read(url, /text\/css/) };
  }));
  await Promise.all([
    ...scripts.map((src) => read(new URL(src, site), /javascript/)),
    ...images.map((src) => read(new URL(src, site), /image\//)),
    ...css.flatMap(({url, text}) => [...text.matchAll(/url\(["']?([^\s)'" ]+)["']?\)/g)]
      .map((match) => match[1]).filter((src) => !src.startsWith("data:"))
      .map((src) => read(new URL(src, url), /image\/|font\/|application\/.*(font|woff|octet-stream)/)))
  ]);
  console.log(`Published build verified: ${site} (CSS, JS, images and CSS resources)`);
}
let failure;
for (let attempt = 0; attempt < 4; attempt++) {
  try { await check(); failure = null; break; }
  catch (error) { failure = error; console.error(error.message); if (attempt < 3) await pause(3000); }
}
if (failure) throw failure;
