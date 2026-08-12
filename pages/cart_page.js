const { inject } = require("codeceptjs");

const { I } = inject();

const elements = {
  title: ".title",
  item: ".inventory_item_name",
};

const buttons = {
  checkout: "#checkout",
};

module.exports = {
  seeOpened() {
    I.see("Your Cart", elements.title);
    I.seeInCurrentUrl("cart.html");
  },

  seeProduct(productName) {
    I.see(productName, elements.item);
  },

  proceedToCheckout() {
    I.click(buttons.checkout);
  },
};
