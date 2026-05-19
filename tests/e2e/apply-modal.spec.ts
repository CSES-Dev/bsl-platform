import { expect, test } from "@playwright/test";

test.describe("apply modal flow", () => {
  test("opens startup application modal when clicking startup card", async ({
    page,
  }) => {
    await page.goto("/apply");
    await page.getByText("STARTUP").first().click();
    await expect(
      page.getByRole("heading", { name: "STARTUP APPLICATION" })
    ).toBeVisible();
  });

  test("opens org application modal when clicking org card", async ({
    page,
  }) => {
    await page.goto("/apply");
    await page.getByText("ORG/COMPANY").first().click();
    await expect(
      page.getByRole("heading", { name: "ORG/COMPANY PROJECT FORM" })
    ).toBeVisible();
  });

  test("opens team application modal when clicking team card", async ({
    page,
  }) => {
    await page.goto("/apply");
    await page.getByText("STUDENT/PRODUCT").first().click();
    await expect(
      page.getByRole("heading", { name: "STUDENT/PRODUCT TEAM SKILLS FORM" })
    ).toBeVisible();
  });

  test("closes modal when clicking X button", async ({ page }) => {
    await page.goto("/apply");
    await page.getByText("STARTUP").first().click();
    await expect(
      page.getByRole("heading", { name: "STARTUP APPLICATION" })
    ).toBeVisible();

    // Click the X button (SVG close button in modal header)
    await page.locator(".fixed button svg").click();
    await expect(
      page.getByRole("heading", { name: "STARTUP APPLICATION" })
    ).not.toBeVisible();
  });

  test("closes modal when clicking backdrop", async ({ page }) => {
    await page.goto("/apply");
    await page.getByText("STARTUP").first().click();
    await expect(
      page.getByRole("heading", { name: "STARTUP APPLICATION" })
    ).toBeVisible();

    // Click the backdrop (the outer fixed div) at a corner position
    await page.locator(".fixed.inset-0").click({ position: { x: 10, y: 10 } });
    await expect(
      page.getByRole("heading", { name: "STARTUP APPLICATION" })
    ).not.toBeVisible();
  });

  test("can fill and submit startup form in modal", async ({ page }) => {
    await page.goto("/apply");
    await page.getByText("STARTUP").first().click();
    await expect(
      page.getByRole("heading", { name: "STARTUP APPLICATION" })
    ).toBeVisible();

    // Fill required fields
    await page.fill("#submitterName", "Test User");
    await page.fill("#submitterEmail", "test@example.com");
    await page.fill("#name", "Test Startup Inc");
    await page.fill("#description", "A test startup description for E2E testing");
    await page.fill("#deckUrl", "https://example.com/deck.pdf");
    await page.fill("#fundingGoal", "500000");

    // Submit
    await page.getByRole("button", { name: /apply/i }).click();

    // Verify success message
    await expect(
      page.getByText("Application submitted successfully!")
    ).toBeVisible();

    // Verify modal closes after delay (1500ms + buffer)
    await expect(
      page.getByRole("heading", { name: "STARTUP APPLICATION" })
    ).not.toBeVisible({ timeout: 3000 });
  });

  test("can fill and submit org form in modal", async ({ page }) => {
    await page.goto("/apply");
    await page.getByText("ORG/COMPANY").first().click();
    await expect(
      page.getByRole("heading", { name: "ORG/COMPANY PROJECT FORM" })
    ).toBeVisible();

    // Fill required fields
    await page.fill("#submitterName", "Jane Smith");
    await page.fill("#submitterEmail", "jane@company.com");
    await page.fill("#companyName", "Test Corp");
    await page.fill("#projectTitle", "E2E Test Project");
    await page.fill("#budget", "$50,000");
    await page.fill("#skillsNeeded", "React, Node.js");
    await page.fill("#description", "A test project description for E2E testing");
    // Fill optional websiteUrl to avoid validation error (empty string fails url() validation)
    await page.fill("#websiteUrl", "https://example.com");

    // Submit
    await page.getByRole("button", { name: /apply/i }).click();

    // Verify success message
    await expect(
      page.getByText("Application submitted successfully!")
    ).toBeVisible({ timeout: 10000 });
  });

  test("can fill and submit team form in modal", async ({ page }) => {
    await page.goto("/apply");
    await page.getByText("STUDENT/PRODUCT").first().click();
    await expect(
      page.getByRole("heading", { name: "STUDENT/PRODUCT TEAM SKILLS FORM" })
    ).toBeVisible();

    // Fill required fields
    await page.fill("#submitterName", "John Doe");
    await page.fill("#submitterEmail", "john@example.com");
    await page.fill("#teamName", "Test Team");
    await page.fill("#teamSize", "4");
    await page.fill("#skills", "React, Node.js");
    await page.fill("#projectPreferences", "Web apps");
    await page.fill("#description", "A talented team description for E2E testing");
    // Fill optional websiteUrl to avoid validation error (empty string fails url() validation)
    await page.fill("#websiteUrl", "https://example.com");

    // Submit
    await page.getByRole("button", { name: /apply/i }).click();

    // Verify success message
    await expect(
      page.getByText("Application submitted successfully!")
    ).toBeVisible({ timeout: 10000 });
  });
});
