import { test, expect } from '@playwright/test';

test.describe("8. Request Loan", () => {

    test.beforeEach(async ({ page }) => {

        await page.goto("https://parabank.parasoft.com/parabank/index.htm");

        await page.fill("input[name='username']", "AliceTestUser");
        await page.fill("input[name='password']", "TestPassword123");
        await page.click("input[value='Log In']");
        await page.waitForTimeout(500);


        await page.getByRole("link", { name: "Request Loan" }).click();
        await expect(page).toHaveURL(/requestloan\.htm/);
    });

    test("Test Case 8.1: Validate Successful Loan Request", async ({ page }) => {

        await page.locator("#amount").fill("1000");
        await page.locator("#downPayment").fill("100");

        const account = await page.locator("#fromAccountId option").first().getAttribute("value");
        if (account) {
            await page.locator("#fromAccountId").selectOption(account);
        }

        await page.locator("input[value='Apply Now']").click();

        await expect(page.getByText("Loan Request Processed")).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Approved' })).toBeVisible();


        await page.getByRole('link', { name: /^\d+$/ }).click();
        await expect(page.getByText("Account Details")).toBeVisible();

        await page.getByRole("link", { name: "Accounts Overview" }).click();
        await expect(page).toHaveURL(/overview\.htm/);
        await expect(page.locator("#accountTable")).toBeVisible();
    });


    test("Test Case 8.2: Validate Unsuccessful Loan Request", async ({ page }) => {

        await page.locator("#amount").fill("100000000");
        await page.locator("#downPayment").fill("10");

        const account = await page.locator("#fromAccountId option").first().getAttribute("value");
        if (account) {
            await page.locator("#fromAccountId").selectOption(account);
        }

        await page.locator("input[value='Apply Now']").click();

        await expect(page.getByText("Loan Request Processed")).toBeVisible();
        await expect(page.getByText("Denied")).toBeVisible();
    });

    test("Test Case 8.3: Validate Empty Loan Request", async ({ page }) => {

        const account = await page.locator("#fromAccountId option").first().getAttribute("value");
        if (account) {
            await page.locator("#fromAccountId").selectOption(account);
        }

        await page.locator("input[value='Apply Now']").click();

        await expect(page.getByText("Loan amount is required")).toBeVisible();
        await expect(page.getByText("Down payment is required")).toBeVisible();
    });
});