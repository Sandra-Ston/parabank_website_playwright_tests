import { test, expect } from '@playwright/test';
import AxeBuilder from "@axe-core/playwright";

test.describe("11. Website Performance and Usability", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://parabank.parasoft.com/parabank/index.htm");
    });

        test("Test Case 11.1: Verify Mobile Responsiveness", async ({ page }) => {
            // viewport to iPhone 6 size (375x667)
            await page.setViewportSize({ width: 375, height: 667 });

            await expect(page.locator("#headerPanel")).toBeVisible();

            const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
            expect(accessibilityScanResults.violations).toHaveLength(0);
        });

        test("Test Case 11.2: Verify Tablet Responsiveness", async ({ page }) => {
            // viewport to iPad 2 size (768x1024)
            await page.setViewportSize({ width: 768, height: 1024 });

            await expect(page.locator("#headerPanel")).toBeVisible();

            const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
            expect(accessibilityScanResults.violations).toHaveLength(0);
        });
});

