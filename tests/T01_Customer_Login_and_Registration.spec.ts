import { test, expect } from '@playwright/test';

test.describe("1. Customer Login and Registration", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://parabank.parasoft.com/parabank/index.htm");
        await expect(page.locator("body")).toBeVisible();
        await expect(page).toHaveURL(/parabank\.parasoft\.com\/parabank\/index\.htm/);
        await page.waitForTimeout(500);
    });

    test("Test Case 1.1: Validate New Customer Registration", async ({ page }) => {

        const registerLink = page.locator("text=Register");
        await expect(registerLink).toBeVisible();
        await registerLink.click();

        await expect(page.locator("text=Signing up is easy!")).toBeVisible();

        await page.fill("input[name='customer.firstName']", "Alice");
        await page.fill("input[name='customer.lastName']", "Right");
        await page.fill("input[name='customer.address.street']", "123 Test Street");
        await page.fill("input[name='customer.address.city']", "Red Deer");
        await page.fill("input[name='customer.address.state']", "Alberta");
        await page.fill("input[name='customer.address.zipCode']", "T4E 0B2");
        await page.fill("input[name='customer.phoneNumber']", "+1234567890");
        await page.fill("input[name='customer.ssn']", "123456789");
        await page.fill("input[name='customer.username']", "AliceTestUser");
        await page.fill("input[name='customer.password']", "TestPassword123");
        await page.fill("input[name='repeatedPassword']", "TestPassword123");

        await page.click("input[value='Register']");

        await expect(page.locator("text=Welcome AliceTestUser")).toBeVisible();
    });

    test("Test Case 1.2: Validate Customer Login with Valid Credentials", async ({ page }) => {

        await page.fill("input[name='username']", "AliceTestUser");
        await page.fill("input[name='password']", "TestPassword123");
        await page.waitForTimeout(500);

        await page.click("input[value='Log In']");

        await expect(page.locator(`text=Welcome Alice Right`)).toBeVisible();
    });

    test("Test Case 1.3: Verify Customer Login with Invalid Credentials", async ({ page }) => {

        await page.fill("input[name='username']", "InvalidUser");
        await page.fill("input[name='password']", "WrongPassword");

        await page.click("input[value='Log In']");

        await expect(page.locator("text=Error!")).toBeVisible();
        await expect(
            page.locator("text=The username and password could not be verified.")
        ).toBeVisible();
    });

    test("Test Case 1.4: Verify Login Customer Just With Username", async ({ page }) => {

        await page.fill("input[name='username']", "AliceTestUser");

        await page.click("input[value='Log In']");

        await expect(page.locator("text=Please enter a username and password.")).toBeVisible();
    });

    test("Test Case 1.5: Validate Password Recovery", async ({ page }) => {

        const forgotLoginLink = page.locator("text=Forgot login info?");
        await expect(forgotLoginLink).toBeVisible();
        await forgotLoginLink.click();

        await page.fill("input[name='firstName']", "Alice");
        await page.fill("input[name='lastName']", "Right");
        await page.fill("input[name='address.street']", "123 Test Street");
        await page.fill("input[name='address.city']", "Red Deer");
        await page.fill("input[name='address.state']", "Alberta");
        await page.fill("input[name='address.zipCode']", "T4E 0B2");
        await page.fill("input[name='ssn']", "123456789");

        await page.click("input[value='Find My Login Info']");

        await expect(page.locator("text=Your login information was located successfully. You are now logged in.")).toBeVisible();
    });

    test("Test Case 1.6: Verify Password Recovery with Invalid Credentials", async ({ page }) => {

        const forgotLoginLink = page.locator("text=Forgot login info?");
        await expect(forgotLoginLink).toBeVisible();
        await forgotLoginLink.click();

        await page.fill("input[name='firstName']", "Rose");
        await page.fill("input[name='lastName']", "Wrong");
        await page.fill("input[name='address.street']", "Fake Street");
        await page.fill("input[name='address.city']", "Nowhere");
        await page.fill("input[name='address.state']", "Unknown");
        await page.fill("input[name='address.zipCode']", "00000");
        await page.fill("input[name='ssn']", "999999999");

        await page.click("input[value='Find My Login Info']");

        await expect(page.locator("text=The customer information provided could not be found.")).toBeVisible();
    });

    test("Test Case 1.7: Verify Password Recovery with Empty Credentials", async ({ page }) => {

        const forgotLoginLink = page.locator("text=Forgot login info?");
        await expect(forgotLoginLink).toBeVisible();
        await forgotLoginLink.click();

        await page.click("input[value='Find My Login Info']");

        const requiredFields = [
            "First name is required.",
            "Last name is required.",
            "Address is required.",
            "City is required.",
            "State is required.",
            "Zip Code is required.",
            "Social Security Number is required",
        ];

        for (const error of requiredFields) {
            await expect(page.locator(`text=${error}`)).toBeVisible();
        }
    });
});

