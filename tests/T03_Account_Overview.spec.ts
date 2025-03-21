import { test, expect } from '@playwright/test';

test.describe("3. Account Overview", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://parabank.parasoft.com/parabank/index.htm");
        await expect(page.locator("body")).toBeVisible();
        await expect(page).toHaveURL(/parabank\.parasoft\.com\/parabank\/index\.htm/);

        await page.fill("input[name='username']", "AliceTestUser");
        await page.fill("input[name='password']", "TestPassword123");
        await page.click("input[value='Log In']");
        await expect(page.locator("text=Welcome Alice Right")).toBeVisible();
    });

    test("Test Case 3.1: Verify Account Details Load Correctly", async ({ page }) => {

        await page.getByRole('link', { name: 'Accounts Overview' }).click();
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL(/overview\.htm/);

        await expect(page.locator("#accountTable")).toBeVisible();

        await expect(page.locator("#accountTable > thead > tr > th:nth-child(1)")).toHaveText(/Account/);
        await expect(page.locator("#accountTable > thead > tr > th:nth-child(2)")).toHaveText(/Balance/);
        await expect(page.locator("#accountTable > thead > tr > th:nth-child(3)")).toHaveText(/Available Amount/);

        await page.locator("#accountTable > tbody > tr:nth-child(1) > td:nth-child(1) > a").click();

        await expect(page.locator("text=Account Details")).toBeVisible();
        await expect(page.locator("text=Account Activity")).toBeVisible();

        await page.getByRole('link', { name: 'Funds Transfer Sent' }).first().click();
        await expect(page).toHaveURL(/transaction\.htm/);
        await expect(page.locator("text=Transaction Details")).toBeVisible();
    });
});