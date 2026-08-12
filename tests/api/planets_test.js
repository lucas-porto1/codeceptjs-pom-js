const assert = require("node:assert/strict");

const { planets } = require("../../test-data/api/star_wars");

Feature("Planets API @api");

Scenario("returns Tatooine by id @smoke", async ({ I }) => {
  const response = await I.sendGetRequest("/planets/1");

  assert.equal(response.status, 200);
  assert.deepEqual(
    Object.fromEntries(
      Object.keys(planets.tatooine).map((field) => [field, response.data[field]]),
    ),
    planets.tatooine,
  );
});

Scenario("returns related residents and films", async ({ I }) => {
  const response = await I.sendGetRequest("/planets/1");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.data.residents));
  assert.ok(response.data.residents.length > 0);
  assert.ok(Array.isArray(response.data.films));
  assert.ok(response.data.films.length > 0);
});

Scenario("returns the planets collection", async ({ I }) => {
  const response = await I.sendGetRequest("/planets");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.data));
  assert.ok(response.data.some(({ name }) => name === planets.tatooine.name));
});

Scenario("returns 404 for an unknown planet", async ({ I }) => {
  const response = await I.sendGetRequest("/planets/999");

  assert.equal(response.status, 404);
});
