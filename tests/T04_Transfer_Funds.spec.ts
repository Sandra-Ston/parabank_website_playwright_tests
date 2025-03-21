import { test, expect } from '@playwright/test';

test.describe("4. Transfer Funds", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://parabank.parasoft.com/parabank/index.htm");
        await expect(page.locator("body")).toBeVisible();
        await expect(page).toHaveURL(/parabank\.parasoft\.com\/parabank\/index\.htm/);

        await page.fill("input[name='username']", "AliceTestUser");
        await page.fill("input[name='password']", "TestPassword123");
        await page.click("input[value='Log In']");
        await expect(page.locator("text=Welcome Alice Right")).toBeVisible();
    });

    test("Test Case 4.1: Validate Successful Fund Transfers", async ({ page }) => {

        await page.locator("text=Transfer Funds").click();
        await expect(page).toHaveURL(/transfer\.htm/);
        await expect(page.getByRole('heading', { name: 'Transfer Funds' })).toBeVisible();

        const transferAmount = '100';
        await page.fill("#amount", transferAmount);

        const fromAccountOption = page.locator("#fromAccountId option").first();
        const fromAccount = await fromAccountOption.getAttribute("value");
        await page.selectOption("#fromAccountId", fromAccount);

        const toAccountOption = page.locator("#toAccountId option").last();
        const toAccount = await toAccountOption.getAttribute("value");
        await page.selectOption("#toAccountId", toAccount);

        await page.click('input[value="Transfer"]');

        await expect(page.locator("text=Transfer Complete!")).toBeVisible();

        const transferRegex = new RegExp(`\\$${transferAmount}\\.00 has been transferred from account #${fromAccount} to account #${toAccount}`, 'i');
        await expect(page.getByText(transferRegex)).toBeVisible({ timeout: 1000 });

        await page.getByRole('link', { name: 'Accounts Overview' }).click();
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL(/overview\.htm/);
        await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();

        await expect(page.locator("#accountTable")).toBeVisible();
        const rowCount = await page.locator("#accountTable tbody tr").count();
        expect(rowCount).toBeGreaterThan(1);
    });
});