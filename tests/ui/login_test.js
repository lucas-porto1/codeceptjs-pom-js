const users = require("../../test-data/users");

Feature("Authentication @ui");

Scenario("standard user logs in successfully @smoke", ({ loginPage, inventoryPage }) => {
  loginPage.open();
  loginPage.loginAs(users.standard.username, users.standard.password);
  inventoryPage.seeOpened();
});

Scenario("locked user sees an error", ({ loginPage }) => {
  loginPage.open();
  loginPage.loginAs(users.locked.username, users.locked.password);
  loginPage.seeError("Sorry, this user has been locked out.");
});
