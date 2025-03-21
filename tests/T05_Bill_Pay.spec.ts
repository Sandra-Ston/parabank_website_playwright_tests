import { test, expect } from '@playwright/test';

test.describe("5. Bill Pay", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://parabank.parasoft.com/parabank/index.htm");

        await page.fill("input[name='username']", "AliceTestUser");
        await page.fill("input[name='password']", "TestPassword123");
        await page.click("input[value='Log In']");
        await expect(page.locator("text=Welcome Alice Right")).toBeVisible();

        await page.getByRole('link', { name: 'Bill Pay' }).click();
        await expect(page).toHaveURL(/billpay\.htm/);
        await expect(page.locator("text=Bill Payment Service")).toBeVisible();
    });

    test("Test Case 5.1: Validate Successful Bill Payment", async ({ page }) => {

        const payee = {
            name: "Rose Wrong",
            address: "456 Main St",
            city: "Calgary",
            state: "Alberta",
            zipCode: "T2P 2G7",
            phone: "9876543210",
            accountNumber: "123456789",
            amount: "50"
        };

        await page.fill("input[name='payee.name']", payee.name);
        await page.fill("input[name='payee.address.street']", payee.address);
        await page.fill("input[name='payee.address.city']", payee.city);
        await page.fill("input[name='payee.address.state']", payee.state);
        await page.fill("input[name='payee.address.zipCode']", payee.zipCode);
        await page.fill("input[name='payee.phoneNumber']", payee.phone);
        await page.fill("input[name='payee.accountNumber']", payee.accountNumber);
        await page.fill("input[name='verifyAccount']", payee.accountNumber);
        await page.fill("input[name='amount']", payee.amount);

        await page.click("input[value='Send Payment']");

        const paymentRegex = new RegExp(`Bill Payment to ${payee.name} in the amount of \\$?${payee.amount}(.00)? from account \\d+ was successful.`, "i");
        await expect(page.locator("text=Bill Payment Complete")).toBeVisible();
        await expect(page.getByText(paymentRegex)).toBeVisible();

        await page.getByRole('link', { name: 'Accounts Overview' }).click();
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL(/overview\.htm/);
        await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();

        const rowCount = await page.locator("#accountTable tbody tr").count();
        expect(rowCount).toBeGreaterThan(1);
    });

    test("Test Case 5.2: Validate Unsuccessful Bill Payment", async ({ page }) => {

        await page.fill("input[name='payee.name']", "Invalid Payee");
        await page.fill("input[name='payee.address.street']", "123 Fake St");
        await page.fill("input[name='payee.address.city']", "Nowhere");
        await page.fill("input[name='payee.address.state']", "ZZ");
        await page.fill("input[name='payee.address.zipCode']", "00000");
        await page.fill("input[name='payee.phoneNumber']", "1234567890");
        await page.fill("input[name='payee.accountNumber']", "999999");
        await page.fill("input[name='verifyAccount']", "999999");
        await page.fill("input[name='amount']", "- 500");

        await page.getByRole("button", { name: "Send Payment" }).click();

        await expect(page.getByText("Please enter a valid amount")).toBeVisible();
    });

    test("Test Case 5.3: Validate Empty Bill Payment", async ({ page }) => {

        await page.locator("input[value='Send Payment']").click();
        await page.waitForTimeout(500);

        await expect(page.getByText("Payee name is required.")).toBeVisible();
        await expect(page.getByText("Address is required.")).toBeVisible();
        await expect(page.getByText("City is required.")).toBeVisible();
        await expect(page.getByText("State is required.")).toBeVisible();
        await expect(page.getByText("Zip Code is required.")).toBeVisible();
        await expect(page.getByText("Phone number is required.")).toBeVisible();
        await expect(page.getByText("The amount cannot be empty")).toBeVisible();
    });
});