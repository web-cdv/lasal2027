import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("responsive content, images and Live placement", async ({ page }) => {
  await page.goto("/");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.locator("h1")).toHaveCount(1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
  expect(
    await page.evaluate(() =>
      Boolean(
        document
          .querySelector("#la-sal-live")
          .compareDocumentPosition(document.querySelector("#preguntas")) &
        Node.DOCUMENT_POSITION_FOLLOWING,
      ),
    ),
  ).toBeTruthy();
  await page.locator(".program img").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator(".program img")
        .evaluate((i) => i.complete && i.naturalWidth > 0),
    )
    .toBeTruthy();
});
test("keyboard menu, FAQ search, no-match recovery", async ({ page }) => {
  await page.goto("/");
  await page.locator(".lasal-nav-toggle").click();
  await expect(page.locator("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".lasal-nav-toggle")).toBeFocused();
  await page.locator("#faq-search").fill("bebés");
  await expect(page.locator(".faq-list details:visible")).toHaveCount(2);
  const q = page.locator(".faq-list summary:visible").first();
  await q.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".faq-list details[open]")).toHaveCount(1);
  await page.locator("#faq-search").fill("zzzzzz");
  await expect(page.locator("#faq-status")).toContainText("No encontramos");
  await page.getByRole("button", { name: "Registro", exact: true }).click();
  await expect(page.locator(".faq-list details:visible")).toHaveCount(4);
});
test("content and purchase work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173");
  await expect(page.locator(".faq-list details")).toHaveCount(15);
  await expect(
    page.getByRole("link", { name: "Comprar entradas" }),
  ).toHaveAttribute("href", /eventbrite/);
  await expect(page.locator("#la-sal-live")).toBeVisible();
  await context.close();
});
test("reduced motion and accessibility scan", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".arrival")).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
});
test("design system artifact interactions and accessibility", async ({
  page,
}) => {
  await page.goto("/design-system.html");
  await expect(
    page.getByRole("heading", { name: "Sistema de diseño", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Probar acción", exact: true })
    .click();
  await expect(page.locator("#demo-status")).toContainText("completada");
  await page
    .getByRole("button", { name: "Reproducir carga de ejemplo" })
    .click();
  await expect(page.locator("#load-status")).toContainText("Demostración");
  await expect(page.locator("#load-status")).toContainText("Imagen disponible");
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
      .violations,
  ).toEqual([]);
});
test("image skeleton resolves to an error fallback", async ({ page }) => {
  await page.route("**/assets/programa-*.webp", async (route) => {
    await new Promise((r) => setTimeout(r, 800));
    await route.abort();
  });
  await page.goto("/");
  await page.locator(".program img").scrollIntoViewIfNeeded();
  await expect(page.locator(".program .media-shell")).toHaveClass(/failed/);
});
test("staging SEO protects the independent draft", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex,follow",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  const r = await page.request.get("/robots.txt");
  expect(await r.text()).toContain("Disallow: /");
});
test("internal menu links move keyboard focus to destination", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".lasal-nav-toggle").click();
  await page
    .locator("dialog")
    .getByRole("link", { name: "La Sal Live", exact: true })
    .click();
  await expect(page.locator("#la-sal-live")).toBeFocused();
});

test("all menu destinations remain keyboard-reachable in landscape", async ({ page }) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/");
  await page.locator(".lasal-nav-toggle").click();
  await page.locator(".lasal-nav-close").focus();
  const links = page.locator(".lasal-nav-links a");
  for (let i = 0; i < await links.count(); i++) {
    await page.keyboard.press("Tab");
    await expect(links.nth(i)).toBeFocused();
    const box = await links.nth(i).boundingBox();
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.y + box.height).toBeLessThanOrEqual(390);
  }
  await page.keyboard.press("Escape");
  await expect(page.locator(".lasal-nav-toggle")).toBeFocused();
});

