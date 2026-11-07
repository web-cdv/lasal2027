import { defineConfig, loadEnv } from "vite";
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  let site = "";
  if (env.VITE_SITE_URL) {
    const url = new URL(env.VITE_SITE_URL);
    if (!["https:", "http:"].includes(url.protocol))
      throw Error("VITE_SITE_URL must be an HTTP(S) URL");
    site = url.href.replace(/\/$/, "");
  }
  return {
    base: "./",
    build: {
      rollupOptions: {
        input: { main: "index.html", design: "design-system.html" },
      },
    },
    plugins: [
      {
        name: "site-seo",
        transformIndexHtml(html, ctx) {
          if (!site || ctx.filename.endsWith("design-system.html")) return html;
          const ld = {
            "@context": "https://schema.org",
            "@type": "Event",
            name: "La Sal 2027 — Imagen & Semejanza",
            image: site + "/social-cover.webp",
            organizer: { "@type": "Organization", name: "caminodevida", url: "https://cdv.pe" },
            startDate: "2027-05-26",
            endDate: "2027-05-28",
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            url: site + "/",
            location: {
              "@type": "Place",
              name: "caminodevida — Campus Surco",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Buen Retiro 100",
                addressLocality: "Surco, Lima",
                addressCountry: "PE",
              },
            },
          };
          return {
            html: html.replace(
              'content="noindex,follow"',
              'content="index,follow"',
            ),
            tags: [
              { tag: "meta", attrs: { property: "og:image", content: site + "/social-cover.webp" } },
              { tag: "meta", attrs: { name: "twitter:image", content: site + "/social-cover.webp" } },
              { tag: "link", attrs: { rel: "canonical", href: site + "/" } },
              {
                tag: "meta",
                attrs: { property: "og:url", content: site + "/" },
              },
              {
                tag: "script",
                attrs: { type: "application/ld+json" },
                children: JSON.stringify(ld).replace(/</g, "\\u003c"),
              },
            ],
          };
        },
        generateBundle() {
          this.emitFile({
            type: "asset",
            fileName: "robots.txt",
            source: site
              ? `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`
              : "User-agent: *\nDisallow: /\n",
          });
          if (site)
            this.emitFile({
              type: "asset",
              fileName: "sitemap.xml",
              source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site.replace(/&/g, "&amp;")}/</loc></url></urlset>`,
            });
        },
      },
    ],
  };
});
