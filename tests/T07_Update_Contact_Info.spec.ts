import { test, expect } from '@playwright/test';

test.describe("7. Update Contact Info", () => {
    test.beforeEach(async ({ page }) => {

        await page.goto("https://parabank.parasoft.com/parabank/index.htm");

        await page.fill("input[name='username']", "AliceTestUser");
        await page.fill("input[name='password']", "TestPassword123");
        await page.click("input[value='Log In']");
        await page.waitForTimeout(500);


        await page.getByRole('link', { name: 'Update Contact Info' }).click();
        await expect(page).toHaveURL(/updateprofile\.htm/);
        await expect(page.getByRole('heading', { name: 'Update Profile' })).toBeVisible();
        await page.waitForTimeout(500);
    });

    test("Test Case 7.1: Validate Successful Contact Info Update", async ({ page }) => {

        await page.locator("input[name='customer.address.street']").fill("456 Updated St");
        await page.locator("input[name='customer.address.city']").fill("Updated City");
        await page.locator("input[name='customer.address.state']").fill("Updated State");
        await page.locator("input[name='customer.address.zipCode']").fill("12345");
        await page.locator("input[name='customer.phoneNumber']").fill("1112223333");

        await page.locator("input[value='Update Profile']").click();

        await expect(page.getByText("Profile Updated")).toBeVisible();
        await expect(page.getByText("Your updated address and phone number have been added to the system.")).toBeVisible();
    });

    test("Test Case 7.2: Validate Empty Contact Info Update", async ({ page }) => {

        await page.locator("input[name='customer.firstName']").clear();
        await page.locator("input[name='customer.lastName']").clear();
        await page.locator("input[name='customer.address.street']").clear();
        await page.locator("input[name='customer.address.city']").clear();
        await page.locator("input[name='customer.address.state']").clear();
        await page.locator("input[name='customer.address.zipCode']").clear();
        await page.locator("input[name='customer.phoneNumber']").clear();

        await page.locator("input[value='Update Profile']").click();

        await expect(page.getByText("Last name is required")).toBeVisible();
        await expect(page.getByText("Address is required")).toBeVisible();
        await expect(page.getByText("City is required")).toBeVisible();
        await expect(page.getByText("State is required")).toBeVisible();
        await expect(page.getByText("Zip Code is required")).toBeVisible();
        await expect(page.getByText("Phone number is required")).toBeVisible();
    });
});