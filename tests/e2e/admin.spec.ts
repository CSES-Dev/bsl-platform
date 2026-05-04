import { expect, test } from "@playwright/test";

test("redirects unauthenticated users from admin dashboard", async ({
  page,
}) => {
  await page.goto("/admin");

  // Should redirect to login or access-denied page (depends on auth state)
  await expect(page).toHaveURL(/\/admin\/(login|access-denied)/);
});

test("admin login page shows Google sign-in button", async ({ page }) => {
  await page.goto("/admin/login");

  await expect(
    page.getByRole("button", { name: /sign in with google/i })
  ).toBeVisible();
});

test("admin login page displays correct heading", async ({ page }) => {
  await page.goto("/admin/login");

  await expect(page.getByText("Admin Login")).toBeVisible();
  await expect(page.getByText("Sign in to access the dashboard")).toBeVisible();
});
