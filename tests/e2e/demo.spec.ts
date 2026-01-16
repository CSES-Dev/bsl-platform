import { expect, test } from "@playwright/test";

test("Navigates to demo page and checks if an item was populated properly", async ({ page }) => {
    await page.goto("/demo");
    // Make sure that the 'Smartphone X Pro' text is on screen
    await expect(page.getByText("Smartphone X Pro")).toBeVisible();
});
