const assert = require("node:assert/strict");

const { films } = require("../../test-data/api/star_wars");

Feature("Films API @api");

Scenario("returns A New Hope by id @smoke", async ({ I }) => {
  const response = await I.sendGetRequest("/films/1");

  assert.equal(response.status, 200);
  assert.deepEqual(
    Object.fromEntries(
      Object.keys(films.aNewHope).map((field) => [field, response.data[field]]),
    ),
    films.aNewHope,
  );
});

Scenario("returns the film relationships", async ({ I }) => {
  const response = await I.sendGetRequest("/films/1");

  assert.equal(response.status, 200);

  for (const relationship of ["characters", "planets", "starships", "vehicles", "species"]) {
    assert.ok(Array.isArray(response.data[relationship]));
    assert.ok(response.data[relationship].length > 0);
  }
});

Scenario("returns the films collection", async ({ I }) => {
  const response = await I.sendGetRequest("/films");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.data));
  assert.ok(response.data.some(({ title }) => title === films.aNewHope.title));
});

Scenario("returns 404 for an unknown film", async ({ I }) => {
  const response = await I.sendGetRequest("/films/999");

  assert.equal(response.status, 404);
});
