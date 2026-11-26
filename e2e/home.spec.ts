import { test, expect } from "@playwright/test";

test.describe("FaceAttend.AI Critical Paths", () => {
  test("loads the landing page with cosmic hero section and correct headings", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/FaceAttend\.AI/);
    await expect(page.getByRole("heading", { level: 1, name: /FaceAttend/i })).toBeVisible();
    await expect(page.getByText(/Attendance automation/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /Discover the Solution/i })).toBeVisible();
  });

  test("navigates to privacy policy and back to home", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByRole("heading", { level: 1, name: /Privacy/i })).toBeVisible();
    await page.click("text=Back to FaceAttend.AI");
    await expect(page).toHaveURL(/\/$/);
  });

  test("navigates to terms page and back to home", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.getByRole("heading", { level: 1, name: /Terms/i })).toBeVisible();
    await page.click("text=Back to FaceAttend.AI");
    await expect(page).toHaveURL(/\/$/);
  });

  test("validates and submits the contact inquiry form", async ({ page }) => {
    await page.goto("/");
    await page.fill('input[name="name"]', "Test Institution");
    await page.fill('input[name="email"]', "test@institution.edu");
    await page.fill('textarea[name="message"]', "Looking to pilot FaceAttend.AI on campus.");
    await page.click('button[type="submit"]:has-text("Send Message")');
    await expect(
      page.getByText(/Your message has been received|Message received/i),
    ).toBeVisible({ timeout: 10_000 });
  });
});
