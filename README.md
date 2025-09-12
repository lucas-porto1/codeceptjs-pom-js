

# Codecept Star Wars API Test Suite

This project is an automated API test suite for the Star Wars API (SWAPI), built with [CodeceptJS](https://codecept.io/) and [Chai](https://www.chaijs.com/). It demonstrates best practices for API testing, reporting, and maintainability.

## Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- npm (comes with Node.js)

## Setup

Clone the repository and install dependencies:

```sh
git clone https://github.com/lucas-porto1/codecept-star-wars.git
cd codecept-star-wars
npm install
```

## Usage

### Run all tests

```sh
npm test
```

### Lint the code

```sh
npm run lint
```

### Generate an HTML report (optional)

```sh
npx codeceptjs run --reporter mochawesome
```

### Environment variables

You can override the API endpoint by setting the `API_ENDPOINT` environment variable:

```sh
API_ENDPOINT=https://your-api-endpoint npm test
```

## Project Structure

- `test/` - Contains all test files
- `codecept.conf.js` - CodeceptJS configuration
- `package.json` - Project metadata and scripts

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

ISC
