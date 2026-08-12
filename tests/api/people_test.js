const assert = require("node:assert/strict");

const { people } = require("../../test-data/api/star_wars");

Feature("People API @api");

Scenario("returns Luke Skywalker by id @smoke", async ({ I }) => {
  const response = await I.sendGetRequest("/people/1");

  assert.equal(response.status, 200);
  assert.deepEqual(
    Object.fromEntries(
      Object.keys(people.lukeSkywalker).map((field) => [field, response.data[field]]),
    ),
    people.lukeSkywalker,
  );
});

Scenario("returns the expected field types", async ({ I }) => {
  const response = await I.sendGetRequest("/people/1");

  assert.equal(response.status, 200);
  assert.equal(typeof response.data, "object");

  for (const field of people.stringFields) {
    assert.equal(typeof response.data[field], "string", `${field} must be a string`);
  }
});

Scenario("returns the people collection", async ({ I }) => {
  const response = await I.sendGetRequest("/people");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.data));
  assert.ok(response.data.length > 0);
  assert.ok(response.data.some(({ name }) => name === people.lukeSkywalker.name));
});

Scenario("returns 404 for an unknown person", async ({ I }) => {
  const response = await I.sendGetRequest("/people/999");

  assert.equal(response.status, 404);
});