test("ribbon advances autonomously, pauses on interaction and respects reduced motion", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".ribbon-toggle")).toHaveCount(0);
  const ribbon = page.locator(".event-ribbon");
  const track = page.locator(".ribbon-track");
  await ribbon.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(track).toHaveCSS("animation-play-state", "running");
  const initial = await track.evaluate(e => getComputedStyle(e).transform);
  await expect.poll(() => track.evaluate(e => getComputedStyle(e).transform)).not.toBe(initial);
  await ribbon.focus();
  await expect(track).toHaveCSS("animation-play-state", "paused");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(track).toHaveCSS("animation-name", "none");
});

test("hero background failure keeps text available and can retry", async ({ page }) => {
  let blocked = true;
  await page.route("**/assets/banner-*.webp*", route => blocked ? route.abort() : route.continue());
  await page.goto("/");
  await expect(page.locator(".hero-surface")).toHaveAttribute("data-media-state", "error");
  await expect(page.locator("h1")).toContainText("Imagen");
  await expect(page.locator(".event-intro p")).toBeVisible();
  blocked = false;
  await page.getByRole("button", { name: "Reintentar fondo" }).click();
  await expect(page.locator(".hero-surface")).toHaveAttribute("data-media-state", "ready");
});

test("failed image skeleton can recover without reloading the page", async ({ page }) => {
  let blocked = true;
  await page.route("**/assets/programa-*.webp*", route => blocked ? route.abort() : route.continue());
  await page.goto("/");
  await page.locator(".program img").scrollIntoViewIfNeeded();
  await expect(page.locator(".media-shell")).toHaveClass(/failed/);
  blocked = false;
  await page.getByRole("button", { name: "Reintentar imagen" }).click();
  await expect(page.locator(".media-shell")).not.toHaveClass(/failed/);
  await expect(page.locator(".media-shell")).toHaveAttribute("aria-busy", "false");
  expect(await page.locator(".program img").evaluate(e => e.naturalWidth > 0)).toBeTruthy();
});

test("scroll text follows viewport and stays readable under reduced motion", async ({ page }) => {
  await page.goto("/");
  const word = page.locator(".reveal-word").first();
  await expect.poll(()=>word.evaluate(e=>Number(getComputedStyle(e).opacity))).toBeLessThan(.2);
  await page.locator("#statement-title").evaluate(e=>scrollTo({top:scrollY+e.getBoundingClientRect().bottom-innerHeight*.35,behavior:"instant"}));
  await expect.poll(()=>word.evaluate(e=>Number(getComputedStyle(e).opacity))).toBeGreaterThan(.9);
  await page.evaluate(()=>scrollTo(0,0));
  await expect.poll(()=>word.evaluate(e=>Number(getComputedStyle(e).opacity))).toBeLessThan(.2);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(word).toHaveCSS("opacity", "1");
  await expect(word).toHaveCSS("filter", "none");
  await expect(page.locator("#statement-title")).toContainText("Ayudar y animar");
});

test("rapid pill filter changes preserve the last selection and keyboard behavior", async ({ page }) => {
  await page.goto("/");
  for (const name of ["Registro", "Otros", "Extranjero", "General", "Registro"]) {
    await page.getByRole("button", { name, exact: true }).click();
  }
  const selected = page.getByRole("button", { name: "Registro", exact: true });
  await expect(selected).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator('.faq-filters [aria-pressed="true"]')).toHaveCount(1);
  await expect(page.locator(".faq-list details:visible")).toHaveCount(4);
  await page.getByRole("button", { name: "General", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "General", exact: true })).toHaveAttribute("aria-pressed", "true");
});

test('open menu remains readable and keyboard accessible at narrow widths', async ({page}) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:320,height:740});
  await page.goto('/');
  await page.locator('.lasal-nav-toggle').click();
  const result = await new AxeBuilder({page}).include('dialog').withTags(['wcag2a','wcag2aa']).analyze();
  expect(result.violations).toEqual([]);
  expect(await page.locator('.lasal-nav-links').evaluate(el=>el.scrollWidth<=el.clientWidth)).toBeTruthy();
  await page.getByRole('button',{name:'Cerrar menú'}).click();
  await expect(page.locator('.lasal-nav-toggle')).toBeFocused();
});
