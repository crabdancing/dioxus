// @ts-check
const { test, expect } = require("@playwright/test");

test("hydration", async ({ page }) => {
  await page.goto("http://localhost:3333");

  // Expect the page to contain the pending text.
  const main = page.locator("#main");
  await expect(main).toContainText("Server said: ...");

  // Expect the page to contain the counter text.
  await expect(main).toContainText("hello axum! 12345");
  // Expect the title to contain the counter text.
  await expect(page).toHaveTitle("hello axum! 12345");

  // Click the increment button.
  let button = page.locator("button.increment-button");
  await button.click();

  // Click the server button.
  let serverButton = page.locator("button.server-button");
  await serverButton.click();

  // Expect the page to contain the updated counter text.
  await expect(main).toContainText("hello axum! 12346");
  // Expect the title to contain the updated counter text.
  await expect(page).toHaveTitle("hello axum! 12346");

  // Expect the page to contain the updated counter text.
  await expect(main).toContainText("Server said: Hello from the server!");

  // Make sure the error that was thrown on the server is shown in the error boundary on the client
  const errors = page.locator("#errors");
  await expect(errors).toContainText("Hmm, something went wrong.");

  // Expect the onmounted event to be called exactly once.
  const mountedDiv = page.locator("div.onmounted-div");
  await expect(mountedDiv).toHaveText("onmounted was called 1 times");
});
