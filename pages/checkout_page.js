const { inject } = require("codeceptjs");

const { I } = inject();

const fields = {
  firstName: "#first-name",
  lastName: "#last-name",
  postalCode: "#postal-code",
};

const buttons = {
  continue: "#continue",
  finish: "#finish",
};

const elements = {
  completeHeader: ".complete-header",
  item: ".inventory_item_name",
  title: ".title",
};

module.exports = {
  completeCustomerInformation(customer) {
    I.see("Checkout: Your Information", elements.title);
    I.fillField(fields.firstName, customer.firstName);
    I.fillField(fields.lastName, customer.lastName);
    I.fillField(fields.postalCode, customer.postalCode);
    I.click(buttons.continue);
  },

  reviewOrder(productName) {
    I.see("Checkout: Overview", elements.title);
    I.see(productName, elements.item);
  },

  finishOrder() {
    I.click(buttons.finish);
  },

  seeOrderCompleted() {
    I.see("Thank you for your order!", elements.completeHeader);
    I.seeInCurrentUrl("checkout-complete.html");
  },
};
