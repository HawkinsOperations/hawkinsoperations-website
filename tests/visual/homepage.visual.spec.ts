import { expect, test, type Locator, type Page } from "@playwright/test";

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

async function expectTextNotClipped(locator: Locator) {
  await expect(locator).toBeVisible();
  const isReadable = await locator.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);
    const viewportWidth = document.documentElement.clientWidth;

    return (
      rect.width > 0 &&
      rect.height > 0 &&
      rect.left >= -1 &&
      rect.right <= viewportWidth + 1 &&
      element.scrollWidth - element.clientWidth <= 1 &&
      style.visibility !== "hidden" &&
      style.display !== "none"
    );
  });

  expect(isReadable).toBe(true);
}

test.describe("homepage visual QA", () => {
  for (const viewport of viewports) {
    test(`loads cleanly at ${viewport.name}`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/", { waitUntil: "networkidle" });

      const hero = page.locator(".awb").first();
      const headline = page.locator("#awb-title").first();
      const primaryCta = page.getByRole("link", { name: "Open Hoxline" }).first();
      const secondaryCta = page.getByRole("link", { name: "Try Claim Firewall" }).first();
      const podcastBridge = page.getByRole("link", { name: /Open the teaching workflow/ }).first();

      await expect(hero).toBeVisible();
      await expectTextNotClipped(headline);
      await expectTextNotClipped(primaryCta);
      await expectTextNotClipped(secondaryCta);
      await expectTextNotClipped(podcastBridge);
      await expectNoHorizontalOverflow(page);

      await page.screenshot({
        path: testInfo.outputPath(`${viewport.name}.png`),
        fullPage: true,
      });
    });
  }
});
