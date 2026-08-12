Feature("Inventory @ui");

Before(({ loginAs }) => {
  loginAs("standard");
});

Scenario("displays the product catalog", ({ inventoryPage }) => {
  inventoryPage.seeOpened();
  inventoryPage.seeProductCatalog();
});

Scenario("adds a product to the cart", ({ inventoryPage, cartPage }) => {
  const productName = "Sauce Labs Backpack";

  inventoryPage.addProductToCart(productName);
  inventoryPage.seeCartQuantity(1);
  inventoryPage.openCart();
  cartPage.seeOpened();
  cartPage.seeProduct(productName);
});
