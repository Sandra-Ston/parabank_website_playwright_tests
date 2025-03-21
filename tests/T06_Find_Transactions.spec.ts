import { test, expect } from '@playwright/test';

test.describe("6. Find Transactions", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://parabank.parasoft.com/parabank/index.htm");

        await page.fill("input[name='username']", "AliceTestUser");
        await page.fill("input[name='password']", "TestPassword123");
        await page.click("input[value='Log In']");
        await expect(page.locator("text=Welcome Alice Right")).toBeVisible();

        await page.getByRole("link", { name: "Find Transactions" }).click();
        await expect(page).toHaveURL(/findtrans\.htm/);
        await expect(page.locator("#transactionForm")).toBeVisible();
    });


    test("Test Case 6.1: Verify Search Results Match The Entered Criteria - ID", async ({ page }) => {

        await page.getByRole("link", { name: "Accounts Overview" }).click();

        const firstTransaction = page.locator("table tbody tr td a").first();
        await firstTransaction.click();

        const fundsTransferLink = page.getByText("Funds Transfer Sent").first();
        await fundsTransferLink.click();

        const url = page.url();
        const transactionId = url.split("id=")[1];

        await page.getByRole("link", { name: "Find Transactions" }).click();
        await expect(page.locator("#transactionForm")).toBeVisible();

        await page.locator("#transactionId").fill(transactionId);
        await page.locator("#findById").click();

        await expect(page.getByText(transactionId)).toBeVisible();
    });


    test("Test Case 6.2: Validate Incorrect Search For Transaction By ID", async ({ page }) => {

        await page.locator("#transactionId").fill("qwerty");
        await page.locator("#findById").click();

        await expect(page.locator("#transactionIdError")).toContainText("Invalid transaction ID");
    });


    test("Test Case 6.3: Validate Empty Search For Transaction By ID", async ({ page }) => {

        await page.locator("#findById").click();
        await expect(page.locator("#transactionIdError")).toContainText("Invalid transaction ID");
    });


    test("Test Case 6.4: Verify Search Results Match The Entered Criteria - Date", async ({ page }) => {

        const today = new Date();
        const formattedDate = `${(today.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}-${today.getFullYear()}`;

        await page.locator("#transactionDate").fill(formattedDate);
        await page.locator("#findByDate").click();

        await expect(page.locator("#transactionTable")).toBeVisible();
        //getByRole('heading', { name: 'Transaction Results' })
        await expect(page.locator("#transactionTable")).toContainText(formattedDate);
        await expect(page.locator("#transactionTable")).toContainText("Funds Transfer Sent");
    });



    test("Test Case 6.5: Validate Incorrect Search For Transaction By Date", async ({ page }) => {

        await page.locator("#transactionDate").fill("99-99-9999");
        await page.locator("#findByDate").click();

        await expect(page.locator("#transactionDateError")).toContainText("Invalid date format");
    });

    test("Test Case 6.6: Validate Empty Search For Transaction by Date", async ({ page }) => {

        await page.locator("#findByDate").click();

        await expect(page.locator("#transactionDateError")).toContainText("Invalid date format");
    });

    test("Test Case 6.7: Verify Search Results Match The Entered Criteria - Date Range", async ({ page }) => {

        const today = new Date();
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(today.getDate() - 3);

        const formatDate = (date) => {
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");
            const year = date.getFullYear();
            return `${month}-${day}-${year}`;
        };

        const formattedToday = formatDate(today);
        const formattedThreeDaysAgo = formatDate(threeDaysAgo);

        await page.locator("#fromDate").fill(formattedThreeDaysAgo);
        await page.locator("#toDate").fill(formattedToday);
        await page.locator("#findByDateRange").click();

        await expect(page.locator("#transactionTable")).toBeVisible();
        await expect(page.locator("#transactionTable")).toContainText(formattedToday);
    });

    test("Test Case 6.8: Validate Incorrect Search For Transaction By Date Range", async ({ page }) => {

        await page.locator("#fromDate").fill("99-99-9999");
        await page.locator("#toDate").fill("99-99-9999");
        await page.locator("#findByDateRange").click();

        await expect(page.locator("#dateRangeError")).toContainText("Invalid date format");
    });

    test("Test Case 6.9: Validate Empty Search For Transaction by Date Range", async ({ page }) => {

        await page.locator("#findByDateRange").click();

        await expect(page.locator("#dateRangeError")).toContainText("Invalid date format");
    });

    test("Test Case 6.10: Verify Search Results Match The Entered Criteria - Amount", async ({ page }) => {

        await page.locator("#amount").fill("100.00");
        await page.locator("#findByAmount").click();

        await expect(page.locator("#transactionTable")).toBeVisible();
        await expect(page.locator("#transactionTable")).toContainText("Funds Transfer Received");
        await expect(page.getByRole('cell', { name: '$'})).toContainText("100.00");
    });

    test("Test Case 6.11: Validate Incorrect Search For Transaction By Amount", async ({ page }) => {

        await page.locator("#amount").fill("abcdef");
        await page.locator("#findByAmount").click();

        await expect(page.locator("#amountError")).toContainText("Invalid amount");
    });

    test("Test Case 6.12: Validate Empty Search For Transaction By Amount", async ({ page }) => {

        await page.locator("#findByAmount").click();

        await expect(page.locator("#amountError")).toContainText("Invalid amount");
    });
});