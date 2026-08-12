const assert = require("node:assert/strict");

const { starships } = require("../../test-data/api/star_wars");

Feature("Starships API @api");

Scenario("returns the Death Star by id @smoke", async ({ I }) => {
  const response = await I.sendGetRequest("/starships/9");

  assert.equal(response.status, 200);
  assert.deepEqual(
    Object.fromEntries(
      Object.keys(starships.deathStar).map((field) => [field, response.data[field]]),
    ),
    starships.deathStar,
  );
});

Scenario("returns the starships collection", async ({ I }) => {
  const response = await I.sendGetRequest("/starships");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.data));
  assert.ok(response.data.some(({ name }) => name === starships.deathStar.name));
});

Scenario("returns 404 for an unknown starship", async ({ I }) => {
  const response = await I.sendGetRequest("/starships/999");

  assert.equal(response.status, 404);
});
