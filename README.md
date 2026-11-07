# La Sal 2027

Independent Spanish-language conference homepage using HTML, CSS, JavaScript, Vite, and Motion. No React or WordPress runtime is required. The current WordPress site remains active; this work has not been deployed.

## Run locally

Use Node.js supported by Vite 7 (20.19+ or 22.12+) and npm.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`npm run build` regenerates `index.html` and `src/live.css` from the content sources, then writes the static output to `dist/`. Edit `content/site.json`, `content/*.html`, or the page generator rather than relying on manual changes to generated files. Run a build after content changes before inspecting them in development.

Run `npm test` after building. The browser regression suite checks keyboard navigation, FAQ filtering, no-JavaScript content and purchase links, responsive layout, reduced motion, and automated accessibility. Playwright tests require their browser installation (`npx playwright install chromium`, or the configured environment browser). The historical audit in `docs/audit/` describes the original WordPress site, not a passing test report for this implementation.

## Sources

- `content/site.json`: title, description, program summary, schedule, ticket URL/price, areas, FAQ categories and answers.
- `content/*.html`: navigation, hero, activities, and La Sal Live source fragments.
- `scripts/build-page.mjs`: static HTML generation and fragment integration.
- `src/main.js`: navigation, FAQ filters/search, Motion, image state, floating controls, analytics consent.
- `src/legacy-components.css`, `src/styles.css`: retained visual components and independent-site overrides. `src/live.css` is generated from the Live fragment.
- `src/assets/`: local logo, banner, paper texture, and program photograph.
- `blocks/`: original supplied blocks; `docs/audit/`: original audit evidence.
- `PRODUCT.md`, `PRD.md`, `CHANGELOG.md`: product scope, acceptance requirements, and dated implementation progress.
- `DESIGN.md`, `.impeccable/design.json`: visual tokens and design extensions/component previews.
- `design-system.html`: interactive visual reference for local review; `DESIGN.md` remains the normative design document.

Source assets and public-site references were collected from https://conferencialasal.com/ into `/workspace/lasal-review`. The local WebP assets preserve the supplied site's imagery; this directory is an origin record, not a deployment dependency. The repository does not establish a new license for those assets.

## Content boundary

La Sal Live sits before FAQ. The homepage program is a summary: full Programa, Galería, and Notas still link to WordPress and are not migrated pages. Ticket purchases go to Eventbrite and contact goes to WhatsApp.

A future CMS can adapt its output to `content/site.json` and `content/*.html`; no CMS is connected now. FAQ answers contain rich HTML and are inserted as trusted repository content. Sanitize untrusted CMS HTML with an allowlist and validate URLs before adopting that source.

## Production configuration and deployment

Copy `.env.example` to `.env.local` when local overrides are needed. Vite embeds `VITE_*` values in client output: do not put secrets there.

- `VITE_SITE_URL`: set only for a production build, to the final public site URL. This enables canonical and Open Graph URLs, Event JSON-LD, an indexable robots meta tag, `robots.txt`, and the homepage sitemap. Leave unset for staging: the page stays `noindex,follow`, robots disallows crawling, and no sitemap is emitted. Rebuild when this value changes.
- `VITE_GA_ID`: optional GA4 measurement ID (`G-…`). Analytics loads only after affirmative consent, including a previously saved acceptance. Without an ID, analytics is not loaded. The footer provides consent preferences when configured. A real analytics property and its reporting must be verified separately.

Deploy the contents of `dist/` to a static hosting provider after choosing the production URL. No application server or WordPress plugin is required. Build with `npm ci` followed by `npm run build`; publish directory: `dist`.

`public/_headers` is copied to the output for static hosts that support this format, including Netlify and Cloudflare Pages. It requests revalidation for the homepage/HTML and a one-year immutable cache for fingerprinted `/assets/*`, with `nosniff` and a strict-origin referrer policy. Other hosts need equivalent CDN/server configuration; copying `_headers` alone will not configure them. Verify actual response headers after deployment. Keep HTML revalidatable so it picks up new hashed asset URLs.

Before switching traffic, check production URLs and metadata, external WordPress links, analytics consent, caching, image loading, mobile layouts, keyboard navigation, reduced motion, and the ticket/contact destinations. No domain or production hosting target has been selected here.

## Local validation

For the managed cloud browser: `PLAYWRIGHT_EXECUTABLE_PATH=/usr/bin/chromium npm test`. CI installs its own Chromium. The automated checks are not a WCAG certification or an end-to-end Eventbrite checkout test.

## Shareable design artifact

`docs/artifacts/design-system.html` embeds styles, fonts, images and the demo scripts in one file. Open it in a browser to review the visual system without installing dependencies. Rebuild it with `npm run build` followed by `node scripts/export-design-artifact.mjs`. Clipboard access may be restricted on local files; the value is also shown as text.
