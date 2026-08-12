const checkout = require("../../test-data/checkout");

Feature("Checkout @ui");

Before(({ loginAs }) => {
  loginAs("standard");
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
