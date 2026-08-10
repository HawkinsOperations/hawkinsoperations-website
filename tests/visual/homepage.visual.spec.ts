import { expect, test, type Locator, type Page } from "@playwright/test";

const viewports = [
  { name: "desktop-1920", width: 1920, height: 1080 },
  { name: "desktop-1600", width: 1600, height: 900 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1366", width: 1366, height: 768 },
  { name: "tablet-wide-1180", width: 1180, height: 820 },
  { name: "tablet-landscape-1024", width: 1024, height: 768 },
  { name: "tablet-narrow-820", width: 820, height: 1180 },
  { name: "tablet-portrait-768", width: 768, height: 1024 },
  { name: "mobile-large-430", width: 430, height: 932 },
  { name: "mobile-390", width: 390, height: 844 },
] as const;

const sceneHeadings = [
  "AI can build security work faster than we can prove it.",
  "Run the governed path. Inspect every authority boundary.",
  "Scrub through one bounded detection workflow.",
  "Test exactly where AI assistance stops.",
  "Inspect the surfaces that must never be silently substituted.",
  "View, clone, run, and verify from owning routes.",
  "See which controls prevented trust drift.",
  "The system stays impressive because its claims stay honest.",
] as const;

function collectRuntimeErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    const text = message.text();
    const isNextDevRefreshFallback = text.includes("Failed to fetch RSC payload") && text.includes("Falling back to browser navigation");
    if (message.type() === "error" && !isNextDevRefreshFallback) errors.push(`console: ${text}`);
  });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("requestfailed", (request) => {
    const url = new URL(request.url());
    if (url.origin === "http://127.0.0.1:3210" && ["document", "script", "stylesheet", "font", "image"].includes(request.resourceType())) {
      errors.push(`requestfailed: ${request.resourceType()} ${request.url()} (${request.failure()?.errorText ?? "unknown"})`);
    }
  });
  return errors;
}

async function loadHome(page: Page, path = "/") {
  await page.goto(path, { waitUntil: "domcontentloaded" });
  await expect(page.locator(".rg-guide")).toHaveAttribute("data-hydrated", "true");
}

async function expectNoHorizontalOverflow(page: Page, context = "current page") {
  const result = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const overflow = Math.max(document.documentElement.scrollWidth - viewportWidth, document.body.scrollWidth - viewportWidth);
    const offenders = [...document.querySelectorAll<HTMLElement>("body *")]
      .filter((element) => {
        const style = getComputedStyle(element);
        if (style.display === "none" || style.visibility === "hidden") return false;
        const rect = element.getBoundingClientRect();
        if (rect.left >= -1 && rect.right <= viewportWidth + 1) return false;
        let ancestor = element.parentElement;
        while (ancestor) {
          const ancestorStyle = getComputedStyle(ancestor);
          if (["auto", "scroll"].includes(ancestorStyle.overflowX) && ancestor.scrollWidth > ancestor.clientWidth) return false;
          ancestor = ancestor.parentElement;
        }
        return true;
      })
      .slice(0, 8)
      .map((element) => `${element.tagName.toLowerCase()}.${element.className}`);
    return { overflow, offenders };
  });
  expect(result, `${context} overflow offenders: ${result.offenders.join(", ")}`).toEqual({ overflow: 0, offenders: [] });
}

async function expectTouchTarget(locator: Locator) {
  await expect(locator).toBeVisible();
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.width).toBeGreaterThanOrEqual(44);
  expect(box!.height).toBeGreaterThanOrEqual(44);
}

async function stepScenario(page: Page, count: number) {
  const button = page.getByRole("button", { name: "Step scenario" });
  for (let index = 0; index < count; index += 1) await button.click();
}

