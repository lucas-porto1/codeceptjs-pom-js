const { inject } = require("codeceptjs");

const { I } = inject();

const fields = {
  username: "#user-name",
  password: "#password",
};

const buttons = {
  login: "#login-button",
};

const messages = {
  error: "[data-test='error']",
};

module.exports = {
  open() {
    I.amOnPage("/");
    I.seeElement(fields.username);
  },

  loginAs(username, password) {
    I.fillField(fields.username, username);
    I.fillField(fields.password, password);
    I.click(buttons.login);
  },

  seeError(message) {
    I.see(message, messages.error);
  },
};
