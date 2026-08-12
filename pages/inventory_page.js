const { inject } = require("codeceptjs");

const { I } = inject();

const elements = {
  title: ".title",
  product: ".inventory_item",
  cart: ".shopping_cart_link",
  cartBadge: ".shopping_cart_badge",
};

const products = {
  "Sauce Labs Backpack": "[data-test='add-to-cart-sauce-labs-backpack']",
};

module.exports = {
  seeOpened() {
    I.see("Products", elements.title);
    I.seeInCurrentUrl("inventory.html");
  },

  seeProductCatalog() {
    I.seeNumberOfElements(elements.product, 6);
  },

  addProductToCart(productName) {
    const addButton = products[productName];

    if (!addButton) {
      throw new Error(`Product is not configured: ${productName}`);
    }

    I.click(addButton);
  },

  seeCartQuantity(quantity) {
    I.see(String(quantity), elements.cartBadge);
  },

  openCart() {
    I.click(elements.cart);
  },
};
