import { expect, test } from "@playwright/test";

test.describe("about page tabs", () => {
  test("loads with correct heading", async ({ page }) => {
    await page.goto("/about");
    await expect(
      page.getByRole("heading", { name: /An invite-only hub for innovation/i })
    ).toBeVisible();
  });

  test("displays both tab buttons", async ({ page }) => {
    await page.goto("/about");
    await expect(
      page.getByRole("button", { name: "MEET THE TEAM" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "MAPPING LEADERS" })
    ).toBeVisible();
  });

  test("shows team content by default", async ({ page }) => {
    await page.goto("/about");
    // Default tab is "team" - should show leader cards
    await expect(page.getByText("Jane Doe")).toBeVisible();
    await expect(page.getByText("John Smith")).toBeVisible();
  });

  test("switching to MAPPING LEADERS tab shows placeholder", async ({
    page,
  }) => {
    await page.goto("/about");
    await page.getByRole("button", { name: "MAPPING LEADERS" }).click();
    await expect(page.getByText("Map coming soon.")).toBeVisible();
    // Team content should be hidden
    await expect(page.getByText("Jane Doe")).not.toBeVisible();
  });

  test("switching back to MEET THE TEAM tab shows team content", async ({
    page,
  }) => {
    await page.goto("/about");
    // Go to map tab first
    await page.getByRole("button", { name: "MAPPING LEADERS" }).click();
    await expect(page.getByText("Map coming soon.")).toBeVisible();

    // Switch back to team tab
    await page.getByRole("button", { name: "MEET THE TEAM" }).click();
    await expect(page.getByText("Jane Doe")).toBeVisible();
    await expect(page.getByText("Map coming soon.")).not.toBeVisible();
  });

  test("team tab displays leader cards with contact buttons", async ({
    page,
  }) => {
    await page.goto("/about");
    // Verify contact links exist (mailto links)
    const contactLinks = page.getByRole("link", { name: "CONTACT" });
    await expect(contactLinks.first()).toBeVisible();
    // There should be multiple contact buttons (one per leader)
    const count = await contactLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test("team tab displays all leaders", async ({ page }) => {
    await page.goto("/about");
    // Check for all leaders from data/leaders.ts
    await expect(page.getByText("Jane Doe")).toBeVisible();
    await expect(page.getByText("John Smith")).toBeVisible();
    await expect(page.getByText("Alex Chen")).toBeVisible();
    await expect(page.getByText("Maya Patel")).toBeVisible();
    await expect(page.getByText("Ryan Kim")).toBeVisible();
    await expect(page.getByText("Sophia Lee")).toBeVisible();
    await expect(page.getByText("Sharad Aggarwal")).toBeVisible();
  });
});
