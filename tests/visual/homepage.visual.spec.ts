import { expect, test, type Locator, type Page } from "@playwright/test";

const viewports = [
  { name: "desktop-1920", width: 1920, height: 1080 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "tablet-landscape-1024", width: 1024, height: 768 },
  { name: "tablet-portrait-768", width: 768, height: 1024 },
  { name: "mobile-large-430", width: 430, height: 932 },
  { name: "mobile-390", width: 390, height: 844 },
] as const;

const sceneHeadings = [
  "AI can generate security work faster than organizations can prove it.",
  "One controlled route from generated work to bounded public output.",
  "Follow one PowerShell behavior hypothesis through the complete system.",
  "AI stops at the evidence gate. Human authority governs what happens next.",
  "Six kinds of truth. None can silently stand in for another.",
  "View the work. Clone the source. Run the checks. Verify the boundary.",
  "The strongest receipts show what the system prevented.",
  "Move fast, but make every important claim earn its authority.",
] as const;

const featuredDetailRoutes = [
  ["hoxline", "/hoxline/"],
  ["proof", "/proof/"],
  ["detections", "/detections/"],
  ["claim-firewall", "/claim-firewall/"],
  ["ai-automation", "/ai-security/"],
  ["governance-saves", "/governance-saves/"],
  ["about", "/about/"],
] as const;

function collectRuntimeErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    const text = message.text();
    const isNextDevRefreshFallback =
      text.includes("Failed to fetch RSC payload for http://127.0.0.1:3210/") &&
      text.includes("Falling back to browser navigation");
    if (message.type() === "error" && !isNextDevRefreshFallback) errors.push(`console: ${text}`);
  });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("requestfailed", (request) => {
    if (request.resourceType() !== "image") return;
    errors.push(`requestfailed: ${request.url()} (${request.failure()?.errorText ?? "unknown"})`);
  });
  return errors;
}

async function expectNoHorizontalOverflow(page: Page, context = "current page") {
  const result = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const offenders = [...document.querySelectorAll<HTMLElement>("body *")]
      .filter((element) => {
        const style = getComputedStyle(element);
        if (style.display === "none" || style.visibility === "hidden") return false;
        const rect = element.getBoundingClientRect();
        if (rect.left >= -1 && rect.right <= viewportWidth + 1) return false;
        let ancestor = element.parentElement;
        while (ancestor) {
          const ancestorStyle = getComputedStyle(ancestor);
          if (
            ["auto", "scroll"].includes(ancestorStyle.overflowX) &&
            ancestor.scrollWidth > ancestor.clientWidth
          ) return false;
          ancestor = ancestor.parentElement;
        }
        return true;
      })
      .slice(0, 12)
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return `${element.tagName.toLowerCase()}.${element.className}[left=${Math.round(rect.left)},right=${Math.round(rect.right)},width=${Math.round(rect.width)}]`;
      });
    return {
      overflow: Math.max(
        document.documentElement.scrollWidth - viewportWidth,
        document.body.scrollWidth - viewportWidth,
      ),
      offenders,
    };
  });
  expect(result, `${context} overflow offenders: ${result.offenders.join(", ")}`).toEqual({ overflow: 0, offenders: [] });
}

async function expectTextNotClipped(locator: Locator) {
  await expect(locator).toBeVisible();
  const result = await locator.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      horizontalClip: element.scrollWidth - element.clientWidth,
    };
  });
  expect(result.width).toBeGreaterThan(0);
  expect(result.height).toBeGreaterThan(0);
  expect(result.horizontalClip).toBeLessThanOrEqual(1);
}

async function expectTouchTarget(locator: Locator) {
  await expect(locator).toBeVisible();
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.width).toBeGreaterThanOrEqual(44);
  expect(box!.height).toBeGreaterThanOrEqual(44);
}

