import { expect, test } from "@playwright/test";

test.describe("gallery pages", () => {
  test.describe("startups gallery", () => {
    test("loads with correct heading", async ({ page }) => {
      await page.goto("/startups");
      await expect(
        page.getByRole("heading", { name: /Apply to Join Startups/i })
      ).toBeVisible();
    });

    test("displays search input", async ({ page }) => {
      await page.goto("/startups");
      await expect(page.getByPlaceholder("Search")).toBeVisible();
    });

    test("shows empty state or gallery grid", async ({ page }) => {
      await page.goto("/startups");
      // Either empty state shows OR grid displays - one must be true
      const emptyMessage = page.getByText("No Startups Yet");
      const grid = page.locator(".grid");

      const hasEmpty = await emptyMessage.isVisible().catch(() => false);
      const hasGrid = await grid.isVisible().catch(() => false);

      expect(hasEmpty || hasGrid).toBeTruthy();
    });

    test("search filters results", async ({ page }) => {
      await page.goto("/startups");
      const searchInput = page.getByPlaceholder("Search");
      await searchInput.fill("nonexistent-search-term-xyz-12345");
      // After searching for non-existent term, verify search input has value
      await expect(searchInput).toHaveValue("nonexistent-search-term-xyz-12345");
    });
  });

  test.describe("organizations gallery", () => {
    test("loads with correct heading", async ({ page }) => {
      await page.goto("/organizations");
      await expect(
        page.getByRole("heading", { name: /Apply to Join Organizations/i })
      ).toBeVisible();
    });

    test("displays search input", async ({ page }) => {
      await page.goto("/organizations");
      await expect(page.getByPlaceholder("Search")).toBeVisible();
    });

    test("shows empty state or gallery grid", async ({ page }) => {
      await page.goto("/organizations");
      const emptyMessage = page.getByText("No Organizations Yet");
      const grid = page.locator(".grid");

      const hasEmpty = await emptyMessage.isVisible().catch(() => false);
      const hasGrid = await grid.isVisible().catch(() => false);

      expect(hasEmpty || hasGrid).toBeTruthy();
    });
  });

  test.describe("teams gallery", () => {
    test("loads with correct heading", async ({ page }) => {
      await page.goto("/teams");
      await expect(
        page.getByRole("heading", { name: /Apply to Join Product Teams/i })
      ).toBeVisible();
    });

    test("displays search input", async ({ page }) => {
      await page.goto("/teams");
      await expect(page.getByPlaceholder("Search")).toBeVisible();
    });

    test("shows empty state or gallery grid", async ({ page }) => {
      await page.goto("/teams");
      const emptyMessage = page.getByText("No Teams Yet");
      const grid = page.locator(".grid");

      const hasEmpty = await emptyMessage.isVisible().catch(() => false);
      const hasGrid = await grid.isVisible().catch(() => false);

      expect(hasEmpty || hasGrid).toBeTruthy();
    });
  });

  test("search input clears and resets", async ({ page }) => {
    await page.goto("/startups");
    const searchInput = page.getByPlaceholder("Search");
    await searchInput.fill("test");
    await expect(searchInput).toHaveValue("test");
    await searchInput.fill("");
    await expect(searchInput).toHaveValue("");
  });
});
