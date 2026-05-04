import { expect, test } from "@playwright/test";

test("startup application form loads correctly", async ({ page }) => {
  await page.goto("/apply/startup");

  // Verify form elements are present
  await expect(
    page.getByRole("heading", { name: "Startup Application" })
  ).toBeVisible();
  await expect(page.locator("#name")).toBeVisible();
  await expect(page.locator("#description")).toBeVisible();
  await expect(page.locator("#deckUrl")).toBeVisible();
  await expect(page.locator("#fundingGoal")).toBeVisible();
  await expect(page.locator("#fundingSiteUrl")).toBeVisible();
  await expect(page.locator("#contact")).toBeVisible();
  await expect(page.getByRole("button", { name: "Apply" })).toBeVisible();
});

test("startup application form can be filled", async ({ page }) => {
  await page.goto("/apply/startup");

  // Fill form fields
  await page.fill("#name", "Test Startup Inc");
  await page.fill("#description", "A test startup for E2E testing");
  await page.fill("#deckUrl", "https://example.com/deck.pdf");
  await page.fill("#fundingGoal", "500000");
  await page.fill("#fundingSiteUrl", "https://example.com/funding");
  await page.fill("#contact", "test@example.com");

  // Verify values were entered
  await expect(page.locator("#name")).toHaveValue("Test Startup Inc");
  await expect(page.locator("#contact")).toHaveValue("test@example.com");
});

test("startup application submit button is clickable when form is filled", async ({
  page,
}) => {
  await page.goto("/apply/startup");

  // Fill required form fields
  await page.fill("#name", "Test Startup Inc");
  await page.fill("#description", "A test startup for E2E testing");
  await page.fill("#deckUrl", "https://example.com/deck.pdf");
  await page.fill("#fundingGoal", "500000");
  await page.fill("#contact", "test@example.com");

  // Verify submit button is enabled and clickable
  const submitButton = page.getByRole("button", { name: "Apply" });
  await expect(submitButton).toBeEnabled();
});
