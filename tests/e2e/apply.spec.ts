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

test("startup application submit button is enabled when only required fields are filled", async ({
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

// Team Application Tests
test("team application form loads correctly", async ({ page }) => {
  await page.goto("/apply/team");

  // Verify form elements are present
  await expect(
    page.getByRole("heading", { name: "Team Application" })
  ).toBeVisible();
  await expect(page.locator("#submitterName")).toBeVisible();
  await expect(page.locator("#submitterEmail")).toBeVisible();
  await expect(page.locator("#teamName")).toBeVisible();
  await expect(page.locator("#teamSize")).toBeVisible();
  await expect(page.locator("#skills")).toBeVisible();
  await expect(page.locator("#projectPreferences")).toBeVisible();
  await expect(page.locator("#description")).toBeVisible();
  await expect(page.getByRole("button", { name: "Apply" })).toBeVisible();
});

test("team application form can be filled", async ({ page }) => {
  await page.goto("/apply/team");

  // Fill form fields
  await page.fill("#submitterName", "John Doe");
  await page.fill("#submitterEmail", "john@example.com");
  await page.fill("#teamName", "Test Team");
  await page.fill("#teamSize", "4");
  await page.fill("#skills", "React, Node.js, Python");
  await page.fill("#projectPreferences", "Web apps, AI/ML");
  await page.fill("#description", "A talented team for E2E testing");

  // Verify values were entered
  await expect(page.locator("#teamName")).toHaveValue("Test Team");
  await expect(page.locator("#submitterEmail")).toHaveValue("john@example.com");
});

test("team application submit button is enabled when required fields are filled", async ({
  page,
}) => {
  await page.goto("/apply/team");

  // Fill required form fields
  await page.fill("#submitterName", "John Doe");
  await page.fill("#submitterEmail", "john@example.com");
  await page.fill("#teamName", "Test Team");
  await page.fill("#teamSize", "4");
  await page.fill("#skills", "React, Node.js");
  await page.fill("#projectPreferences", "Web apps");
  await page.fill("#description", "A talented team for E2E testing");

  // Verify submit button is enabled
  const submitButton = page.getByRole("button", { name: "Apply" });
  await expect(submitButton).toBeEnabled();
});

// Organization Application Tests
test("organization application form loads correctly", async ({ page }) => {
  await page.goto("/apply/organization");

  // Verify form elements are present
  await expect(
    page.getByRole("heading", { name: "New Company Project" })
  ).toBeVisible();
  await expect(page.locator("#submitterName")).toBeVisible();
  await expect(page.locator("#submitterEmail")).toBeVisible();
  await expect(page.locator("#companyName")).toBeVisible();
  await expect(page.locator("#projectTitle")).toBeVisible();
  await expect(page.locator("#budget")).toBeVisible();
  await expect(page.locator("#skillsNeeded")).toBeVisible();
  await expect(page.locator("#description")).toBeVisible();
  await expect(page.getByRole("button", { name: "Apply" })).toBeVisible();
});

test("organization application form can be filled", async ({ page }) => {
  await page.goto("/apply/organization");

  // Fill form fields
  await page.fill("#submitterName", "Jane Smith");
  await page.fill("#submitterEmail", "jane@company.com");
  await page.fill("#companyName", "Test Corp");
  await page.fill("#projectTitle", "E2E Test Project");
  await page.fill("#budget", "$50,000");
  await page.fill("#skillsNeeded", "React, UI/UX Design");
  await page.fill("#description", "A test project for E2E testing");

  // Verify values were entered
  await expect(page.locator("#companyName")).toHaveValue("Test Corp");
  await expect(page.locator("#submitterEmail")).toHaveValue("jane@company.com");
});

test("organization application submit button is enabled when required fields are filled", async ({
  page,
}) => {
  await page.goto("/apply/organization");

  // Fill required form fields
  await page.fill("#submitterName", "Jane Smith");
  await page.fill("#submitterEmail", "jane@company.com");
  await page.fill("#companyName", "Test Corp");
  await page.fill("#projectTitle", "E2E Test Project");
  await page.fill("#budget", "$50,000");
  await page.fill("#skillsNeeded", "React, UI/UX Design");
  await page.fill("#description", "A test project for E2E testing");

  // Verify submit button is enabled
  const submitButton = page.getByRole("button", { name: "Apply" });
  await expect(submitButton).toBeEnabled();
});
