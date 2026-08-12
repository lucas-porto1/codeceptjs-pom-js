require("dotenv").config({ quiet: true });

const isApiProfile = process.env.profile === "api";
const isUiProfile = ["headed", "ui"].includes(process.env.profile);

function requireEnvironmentVariable(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Copy .env.example to .env and provide a value.`,
    );
  }

  return value;
}

exports.config = {
  noGlobals: true,
  tests: "./tests/**/*_test.js",
  output: "./artifacts",
  helpers: {
    ...(!isApiProfile && {
      Playwright: {
        url: requireEnvironmentVariable("WEB_URL"),
        browser: "chromium",
        show: process.env.profile === "headed",
        strict: true,
        waitForNavigation: "load",
        waitForTimeout: 5000,
        windowSize: "1440x900",
      },
    }),
    ...(!isUiProfile && {
      REST: {
        endpoint: requireEnvironmentVariable("API_URL"),
        timeout: 10000,
      },
    }),
  },
  include: {
    I: "./support/steps_file.js",
    cartPage: "./pages/cart_page.js",
    checkoutPage: "./pages/checkout_page.js",
    inventoryPage: "./pages/inventory_page.js",
    loginPage: "./pages/login_page.js",
  },
  mocha: {},
  name: "codeceptjs-pom-js",
  plugins: {
    screenshot: {
      enabled: true,
      on: "fail",
      uniqueScreenshotNames: true,
    },
  },
};
