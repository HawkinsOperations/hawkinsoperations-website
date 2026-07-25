import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { name: "desktop-1920", width: 1920, height: 1080 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-large-430", width: 430, height: 932 },
  { name: "mobile-390", width: 390, height: 844 },
];

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const root = document.documentElement;
    const body = document.body;
    return Math.max(root.scrollWidth - root.clientWidth, body.scrollWidth - body.clientWidth);
  });
  expect(overflow).toBeLessThanOrEqual(1);
}

test.describe("podcast field guide visual QA", () => {
  for (const viewport of viewports) {
    test(`loads cleanly at ${viewport.name}`, async ({ page }, testInfo) => {
      const consoleErrors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });

      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/podcast/", { waitUntil: "networkidle" });

      await expect(page.getByRole("heading", { name: "From Logs to AI Triage" })).toBeVisible();
      await expect(page.locator(".podcast-card")).toHaveCount(3);
      await expect(page.locator('img[src^="/podcast/"]')).toHaveCount(6);
      const podcastNavigation =
        viewport.width < 768
          ? page.locator(".podcast-mobile-nav-link")
          : page.locator(".podcast-header-link");
      await expect(podcastNavigation).toBeVisible();
      if (viewport.width < 768) {
        const touchTargetHeight = await podcastNavigation.evaluate(
          (element) => element.getBoundingClientRect().height,
        );
        expect(touchTargetHeight).toBeGreaterThanOrEqual(44);
      }
      await podcastNavigation.focus();
      const focusOutline = await podcastNavigation.evaluate((element) => {
        const styles = getComputedStyle(element);
        return {
          style: styles.outlineStyle,
          width: Number.parseFloat(styles.outlineWidth),
        };
      });
      expect(focusOutline.style).not.toBe("none");
      expect(focusOutline.width).toBeGreaterThanOrEqual(2);
      await expect(page.getByRole("link", { name: "Try Claim Firewall" })).toHaveAttribute(
        "href",
        "/claim-firewall/",
      );
      await expect(page.getByRole("link", { name: "Explore the governed review path" })).toHaveAttribute(
        "href",
        "/hoxline/",
      );

      const imageState = await page.locator('img[src^="/podcast/"]').evaluateAll((images) =>
        images.map((image) => {
          const img = image as HTMLImageElement;
          return {
            loaded: img.complete && img.naturalWidth === 1920 && img.naturalHeight === 1080,
            width: img.getBoundingClientRect().width,
          };
        }),
      );

      expect(imageState.every((image) => image.loaded && image.width > 0)).toBe(true);
      await expectNoHorizontalOverflow(page);
      expect(consoleErrors).toEqual([]);

      if (viewport.name === "desktop-1920") {
        for (const href of ["/claim-firewall/", "/hoxline/", "/ai-security/"]) {
          const response = await page.request.get(href);
          expect(response.ok(), `${href} should resolve`).toBe(true);
        }
        await page.getByRole("link", { name: "Follow the workflow" }).click();
        await expect(page).toHaveURL(/#workflow$/);
      }

      await page.screenshot({
        path: testInfo.outputPath(`${viewport.name}.png`),
        fullPage: true,
      });
    });
  }
});
