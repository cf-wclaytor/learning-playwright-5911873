import { test as setup, expect } from "@playwright/test";

setup("create cust 01 auth", async ({ page, context }) => {

  const email = "customer@practicesoftwaretesting.com";
  const password = "welcome01";
  const cust01AuthFile = ".auth/cust01.json";

  await page.goto("http://host.docker.internal:4200/auth/login");
  await page.waitForLoadState("networkidle");

  // The Angular app calls localhost:8091 for its API, but inside this container
  // localhost is the container itself. Reroute to host.docker.internal.
  await page.route("**/localhost:8091/**", (route) => {
    const url = route.request().url().replace("localhost", "host.docker.internal");
    route.continue({ url });
  });

  // email
  await page.getByTestId("email").click();
  await page.getByTestId("email").fill(email);

  // password
  await page.getByTestId("password").click();
  await page.getByTestId("password").fill(password);

  // click login
  await page.getByTestId("login-submit").click();

  await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
});