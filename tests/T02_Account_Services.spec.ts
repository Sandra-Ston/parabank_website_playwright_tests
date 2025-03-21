import { test, expect } from '@playwright/test';

test.describe("2. Account Services", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://parabank.parasoft.com/parabank/index.htm");
        await expect(page.locator("body")).toBeVisible();
        await expect(page).toHaveURL(/parabank\.parasoft\.com\/parabank\/index\.htm/);

        await page.fill("input[name='username']", "AliceTestUser");
        await page.fill("input[name='password']", "TestPassword123");
        await page.click("input[value='Log In']");
        await expect(page.locator("text=Welcome Alice Right")).toBeVisible();
    });

    test("Test Case 2.1: Validate Open New Checking Account", async ({ page }) => {

        await page.locator("text=Open New Account").click();
        await expect(page).toHaveURL(/openaccount\.htm/);

        await page.selectOption("#type", "CHECKING");
        await page.selectOption("#fromAccountId", { index: 0 });

        await page.click('input[type="button"].button[value="Open New Account"]');

        await expect(page.locator("text=Account Opened!")).toBeVisible();
        await expect(page.locator("text=Congratulations, your account is now open.")).toBeVisible();

        await expect(page.locator("#newAccountId")).toBeVisible();
        await page.locator("#newAccountId").click();

        await expect(page.locator("text=Account Details")).toBeVisible();
        await expect(page.locator("text=Account Activity")).toBeVisible();

        await page.locator("text=Funds Transfer Received").click();
        await expect(page).toHaveURL(/transaction\.htm/);
        await expect(page.locator("text=Transaction Details")).toBeVisible();
    });

    test("Test Case 2.2: Validate Open New Savings Account", async ({ page }) => {

        await page.locator("text=Open New Account").click();
        await expect(page).toHaveURL(/openaccount\.htm/);

        await page.selectOption("#type", "SAVINGS");
        await page.selectOption("#fromAccountId", { index: 0 });

        await page.click('input[type="button"].button[value="Open New Account"]');

        await expect(page.locator("text=Account Opened!")).toBeVisible();
        await expect(page.locator("text=Congratulations, your account is now open.")).toBeVisible();

        await expect(page.locator("#newAccountId")).toBeVisible();
        await page.locator("#newAccountId").click();

        await expect(page.locator("text=Account Details")).toBeVisible();
        await expect(page.locator("text=Account Activity")).toBeVisible();

        await page.locator("text=Funds Transfer Received").click();
        await expect(page).toHaveURL(/transaction\.htm/);
        await expect(page.locator("text=Transaction Details")).toBeVisible();
    });
});