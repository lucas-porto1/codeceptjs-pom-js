require('tls').DEFAULT_ECDH_CURVE = 'auto';
const { expect, assert } = require('chai');
const { I } = inject();

Feature('People API');

// Test: Successful GET request for a valid person
Scenario('should return 200 for an existing person', async () => {
	const res = await I.sendGetRequest('/people/1');
	expect(res.status).to.eql(200);
});

// Test: 404 for a non-existent person
Scenario('should return 404 for a non-existent person', async () => {
	const res = await I.sendGetRequest('/people/266');
	expect(res.status).to.eql(404);
});

// Test: Validate all expected fields for Luke Skywalker
Scenario('should return correct fields for Luke Skywalker', async () => {
	const res = await I.sendGetRequest('/people/1');
	expect(res.data).to.include({
		name: 'Luke Skywalker',
		height: '172',
		mass: '77',
		hair_color: 'blond',
		skin_color: 'fair',
		eye_color: 'blue',
		birth_year: '19BBY',
		gender: 'male',
	});
});

// Test: Ensure incorrect values are not present
Scenario('should not match incorrect field values', async () => {
	const res = await I.sendGetRequest('/people/1');
	expect(res.data.name).to.not.eql('Luske');
	expect(res.data.height).to.not.eql('173');
	expect(res.data.mass).to.not.eql('78');
	expect(res.data.hair_color).to.not.eql('blondd');
	expect(res.data.skin_color).to.not.eql('fairr');
	expect(res.data.eye_color).to.not.eql('bluee');
	expect(res.data.birth_year).to.not.eql('19XXY');
	expect(res.data.gender).to.not.eql('female');
});

// Test: Validate data types for all person fields
Scenario('should have correct data types for person fields', async () => {
	const res = await I.sendGetRequest('/people/1');
	assert.isObject(res.data);
	[
		'name',
		'height',
		'mass',
		'hair_color',
		'skin_color',
		'eye_color',
		'birth_year',
		'gender',
	].forEach(field => assert.isString(res.data[field], `${field} should be a string`));
});