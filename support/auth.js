const users = require("../test-data/users");

module.exports = {
  standard: {
    login(I) {
      I.amOnPage("/");
      I.fillField("#user-name", users.standard.username);
      I.fillField("#password", users.standard.password);
      I.click("#login-button");
    },

    check(I) {
      I.amOnPage("/inventory.html");
      I.see("Products", ".title");
    },
  },
};