async function expectPresentationChrome(page: Page) {
  const toolbar = page.getByRole("region", { name: "Presentation controls" });
  const scene = page.locator('[data-presentation-scene]:not([hidden])');
  await expect(toolbar).toBeVisible();
  await expect(scene).toHaveCount(1);
  const [toolbarBox, sceneBox, viewport] = await Promise.all([
    toolbar.boundingBox(),
    scene.boundingBox(),
    page.evaluate(() => ({ width: innerWidth, height: innerHeight })),
  ]);
  expect(toolbarBox).not.toBeNull();
  expect(sceneBox).not.toBeNull();
  expect(toolbarBox!.y).toBeGreaterThanOrEqual(0);
  expect(toolbarBox!.y + toolbarBox!.height).toBeLessThanOrEqual(viewport.height + 1);
  expect(sceneBox!.y).toBeGreaterThanOrEqual(toolbarBox!.y + toolbarBox!.height - 1);
}

async function expectVisibleSceneTextInViewport(page: Page, context: string) {
  const offenders = await page.locator('[data-presentation-scene]:not([hidden])').evaluate((scene) => {
    const viewportWidth = document.documentElement.clientWidth;
    return [...scene.querySelectorAll<HTMLElement>("h1,h2,h3,p,a,li,dt,dd,code,strong,small")]
      .filter((element) => {
        if (!element.textContent?.trim()) return false;
        const style = getComputedStyle(element);
        if (style.display === "none" || style.visibility === "hidden") return false;
        const rect = element.getBoundingClientRect();
        return rect.left < -1 || rect.right > viewportWidth + 1;
      })
      .slice(0, 12)
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return `${element.tagName.toLowerCase()}[left=${Math.round(rect.left)},right=${Math.round(rect.right)}]`;
      });
  });
  expect(offenders, `${context} clipped presentation text`).toEqual([]);
}

