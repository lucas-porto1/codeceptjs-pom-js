exports.config = {
  tests: "./tests/api/*_test.js",
  output: "./artifacts/output",
	helpers: {
		REST: {
			endpoint: process.env.API_ENDPOINT || "https://swapi.dev/api",
			onRequest: () => {
				// Set custom headers here if needed
				// request.headers.auth = process.env.AUTH_TOKEN;
			}
		}
	},
	include: {},
	bootstrap: null,
	mocha: {
		reporterOptions: {
			reportDir: "output",
			uniqueScreenshotNames: true
		}
	},
	name: "starwars-codeceptjs-lpg",
		plugins: {
			allure: {
				enabled: true,
				outputDir: "artifacts/report",
				require: '@codeceptjs/allure-legacy'
			}
		}
};