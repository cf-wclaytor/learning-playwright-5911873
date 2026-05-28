import { test, expect } from '@playwright/test';


test.describe("Home page", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("Sign in", async ({ page }) => {
    
    // sign in
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");

  });

  test("Title", async ({ page }) => {

    // title
    await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0")

    // count
    const productGrid = page.locator(".col-md-9");
    await expect(productGrid.getByRole("link")).toHaveCount(9);
    expect(await productGrid.getByRole("link").count()).toBe(9);

  });

  test("Search", async ({ page }) => {
    // search
    await page.getByTestId("search-query").fill("thor hammer");
    await page.getByTestId("search-submit").click();
    await expect(page.getByTestId("search_completed")).toHaveCount(1);

    const result = page.locator(".card-img-top");
    await expect(result).toHaveAttribute("alt", "Thor Hammer");
  });


});