test.describe("Reviewer Guide homepage visual QA", () => {
  for (const viewport of viewports) {
    test(`ordinary mode is readable at ${viewport.name}`, async ({ page }, testInfo) => {
      const errors = collectRuntimeErrors(page);
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/", { waitUntil: "networkidle" });

      await expect(page.locator(".reviewer-guide__eyebrow").first()).toHaveText("Reviewer Guide");
      await expectTextNotClipped(page.getByRole("heading", { level: 1, name: sceneHeadings[0] }));
      await expect(page.getByText(/governed AI Security Operations and detection engineering system/)).toBeVisible();
      for (const heading of sceneHeadings) {
        await expect(page.getByRole("heading", { name: heading })).toHaveCount(1);
      }
      await expect(page.getByText(/Podcast guide|Podcast field guide|From Logs to AI Triage/i)).toHaveCount(0);
      await expect(page.locator(".reviewer-guide")).toHaveAttribute("data-presentation-active", "false");
      await expect(page.getByRole("link", { name: "Open Hoxline" }).first()).toHaveAttribute("href", "/hoxline/");
      await expect(page.getByRole("link", { name: "Inspect Proof" })).toHaveAttribute("href", "/proof/");
      await expect(page.getByRole("link", { name: "Claim Firewall", exact: true }).first()).toHaveAttribute("href", "/claim-firewall/");

      for (const image of await page.locator("img").all()) {
        await expect(image).toHaveAttribute("alt");
        await expect(image).toHaveJSProperty("complete", true);
        expect(await image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      }
      if (viewport.width <= 430) {
        await expectTouchTarget(page.getByRole("button", { name: "Enter presentation mode" }));
        await expectTouchTarget(page.getByRole("link", { name: "Start the walkthrough" }));
      }

      await expectNoHorizontalOverflow(page);
      expect(errors).toEqual([]);
      await page.screenshot({ path: testInfo.outputPath(`${viewport.name}-ordinary.png`), fullPage: true });
    });
  }

  test("presentation mode supports URL state, keyboard navigation, back, and focus", async ({ page }, testInfo) => {
    const errors = collectRuntimeErrors(page);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/", { waitUntil: "networkidle" });
    const enter = page.getByRole("button", { name: "Enter presentation mode" });
    await enter.focus();
    await enter.click();

    await expect(page).toHaveURL(/\?present=1&scene=1$/);
    await expectPresentationChrome(page);
    await expect(page.getByRole("heading", { name: sceneHeadings[0] })).toBeFocused();
    const headingFocus = await page.getByRole("heading", { name: sceneHeadings[0] }).evaluate((element) => getComputedStyle(element).boxShadow);
    expect(headingFocus).not.toBe("none");
    await page.screenshot({ path: testInfo.outputPath("presentation-scene-01.png") });

    await page.getByRole("button", { name: /Next/ }).click();
    await expect(page).toHaveURL(/scene=2$/);
    await page.keyboard.press("ArrowRight");
    await expect(page).toHaveURL(/scene=3$/);
    await page.keyboard.press("Home");
    await expect(page).toHaveURL(/scene=1$/);

    for (let index = 1; index < sceneHeadings.length; index += 1) {
      await page.keyboard.press(index === 1 ? "ArrowRight" : "PageDown");
      await expect(page).toHaveURL(new RegExp(`scene=${index + 1}$`));
      await expect(page.getByRole("heading", { name: sceneHeadings[index] })).toBeVisible();
      await expect(page.getByRole("heading", { name: sceneHeadings[index] })).toBeFocused();
      await expectTextNotClipped(page.getByRole("heading", { name: sceneHeadings[index] }));
      await expectPresentationChrome(page);
      await expectNoHorizontalOverflow(page);
      await page.screenshot({ path: testInfo.outputPath(`presentation-scene-${String(index + 1).padStart(2, "0")}.png`) });
    }

    await page.keyboard.press("Home");
    await expect(page).toHaveURL(/scene=1$/);
    await page.keyboard.press("End");
    await expect(page).toHaveURL(/scene=8$/);
    await page.keyboard.press("PageUp");
    await expect(page).toHaveURL(/scene=7$/);
    await page.keyboard.press("ArrowLeft");
    await expect(page).toHaveURL(/scene=6$/);
    await page.keyboard.press("Escape");
    await expect(page).toHaveURL(/\/$/);
    await expect(enter).toBeFocused();

    await enter.click();
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator(".reviewer-guide")).toHaveAttribute("data-presentation-active", "false");
    expect(errors).toEqual([]);
  });

  test("direct presentation URL is bounded and reduced motion is respected", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto("/?present=1&scene=99", { waitUntil: "networkidle" });
    await expect(page).toHaveURL(/scene=8$/);
    await expect(page.getByText("Scene 8 of 8")).toBeVisible();
    await expect(page.getByRole("heading", { name: sceneHeadings[7] })).toBeVisible();
    const duration = await page.getByRole("button", { name: "Exit" }).evaluate((element) => getComputedStyle(element).transitionDuration);
    expect(["0.001ms", "1e-06s"]).toContain(duration);
    await expectNoHorizontalOverflow(page);
  });

  for (const viewport of viewports) {
    test(`presentation mode is readable at ${viewport.name}`, async ({ page }, testInfo) => {
      const errors = collectRuntimeErrors(page);
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      for (const sceneNumber of [2, 7, 8]) {
        await page.goto(`/?present=1&scene=${sceneNumber}`, { waitUntil: "networkidle" });
        const heading = page.getByRole("heading", { name: sceneHeadings[sceneNumber - 1] });
        await expect(heading).toBeVisible();
        await expect(heading).toBeFocused();
        await expectPresentationChrome(page);
        await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
        await expectNoHorizontalOverflow(page, `${viewport.name} scene ${sceneNumber}`);
        await expectVisibleSceneTextInViewport(page, `${viewport.name} scene ${sceneNumber}`);
        await page.screenshot({ path: testInfo.outputPath(`${viewport.name}-presentation-scene-${sceneNumber}.png`) });
        const scrollState = await page.evaluate(() => {
          const candidates = [document.scrollingElement, document.querySelector("main"), document.querySelector('[data-presentation-scene]:not([hidden])')]
            .filter((element): element is Element => element !== null);
          const overflowing = candidates.filter((element) => element.scrollHeight - element.clientHeight > 1);
          if (overflowing.length === 0) return { required: false, usable: true };
          const usable = overflowing.some((element) => {
            const before = element.scrollTop;
            const htmlElement = element as HTMLElement;
            const previousScrollBehavior = htmlElement.style.scrollBehavior;
            htmlElement.style.scrollBehavior = "auto";
            element.scrollTop = element.scrollHeight;
            const didScroll = element.scrollTop > 0;
            element.scrollTop = before;
            htmlElement.style.scrollBehavior = previousScrollBehavior;
            return didScroll;
          });
          return { required: true, usable };
        });
        expect(scrollState.usable, `${viewport.name} scene ${sceneNumber} should remain vertically scrollable`).toBe(true);
      }
      if (viewport.width <= 430) {
        for (const name of ["Exit", "Previous"]) {
          await expectTouchTarget(page.getByRole("button", { name: new RegExp(name) }));
        }
      }
      expect(errors).toEqual([]);
    });
  }

  test("homepage internal routes resolve and the standalone podcast route is removed", async ({ page, request }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const routes = await page.locator('a[href^="/"]').evaluateAll((links) =>
      [...new Set(links.map((link) => (link as HTMLAnchorElement).getAttribute("href")!).filter(Boolean))],
    );
    for (const route of routes) {
      const response = await request.get(route);
      expect(response.status(), `${route} should resolve`).toBeLessThan(400);
    }
    expect((await request.get("/podcast/")).status()).toBe(404);
  });

  test("featured detail routes preserve hierarchy and stable site chrome", async ({ page }, testInfo) => {
    const errors = collectRuntimeErrors(page);
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const [name, route] of featuredDetailRoutes) {
      errors.length = 0;
      const response = await page.goto(route, { waitUntil: "networkidle" });
      expect(response?.status(), `${route} should resolve`).toBeLessThan(400);
      await expect(page.locator(".site-header")).toBeVisible();
      await expect(page.locator(".site-footer")).toBeVisible();
      await expectTextNotClipped(page.locator("h1").first());
      await expectNoHorizontalOverflow(page, route);
      expect(errors, `${route} browser errors`).toEqual([]);
      await page.screenshot({ path: testInfo.outputPath(`detail-${name}-1440.png`), fullPage: true });
    }
  });

  test("every sitemap route remains readable on mobile with valid internal links", async ({ page, request }) => {
    test.setTimeout(120_000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "networkidle" });
    const errors = collectRuntimeErrors(page);
    const sitemapResponse = await request.get("/sitemap.xml");
    expect(sitemapResponse.status()).toBe(200);
    const sitemap = await sitemapResponse.text();
    const routes = [...sitemap.matchAll(/<loc>https:\/\/hawkinsoperations\.com([^<]+)<\/loc>/g)]
      .map((match) => match[1])
      .filter((route, index, all) => all.indexOf(route) === index);
    expect(routes.length).toBeGreaterThan(20);

    const internalRoutes = new Set<string>();
    for (const route of routes) {
      errors.length = 0;
      const response = await page.goto(route, { waitUntil: "networkidle" });
      expect(response?.status(), `${route} should resolve`).toBeLessThan(400);
      await expect(page.locator("h1").first(), `${route} should expose a visible page heading`).toBeVisible();
      await expectNoHorizontalOverflow(page, route);
      expect(errors, `${route} browser errors`).toEqual([]);
      const hrefs = await page.locator('a[href^="/"]').evaluateAll((links) =>
        links.map((link) => (link as HTMLAnchorElement).getAttribute("href")!).filter(Boolean),
      );
      hrefs.forEach((href) => internalRoutes.add(href));
    }

    for (const route of internalRoutes) {
      const response = await request.get(route);
      expect(response.status(), `${route} should resolve`).toBeLessThan(400);
    }
  });
});
