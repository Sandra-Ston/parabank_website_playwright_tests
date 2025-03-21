import { test, expect } from '@playwright/test';

test.describe("10. Customer Care", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://parabank.parasoft.com/parabank/index.htm");
        await page.waitForTimeout(500);
    });

    const contactDetails = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        message: "This is a test message.",
    };

    test("Test Case 10.1: Validate Successful Submission Of Customer Care Requests From Top Navigation", async ({ page }) => {

        await page.getByRole("link", { name: 'contact', exact: true }).click();

        await expect(page).toHaveURL(/.*contact.htm/);

        await page.locator('input[name="name"]').fill(contactDetails.name);
        await page.locator('input[name="email"]').fill(contactDetails.email);
        await page.locator('input[name="phone"]').fill(contactDetails.phone);
        await page.locator('textarea[name="message"]').fill(contactDetails.message);

        await page.getByRole("button", { name: "Send to Customer Care" }).click();

        await expect(page.locator("body")).toContainText(`Thank you ${contactDetails.name}`);
    });

    test("Test Case 10.2: Validate Successful Submission Of Customer Care Requests From Bottom Navigation", async ({ page }) => {

        await page.getByRole("link", { name: "Contact Us" }).click();

        await expect(page).toHaveURL(/.*contact.htm/);

        await page.locator('input[name="name"]').fill(contactDetails.name);
        await page.locator('input[name="email"]').fill(contactDetails.email);
        await page.locator('input[name="phone"]').fill(contactDetails.phone);
        await page.locator('textarea[name="message"]').fill(contactDetails.message);

        await page.getByRole("button", { name: "Send to Customer Care" }).click();

        await expect(page.locator("body")).toContainText(`Thank you ${contactDetails.name}`);
    });

    test("Test Case 10.3: Validate Empty Submission Of Customer Care Requests From Bottom Navigation", async ({ page }) => {

        await page.getByRole("link", { name: "Contact Us" }).click();

        await expect(page).toHaveURL(/.*contact.htm/);

        await page.getByRole("button", { name: "Send to Customer Care" }).click();

        await expect(page.locator("body")).toContainText("Name is required");
        await expect(page.locator("body")).toContainText("Email is required");
        await expect(page.locator("body")).toContainText("Phone is required");
        await expect(page.locator("body")).toContainText("Message is required");
    });
});