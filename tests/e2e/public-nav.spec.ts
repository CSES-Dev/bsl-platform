import { expect, test } from "@playwright/test";

test.describe("public pages navigation", () => {
  test("home page loads", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /BIG STRATEGY LABS/i, level: 1 })
    ).toBeVisible();
  });

  test("about page loads", async ({ page }) => {
    await page.goto("/about");
    await expect(
      page.getByRole("heading", { name: /Our Mission/i })
    ).toBeVisible();
  });

  test("leaders page loads", async ({ page }) => {
    await page.goto("/leaders");
    // Check for the main heading text that spans multiple lines
    await expect(
      page.getByRole("heading", { name: /We are the people/i })
    ).toBeVisible();
  });

  test("events page loads", async ({ page }) => {
    await page.goto("/events");
    await expect(page.getByRole("heading", { name: /Events/i })).toBeVisible();
  });

  test("apply page loads", async ({ page }) => {
    await page.goto("/apply");
    await expect(
      page.getByRole("heading", { name: /Apply to Join/i })
    ).toBeVisible();
  });
});
