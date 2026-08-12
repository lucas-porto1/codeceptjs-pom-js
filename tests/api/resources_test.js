const assert = require("node:assert/strict");

Feature("API resources @api");

Scenario("advertises the available Star Wars resources @smoke", async ({ I }) => {
  const response = await I.sendGetRequest("/");

  assert.equal(response.status, 200);
  assert.deepEqual(Object.keys(response.data).sort(), [
    "films",
    "people",
    "planets",
    "species",
    "starships",
    "vehicles",
  ]);
});
