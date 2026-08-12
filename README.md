# CodeceptJS POM JavaScript

[![Node.js](https://img.shields.io/badge/Node.js-24_LTS-339933.svg?logo=node.js&logoColor=white)](https://nodejs.org/)
[![CodeceptJS](https://img.shields.io/badge/CodeceptJS-4.1.0-7B68EE.svg)](https://codecept.io/)
[![CI](https://github.com/lucas-porto1/codeceptjs-pom-js/actions/workflows/ci.yml/badge.svg)](https://github.com/lucas-porto1/codeceptjs-pom-js/actions/workflows/ci.yml)

A reusable CodeceptJS reference project written in JavaScript. It demonstrates Page Object Model for UI automation with the Playwright helper and REST API testing in the same repository while keeping each test type independently executable.

## Test Targets

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

## Project Structure

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
- `support/steps_file.js` is the CodeceptJS actor extension point for future application-wide actions.
- `steps.d.ts` provides CodeceptJS and Page Object autocomplete while tests remain in JavaScript.
- `artifacts/` is generated only when needed and is ignored by Git.

Page Objects are used only for shared UI behavior. API requests remain visible in their tests because an additional routing layer would not improve this small example.

## Prerequisites

- Node.js 24 LTS
- npm

The `.nvmrc` file allows compatible Node version managers to select Node 24 automatically.

## Setup

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

## Environment Variables

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

Run scenarios with two workers:

```bash
npm run test:parallel
```

Validate lint and the CodeceptJS configuration:

```bash
npm run check
```

Regenerate IDE autocomplete definitions after changing helpers or Page Objects:

```bash
npm run types
```

## Architecture Guidelines

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

## Continuous Integration

GitHub Actions uses Node 24, installs Chromium, validates the project, and runs API and UI tests. Failure screenshots are retained for seven days. Full public demo values are defined directly in the workflow, so this template requires no repository secrets.

Dependabot checks npm packages and GitHub Actions every six months. The lockfile is versioned to keep local and CI installations reproducible.
