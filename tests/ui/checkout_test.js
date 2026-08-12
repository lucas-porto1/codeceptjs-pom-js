const checkout = require("../../test-data/checkout");
const users = require("../../test-data/users");

Feature("Checkout @ui");

Before(({ loginPage }) => {
  loginPage.open();
  loginPage.loginAs(users.standard.username, users.standard.password);
});

Scenario("completes an order @smoke", ({ inventoryPage, cartPage, checkoutPage }) => {
  inventoryPage.addProductToCart(checkout.product);
  inventoryPage.openCart();
  cartPage.proceedToCheckout();
  checkoutPage.completeCustomerInformation(checkout.customer);
  checkoutPage.reviewOrder(checkout.product);
  checkoutPage.finishOrder();
  checkoutPage.seeOrderCompleted();
});
