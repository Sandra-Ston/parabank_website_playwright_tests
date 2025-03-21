import { test, expect } from '@playwright/test';

test.describe("9. Log Out", () => {

    test.beforeEach(async ({ page }) => {

        await page.goto("https://parabank.parasoft.com/parabank/index.htm");

        await page.fill("input[name='username']", "AliceTestUser");
        await page.fill("input[name='password']", "TestPassword123");
        await page.click("input[value='Log In']");
    });

    test("Test Case 9.1: Validate Customer Log Out", async ({ page }) => {

        await page.getByRole("link", { name: "Log Out" }).click();

        await expect(page.getByRole("heading", { name: "Customer Login" })).toBeVisible();
    });
});