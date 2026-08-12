/// <reference types='codeceptjs' />
type steps_file = typeof import('./support/steps_file.js').default;
type cartPage = typeof import('./pages/cart_page.js').default;
type checkoutPage = typeof import('./pages/checkout_page.js').default;
type inventoryPage = typeof import('./pages/inventory_page.js').default;
type loginPage = typeof import('./pages/login_page.js').default;

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, cartPage: cartPage, checkoutPage: checkoutPage, inventoryPage: inventoryPage, loginPage: loginPage }
  interface Methods extends Playwright, REST {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
