require("tls").DEFAULT_ECDH_CURVE = "auto"
const expect = require('chai').expect;
const assert = require('chai').assert; 
const {I} = inject();

Feature('Planets tests');

Scenario('Should return 200 for a valid planet', async () => {
    const res = await I.sendGetRequest('/planets/1');
    expect(res.status).to.eql(200);
});

Scenario('Should return 404 for a non-existent planet', async () => {
    const res = await I.sendGetRequest('/planets/370');
    expect(res.status).to.eql(404);
});

Scenario('Should return correct fields for Tatooine', async () => {
    const res = await I.sendGetRequest('/planets/1');
    expect(res.data).to.include({
        name: "Tatooine",
        rotation_period: "23",
        orbital_period: "304",
        diameter: "10465",
        climate: "arid",
        gravity: "1 standard",
        terrain: "desert",
        surface_water: "1",
        population: "200000"
    });
});

Scenario('Should not match incorrect planet field values', async () => {
    const res = await I.sendGetRequest('/planets/1');
    expect(res.data.name).to.not.eql("Tatooinee");
    expect(res.data.rotation_period).to.not.eql("24");
    expect(res.data.orbital_period).to.not.eql("305");
    expect(res.data.diameter).to.not.eql("10467");
    expect(res.data.climate).to.not.eql("ariid");
    expect(res.data.gravity).to.not.eql("1 standardd");
    expect(res.data.terrain).to.not.eql("deseert");
    expect(res.data.surface_water).to.not.eql("2");
    expect(res.data.population).to.not.eql("200030");
});


Scenario('Should have correct data types for planet fields', async () => {
    const res = await I.sendGetRequest('/planets/1');
    assert.isObject(res.data);
    [
        'name',
        'rotation_period',
        'orbital_period',
        'diameter',
        'climate',
        'gravity',
        'terrain',
        'surface_water',
        'population'
    ].forEach(field => assert.isString(res.data[field], `${field} should be a string`));
});