test.describe("Interactive Reviewer Guide", () => {
  test("ordinary homepage load does not steal focus", async ({ page }) => {
    await loadHome(page);
    await expect(page.getByRole("button", { name: "Enter presentation mode" })).not.toBeFocused();
    expect(await page.evaluate(() => document.activeElement?.tagName)).toBe("BODY");
  });

  test("native SVG topology selects nodes, updates the inspector, and supports keyboard traversal", async ({ page }) => {
    const errors = collectRuntimeErrors(page);
    await page.setViewportSize({ width: 1600, height: 900 });
    await loadHome(page);
    const topology = page.locator(".rg-system__canvas .rg-topology");
    const aiNode = topology.locator('[data-node-id="ai-labor"]');
    const validationNode = topology.locator('[data-node-id="validation"]');

    await aiNode.click();
    await expect(page.locator("#reviewer-system-inspector h3")).toHaveText("AI-assisted labor");
    await validationNode.click();
    await expect(page.locator("#reviewer-system-inspector h3")).toHaveText("Deterministic validation");
    await expect(topology.locator('[data-edge-id="source-to-validation"]')).toHaveAttribute("data-selected-path", "true");
    await expect(topology.locator('[data-edge-id="validation-to-hoxline"]')).toHaveAttribute("data-selected-path", "true");

    await validationNode.focus();
    await page.keyboard.press("ArrowRight");
    await expect(topology.locator('[data-node-id="hoxline"]')).toBeFocused();
    await expect(page.locator("#reviewer-system-inspector h3")).toHaveText("Hoxline");
    await page.keyboard.press("Home");
    await expect(aiNode).toBeFocused();
    await page.keyboard.press("End");
    await expect(topology.locator('[data-node-id="public-output"]')).toBeFocused();
    const miniNodes = page.locator(".rg-mini-topology [role=button]");
    await expect(page.locator('.rg-mini-topology [role=button][tabindex="0"]')).toHaveCount(1);
    await expect(page.locator('.rg-mini-topology [role=button][data-node-id="ai-labor"]')).toHaveAttribute("tabindex", "0");
    await expect(topology.locator(".rg-topology__authority-map li")).toHaveCount(7);
    await expect(topology.locator(".rg-topology__authority-map")).toContainText("Functionally connected. Never interchangeable.");
    expect(errors).toEqual([]);
  });

  test("controlled scenario starts idle, can run and pause, then ends at human review without promotion", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await loadHome(page);
    const runner = page.locator(".rg-runner");
    await expect(runner).toContainText("Ready");
    await expect(runner).toContainText("UNASSESSED");

    await page.getByRole("button", { name: "Run scenario" }).click();
    await expect(page.getByRole("button", { name: "Pause scenario" })).toBeVisible();
    await expect(runner).toContainText("AI draft", { timeout: 2500 });
    await page.getByRole("button", { name: "Pause scenario" }).click();
    await page.getByRole("button", { name: "Reset scenario" }).click();
    await stepScenario(page, 5);
    await expect(runner).toContainText("Deterministic result");
    await expect(runner).toContainText("PENDING");
    await stepScenario(page, 1);
    await expect(page.locator('.rg-system__canvas [data-node-id="hoxline"]')).toHaveAttribute("data-status", "active");
    await expect(page.locator('.rg-system__canvas [data-edge-id="validation-to-hoxline"]')).toHaveAttribute("data-status", "active");
    await expect(runner).toContainText("HOXLINE_CONTROL_CONTEXT_LOADED");
    await stepScenario(page, 1);
    await expect(page.locator('.rg-system__canvas [data-node-id="claim-gate"]')).toHaveAttribute("data-status", "active");
    await expect(page.locator('.rg-system__canvas [data-edge-id="hoxline-to-claim"]')).toHaveAttribute("data-status", "active");
    const controlledEvents = await runner.locator(".rg-runner__feed strong").allTextContents();
    expect(controlledEvents.indexOf("HOXLINE_CONTROL_CONTEXT_LOADED")).toBeLessThan(controlledEvents.indexOf("CLAIM_EVALUATION_STARTED"));
    await stepScenario(page, 2);

    await expect(runner).toContainText("HUMAN_REVIEW_REQUIRED");
    await expect(runner).toContainText("CONTROLLED_TEST_VALIDATED");
    await expect(page.locator('.rg-system__canvas [data-node-id="human-review"]')).toHaveAttribute("data-status", "active");
    await expect(page.locator('.rg-system__canvas [data-node-id="public-output"]')).toHaveAttribute("data-status", "inactive");
    await expect(page.locator('.rg-system__canvas [data-node-id="blocked"]')).toHaveAttribute("data-status", "inactive");
    await expect(page.getByText("NO_AUTOMATIC_PROMOTION")).toBeVisible();
    await expect(runner.locator(".rg-runner__feed strong")).toHaveText([
      "AI_DRAFT_CREATED",
      "SOURCE_BOUND",
      "POSITIVE_FIXTURES_PASS",
      "NEGATIVE_FIXTURES_PASS",
      "DETERMINISTIC_VALIDATION_PASS",
      "CEILING=CONTROLLED_TEST_VALIDATED",
      "HOXLINE_CONTROL_CONTEXT_LOADED",
      "CLAIM_EVALUATION_STARTED",
      "CLAIM_WITHIN_CEILING",
      "PROOF_RECORD_LINKED",
      "RUNTIME_AND_SIGNAL_UNPROMOTED",
      "HUMAN_REVIEW=REQUIRED",
      "NO_AUTOMATIC_PROMOTION",
    ]);
  });

  test("unsupported runtime claim visibly diverges to BLOCKED and never activates public output", async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 900 });
    await loadHome(page);
    await page.getByLabel("Select scenario").selectOption("unsupported_runtime_claim");
    await stepScenario(page, 4);
    await expect(page.locator('.rg-system__canvas [data-node-id="hoxline"]')).toHaveAttribute("data-status", "active");
    await expect(page.locator('.rg-system__canvas [data-edge-id="validation-to-hoxline"]')).toHaveAttribute("data-status", "active");
    await expect(page.locator(".rg-runner__feed")).toContainText("HOXLINE_CONTROL_CONTEXT_LOADED");
    await stepScenario(page, 2);

    const blocked = page.locator(".rg-runner__blocked");
    await expect(blocked).toBeVisible();
    await expect(blocked).toContainText("HO-DET-001 is runtime active.");
    await expect(blocked).toContainText("HO-DET-001 has controlled validation evidence and runtime claims remain gated.");
    await expect(blocked).toContainText("runtime evidence");
    await expect(page.locator('.rg-system__canvas [data-edge-id="claim-to-blocked"]')).toHaveAttribute("data-status", "blocked");
    await expect(page.locator('.rg-system__canvas [data-edge-id="claim-to-proof"]')).toHaveAttribute("data-status", "inactive");
    await expect(page.locator('.rg-system__canvas [data-node-id="public-output"]')).toHaveAttribute("data-status", "inactive");
    await expect(page.locator('.rg-mini-topology [data-node-id="blocked"]')).toHaveAttribute("data-status", "blocked");
    await expect(page.locator('.rg-mini-topology [data-node-id="human-review"]')).toHaveCount(0);
    await expect(page.locator(".rg-runner__feed strong")).toHaveText([
      "CLAIM_DRAFT_CREATED",
      "SOURCE_EXISTS",
      "CONTROLLED_VALIDATION_FOUND",
      "HOXLINE_CONTROL_CONTEXT_LOADED",
      "RUNTIME_CLAIM_DETECTED",
      "CEILING_COMPARED",
      "DECISION=BLOCKED",
      "REQUIRED_EVIDENCE=RUNTIME_EVIDENCE",
    ]);
  });

  test("HO-DET-001 walkthrough is isolated from blocked global state and keeps controlled selection", async ({ page }) => {
    await loadHome(page);
    await page.getByLabel("Select scenario").selectOption("unsupported_runtime_claim");
    await stepScenario(page, 6);
    await expect(page.locator('.rg-system__canvas [data-node-id="blocked"]')).toHaveAttribute("data-status", "blocked");
    const walkthrough = page.locator("#rg-scene-ho-det-001");
    await expect(walkthrough.locator(".rg-walkthrough__scrubber")).toContainText("Step 1 of 9");
    await expect(walkthrough.locator(".rg-walkthrough__artifact h3")).toHaveText("draft candidate");
    await expect(walkthrough.locator('.rg-topology [data-node-id="blocked"]')).not.toHaveAttribute("data-selected", "true");
    await expect(walkthrough.locator('.rg-topology [data-node-id="ai-labor"]')).toHaveAttribute("data-selected", "true");
    const proofNode = walkthrough.locator('.rg-topology [data-node-id="proof"]');
    await proofNode.click();
    await expect(proofNode).toHaveAttribute("data-selected", "true");
  });

  test("missing signal evidence preserves source and validation while signal remains unavailable", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await loadHome(page);
    await page.getByLabel("Select scenario").selectOption("missing_signal_evidence");
    await stepScenario(page, 3);
    await expect(page.locator('.rg-system__canvas [data-node-id="hoxline"]')).toHaveAttribute("data-status", "active");
    await expect(page.locator('.rg-system__canvas [data-edge-id="validation-to-hoxline"]')).toHaveAttribute("data-status", "active");
    await stepScenario(page, 2);
    const runner = page.locator(".rg-runner");
    await expect(runner).toContainText("SIGNAL_EVIDENCE_NOT_FOUND");
    await expect(runner).toContainText("signal observation evidence");
    await expect(runner).toContainText("signal observation remains unproven");
    await expect(page.locator('.rg-system__canvas [data-node-id="source"]')).toHaveAttribute("data-status", "visited");
    await expect(page.locator('.rg-system__canvas [data-node-id="validation"]')).toHaveAttribute("data-status", "visited");
    await expect(page.locator('.rg-system__canvas [data-node-id="public-output"]')).toHaveAttribute("data-status", "inactive");
    await expect(runner.locator(".rg-runner__feed strong")).toHaveText([
      "SOURCE_EXISTS",
      "CONTROLLED_VALIDATION_FOUND",
      "SIGNAL_EVIDENCE_NOT_FOUND",
      "HOXLINE_CONTROL_CONTEXT_LOADED",
      "SIGNAL_CLAIM_DETECTED",
      "TRUTH_SURFACES_COMPARED",
      "DECISION=BLOCKED",
      "REQUIRED_EVIDENCE=SIGNAL_OBSERVATION_EVIDENCE",
    ]);
  });

  test("authority boundary executes allowed and human-authority-required decisions", async ({ page }) => {
    await loadHome(page);
    const boundary = page.locator(".rg-authority");
    await boundary.getByRole("button", { name: "Draft detection" }).click();
    await expect(boundary.locator(".rg-authority__decision")).toContainText("AI_ASSIST_ALLOWED");
    for (const action of ["Approve evidence", "Merge", "Promote claim", "Close case", "Set disposition"]) {
      await boundary.getByRole("button", { name: action }).click();
      await expect(boundary.locator(".rg-authority__decision")).toContainText("HUMAN_AUTHORITY_REQUIRED");
    }
  });

  test("truth surfaces update one inspector and expose forbidden substitutions", async ({ page }) => {
    await loadHome(page);
    const truth = page.locator(".rg-truth");
    const expected = ["Source", "Validation", "Runtime", "Signal", "Evidence / proof", "Public rendering"];
    for (const label of expected) {
      await truth.locator(".rg-truth__rail").getByRole("button").filter({ hasText: label }).click();
      await expect(truth.locator("#truth-surface-inspector h3")).toHaveText(label);
    }
    await truth.getByRole("button", { name: "Show forbidden substitutions" }).click();
    await expect(truth).toContainText("SOURCE");
    await expect(truth).toContainText("RUNTIME");
    await expect(truth).toContainText("VALIDATION");
    await expect(truth).toContainText("SIGNAL");
    await expect(truth).toContainText("CI GREEN");
    await expect(truth).toContainText("APPROVAL");
  });

  test("reviewer console tabs work and exact commands can be copied", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: "http://127.0.0.1:3210" });
    await loadHome(page);
    const consoleUi = page.locator(".rg-console");
    await expect(consoleUi.locator(".rg-console__items > li")).toHaveCount(await consoleUi.locator(".rg-console__items button").count());
    await expect(consoleUi.locator(".rg-console__items > li").first()).toHaveRole("listitem");
    await expect(consoleUi.locator(".rg-console__items > li button").first()).toHaveRole("button");
    const viewTab = consoleUi.getByRole("tab", { name: "view" });
    await viewTab.focus();
    await page.keyboard.press("ArrowRight");
    await expect(consoleUi.getByRole("tab", { name: "clone" })).toBeFocused();
    await expect(consoleUi.getByRole("tab", { name: "clone" })).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("End");
    await expect(consoleUi.getByRole("tab", { name: "verify" })).toBeFocused();
    await page.keyboard.press("Home");
    await expect(viewTab).toBeFocused();
    for (const tab of ["view", "clone", "run", "verify"]) {
      await consoleUi.getByRole("tab", { name: tab }).click();
      await expect(consoleUi.getByRole("tab", { name: tab })).toHaveAttribute("aria-selected", "true");
    }
    await consoleUi.getByRole("tab", { name: "clone" }).click();
    const expectedCommand = "git clone https://github.com/HawkinsOperations/hawkinsoperations-validation.git";
    await consoleUi.getByRole("button", { name: "Copy Clone validation command" }).click();
    await expect(consoleUi.getByRole("status")).toHaveText("Command copied to clipboard.");
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(expectedCommand);
    await expect(consoleUi.locator("code")).toHaveText(expectedCommand);
  });

  test("presentation mode guides the same interactive application and preserves browser history", async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 900 });
    await loadHome(page, "/?source=review#rg-scene-system");
    const enter = page.getByRole("button", { name: "Enter presentation mode" });
    await enter.click();
    await expect(page).toHaveURL(/present=1/);
    await expect(page.getByRole("heading", { name: sceneHeadings[0] })).toBeFocused();
    await expect(page.locator('section[data-presentation-scene="system"]')).toHaveAttribute("hidden", "");
    expect(await page.locator('section[data-presentation-scene="system"]').evaluate((element) => (element as HTMLElement & { inert: boolean }).inert)).toBe(true);
    await page.getByRole("button", { name: "Next scene" }).click();
    await expect(page).toHaveURL(/scene=2/);
    const topology = page.locator(".rg-system__canvas .rg-topology");
    await topology.locator('[data-node-id="validation"]').click();
    await expect(page.locator("#reviewer-system-inspector h3")).toHaveText("Deterministic validation");
    await expect(page).toHaveURL(/node=validation/);
    await page.getByLabel("Select scenario").selectOption("unsupported_runtime_claim");
    await expect(page).toHaveURL(/scenario=unsupported_runtime_claim/);
    await expect(page).toHaveURL(/node=ai-labor/);
    await page.getByRole("button", { name: "Run scenario" }).click();
    await expect(page.getByRole("button", { name: "Pause scenario" })).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL(/source=review/);
    await expect(page.locator(".rg-guide")).toHaveAttribute("data-presentation-active", "false");
    await expect(page).toHaveURL(/#rg-scene-system$/);
    await expect(enter).toBeFocused();
  });

  test("direct presentation state exits cleanly and reduced motion removes visible traversal", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1024, height: 768 });
    await loadHome(page, "/?source=direct&present=1&scene=99&scenario=nonsense&node=nonsense#rg-scene-system");
    await expect(page).toHaveURL(/scene=8/);
    await expect(page).not.toHaveURL(/scenario=nonsense|node=nonsense/);
    await expect(page.getByRole("heading", { name: sceneHeadings[7] })).toBeVisible();
    await expect(page.locator(".rg-closing .rg-topology__node[role=button]")).toHaveCount(0);
    await expect(page.locator(".rg-topology__edge-token").first()).toHaveCSS("display", "none");
    await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
    await page.getByRole("button", { name: "Exit" }).click();
    await expect(page).toHaveURL(/source=direct/);
    await expect(page).not.toHaveURL(/present=1/);
    await expect(page).toHaveURL(/#rg-scene-system$/);
    await expect(page.getByRole("button", { name: "Enter presentation mode" })).toBeFocused();
    await page.getByLabel("Select scenario").selectOption("controlled_validation");
    await page.getByRole("button", { name: "Run scenario" }).click();
    await expect(page.locator(".rg-runner__state")).toContainText("Human review required", { timeout: 1000 });
    await expect(page.locator(".rg-runner__feed")).toContainText("NO_AUTOMATIC_PROMOTION");
  });

  test("mobile presentation mode keeps the explorer and scenario controls usable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await loadHome(page);
    await page.getByRole("button", { name: "Enter presentation mode" }).click();
    await page.getByRole("button", { name: "Next scene" }).click();
    const topology = page.locator(".rg-system__canvas .rg-topology");
    await expect(topology.locator(".rg-topology__mobile-rail")).toBeVisible();
    await expect(topology.locator(".rg-topology__mobile-branch")).toContainText("Claim decision branches here");
    await expect(topology.locator(".rg-topology__mobile-branch")).toContainText("Blocked termination");
    await expect(topology.locator(".rg-topology__mobile-branch")).toContainText("Within ceiling");
    await topology.locator(".rg-topology__mobile-rail").getByRole("button", { name: /Validation/ }).click();
    await expect(page.locator("#reviewer-system-inspector h3")).toHaveText("Deterministic validation");
    await page.getByLabel("Select scenario").selectOption("missing_signal_evidence");
    await page.getByRole("button", { name: "Step scenario" }).click();
    await expect(page.locator(".rg-runner__state")).toContainText("Source exists");
    await expectNoHorizontalOverflow(page, "mobile presentation");
    await page.getByRole("button", { name: "Exit" }).click();
    await expect(page.locator(".rg-guide")).toHaveAttribute("data-presentation-active", "false");
  });

  for (const viewport of viewports) {
    test(`ordinary explorer is complete and responsive at ${viewport.name}`, async ({ page }, testInfo) => {
      const errors = collectRuntimeErrors(page);
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await loadHome(page);
      await expect(page.locator(".rg-kicker").first()).toContainText("Reviewer Guide");
      for (const heading of sceneHeadings) await expect(page.getByRole("heading", { name: heading })).toHaveCount(1);
      await expect(page.getByText(/Podcast guide|Podcast field guide|From Logs to AI Triage/i)).toHaveCount(0);
      await expect(page.locator('.rg-system__canvas [data-node-id]')).toHaveCount(9);
      await expect(page.locator(".rg-inspector")).toBeVisible();
      await expect(page.locator(".rg-runner")).toBeVisible();
      if (viewport.width <= 1180) {
        await expect(page.locator(".rg-system__canvas .rg-topology__mobile-rail")).toBeVisible();
        await expect(page.locator(".rg-system__canvas .rg-topology > svg")).toBeHidden();
        const primarySize = await page.locator(".rg-system__canvas .rg-topology__mobile-rail button strong").first().evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
        const secondarySize = await page.locator(".rg-system__canvas .rg-topology__mobile-rail button small").first().evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
        expect(primarySize).toBeGreaterThanOrEqual(12);
        expect(secondarySize).toBeGreaterThanOrEqual(10);
        await expectTouchTarget(page.locator(".rg-system__canvas .rg-topology__mobile-rail button").first());
      } else {
        const primaryBox = await page.locator(".rg-system__canvas .rg-topology__node-label").first().boundingBox();
        const secondaryBox = await page.locator(".rg-system__canvas .rg-topology__node-state").first().boundingBox();
        expect(primaryBox?.height ?? 0).toBeGreaterThanOrEqual(12);
        expect(secondaryBox?.height ?? 0).toBeGreaterThanOrEqual(10);
        await expect(page.locator(".rg-system__canvas .rg-topology > svg")).toBeVisible();
      }
      if (viewport.width <= 430) {
        await expectTouchTarget(page.getByRole("button", { name: "Enter presentation mode" }));
        await expectTouchTarget(page.locator(".rg-mini-topology [role=button]").first());
      }
      await expectNoHorizontalOverflow(page, viewport.name);
      expect(errors).toEqual([]);
      await page.screenshot({ path: testInfo.outputPath(`${viewport.name}-full-homepage.png`), fullPage: true });
    });
  }

  test("desktop interaction states produce the approved visual QA capture set", async ({ page }, testInfo) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width: 1600, height: 900 });
    await loadHome(page);
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto";
    });
    const capture = async (name: string, locator: Locator) => {
      await locator.evaluate((element) => {
        const top = element.getBoundingClientRect().top + window.scrollY - 82;
        window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "auto" });
      });
      expect(await page.evaluate(() => window.scrollX)).toBe(0);
      await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
      await page.waitForTimeout(50);
      await page.screenshot({ path: testInfo.outputPath(`${name}.png`) });
    };
    await capture("01-hero", page.locator("#rg-scene-problem"));
    await capture("02-topology-idle", page.locator("#rg-scene-system"));
    await page.getByLabel("Select scenario").selectOption("controlled_validation");
    await stepScenario(page, 3);
    await capture("03-validation-active", page.locator(".rg-system__workbench"));
    await stepScenario(page, 3);
    await capture("04-hoxline-active", page.locator(".rg-system__workbench"));
    await stepScenario(page, 1);
    await capture("05-claim-gate-active", page.locator(".rg-system__workbench"));
    await page.getByLabel("Select scenario").selectOption("unsupported_runtime_claim");
    await stepScenario(page, 6);
    await capture("06-blocked-runtime-claim", page.locator(".rg-system__workbench"));
    await page.getByLabel("Select scenario").selectOption("missing_signal_evidence");
    await stepScenario(page, 5);
    await capture("07-missing-signal-evidence", page.locator(".rg-system__workbench"));
    await page.locator("#rg-scene-ho-det-001 .rg-walkthrough__scrubber li").nth(5).getByRole("button").click();
    await capture("08-ho-det-001-walkthrough", page.locator("#rg-scene-ho-det-001"));
    await capture("09-ai-authority-boundary", page.locator("#rg-scene-ai-authority"));
    await capture("10-truth-surfaces", page.locator("#rg-scene-truth-surfaces"));
    await page.locator(".rg-truth__toggle").click();
    await capture("11-forbidden-substitutions", page.locator("#rg-scene-truth-surfaces"));
    await capture("12-reviewer-console", page.locator("#rg-scene-reviewer-verification"));
    await capture("13-controls-constellation", page.locator("#rg-scene-controls-receipts"));
    await capture("14-closing-topology", page.locator("#rg-scene-closing"));
    await page.getByRole("button", { name: "Enter presentation mode" }).click();
    await page.getByRole("button", { name: "Go to System topology" }).click();
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await page.screenshot({ path: testInfo.outputPath("15-presentation-mode.png") });
    await page.getByRole("button", { name: "Exit" }).click();
    for (const viewport of [
      { name: "16-tablet-1024", width: 1024, height: 768 },
      { name: "17-tablet-768", width: 768, height: 1024 },
      { name: "18-mobile-390", width: 390, height: 844 },
    ]) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.evaluate(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
      await page.screenshot({ path: testInfo.outputPath(`${viewport.name}.png`), fullPage: true });
    }
  });

  test("internal reviewer routes resolve and the standalone podcast route stays removed", async ({ page, request }) => {
    await loadHome(page);
    const routes = await page.locator('a[href^="/"]').evaluateAll((links) => [...new Set(links.map((link) => (link as HTMLAnchorElement).getAttribute("href")!).filter(Boolean))]);
    for (const route of routes) {
      const response = await request.get(route);
      expect(response.status(), `${route} should resolve`).toBeLessThan(400);
    }
    expect((await request.get("/podcast/")).status()).toBe(404);
  });
});
