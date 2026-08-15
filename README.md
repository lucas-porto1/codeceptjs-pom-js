# CodeceptJS POM — JavaScript Reference

[![CI](https://github.com/lucas-porto1/codeceptjs-pom-js/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/lucas-porto1/codeceptjs-pom-js/actions/workflows/ci.yml)

_Part of [Lucas Porto's QA Automation Reference Collection](https://github.com/lucas-porto1): QA-first templates built for readability, reproducibility, and sustainable maintenance._

A reusable CodeceptJS reference project written in JavaScript. It demonstrates Page Object Model for UI automation with the Playwright helper and REST API testing in the same repository while keeping each test type independently executable.

## Design principles

- **Keep scenarios readable:** business behavior and assertions remain visible in the test files.
- **Use Page Objects with purpose:** shared UI selectors and interactions belong in `pages/`, while one-off actions stay visible in tests.
- **Keep API requests direct:** CodeceptJS REST actions remain in API tests when another abstraction would not improve readability.
- **Reuse authentication safely:** authenticated scenarios share a managed session without making tests depend on execution order.
- **Keep test types independent:** API and UI suites can run separately or together locally and in CI.

## Test targets

- UI: [SauceDemo](https://www.saucedemo.com/)
- API: [SWAPI.INFO](https://swapi.info/), a file-based Star Wars API compatible with the resources used by the original SWAPI project

Both targets are public demonstration services. Replace them with authorized environments when reusing this template.

## Coverage

### UI scenarios

- Successful authentication
- Locked-user validation
- Product catalog validation
- Add product to cart
- Complete checkout flow

### API scenarios

- People resource, field types, collection, and 404 response
- Planet resource, relationships, and 404 response
- Film resource and relationships
- Starship resource and 404 response
- Available API resources

## Project structure

```text
.
|-- .github/
|   |-- workflows/ci.yml
|   `-- dependabot.yml
|-- pages/
|   |-- cart_page.js
|   |-- checkout_page.js
|   |-- inventory_page.js
|   `-- login_page.js
|-- support/
|   |-- auth.js
|   `-- steps_file.js
|-- test-data/
|   |-- api/star_wars.js
|   |-- checkout.js
|   `-- users.js
|-- tests/
|   |-- api/
|   |   |-- films_test.js
|   |   |-- people_test.js
|   |   |-- planets_test.js
|   |   |-- resources_test.js
|   |   `-- starships_test.js
|   `-- ui/
|       |-- checkout_test.js
|       |-- inventory_test.js
|       `-- login_test.js
|-- .env.example
|-- .nvmrc
|-- codecept.conf.js
|-- eslint.config.mjs
|-- jsconfig.json
|-- package-lock.json
|-- package.json
`-- steps.d.ts
```

- `tests/` contains readable business scenarios grouped by test type.
- `pages/` contains UI locators and reusable page actions.
- `test-data/` contains environment-independent inputs and expected API data.
- `support/auth.js` defines the reusable authenticated session lifecycle.
- `support/steps_file.js` is the CodeceptJS actor extension point for future application-wide actions.
- `steps.d.ts` provides CodeceptJS and Page Object autocomplete while tests remain in JavaScript.
- `artifacts/` contains generated reports and failure screenshots and is ignored by Git.

Page Objects are used only for shared UI behavior. API requests remain visible in their tests because an additional routing layer would not improve this small example.

## Prerequisites

- Node.js 24 LTS
- npm

The `.nvmrc` file allows compatible Node version managers to select Node 24 automatically.

## Getting started

Clone and install the project:

```bash
git clone https://github.com/lucas-porto1/codeceptjs-pom-js.git
cd codeceptjs-pom-js
npm ci
npx playwright install chromium
```

Create the local environment file:

```powershell
# Windows PowerShell
Copy-Item .env.example .env
```

```bash
# macOS or Linux
cp .env.example .env
```

## Environment variables

```env
WEB_URL=https://www.saucedemo.com
API_URL=https://swapi.info/api
STANDARD_USER=standard_user
STANDARD_PASSWORD=secret_sauce
LOCKED_USER=locked_out_user
```

The example values are public test credentials. Do not commit real credentials; `.env` is ignored by Git. Use GitHub Secrets for sensitive values in real projects and GitHub Variables for non-sensitive URLs.

## Commands

Run the complete suite:

```bash
npm test
```

Run the smoke scenarios across API and UI:

```bash
npm run test:smoke
```

Run only API tests without starting a browser:

```bash
npm run test:api
```

Run UI tests in headless mode:

```bash
npm run test:ui
```

Run UI tests with the browser visible:

```bash
npm run test:ui:headed
```

Run API and UI suites separately with two workers:

```bash
npm run test:parallel
```

Run only one test type in parallel:

```bash
npm run test:api:parallel
npm run test:ui:parallel
```

Validate lint and the CodeceptJS configuration:

```bash
npm run check
```

Regenerate IDE autocomplete definitions after changing helpers or Page Objects:

```bash
npm run types
```

## Adding a scenario

When adding a UI feature:

1. Add reusable page locators and actions to the relevant file in `pages/`.
2. Add test inputs to `test-data/` when they are shared or meaningful business data.
3. Add the scenario to `tests/ui/` and tag the feature with `@ui`.
4. Keep assertions that describe business outcomes visible in the test or Page Object method name.

When adding an API resource:

1. Create one resource-focused test file in `tests/api/`.
2. Add stable expected values to `test-data/api/` when useful.
3. Call the endpoint directly through `I.sendGetRequest()` so the request remains easy to understand.
4. Tag the feature with `@api`.

Create fragments, Step Objects, custom helpers, or additional configuration modules only when repeated behavior justifies them.

## Authentication and reports

The CodeceptJS `auth` plugin performs the standard-user login once and reuses its cookie for authenticated scenarios. Authentication tests still use `loginPage` directly because they validate the login behavior itself.

Each execution creates a self-contained HTML report:

```text
artifacts/report/api/testomatio-report.html
artifacts/report/ui/testomatio-report.html
```

Reports and failure screenshots are generated locally under `artifacts/` and are not committed.

## Continuous integration

GitHub Actions uses Node 24, installs Chromium, validates the project, and runs API and UI tests. Older runs for the same Git reference are automatically cancelled when a newer run starts. HTML reports and failure screenshots are retained for seven days. Full public demo values are defined directly in the workflow, so this template requires no repository secrets.

Dependabot checks npm packages and GitHub Actions every six months. The lockfile is versioned to keep local and CI installations reproducible.
