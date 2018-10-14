'use strict';
const generateEntity = require(`./../src/generate-entity`).generateEntity;
const propertyConstants = require(`./../src/property-constants`);
const utils = require(`./../src/utils`);
const assert = require(`assert`);

describe(`Module GenerateEntity`, () => {
  it(`should be a function`, () => {
    assert.strictEqual(typeof generateEntity, `function`);
  });

  let data;

  beforeEach(() => {
    data = generateEntity();
  });

  afterEach(() => {
    data = null;
  });

  it(`should have string author.avatar field`, () => {
    assert.strictEqual(typeof data.author.avatar, `string`);
  });

  it(`should have offer.title field, value must be one of propertyTitles`, () => {
    const propertyTitles = utils.mapToArray(propertyConstants.PropertyTitles);
    assert(propertyTitles.includes(data.offer.title));
  });

  it(`should have offer.address field, template: {{location.x}}, {{location.y}}`, () => {
    const coords = data.offer.address.split(`,`);
    assert.strictEqual(coords.length, 2);

    const [x, y] = coords;
    assert(!isNaN(Number.parseFloat(x)), `can't parse number from ${x}`);
    assert(!isNaN(Number.parseFloat(y)), `can't parse number from ${y}`);
  });

  it(`should have offer.price field`, () => {
    const {price} = data.offer;
    assert(
        price >= propertyConstants.MIN_PRICE && price <= propertyConstants.MAX_PRICE,
        `wrong price value: ${price}, 
         it should be between ${propertyConstants.MIN_PRICE} and ${propertyConstants.MAX_PRICE}`
    );
  });

  it(`should have offer.type field, value must be one of propertyTypes`, () => {
    const propertyTypes = utils.mapToArray(propertyConstants.PropertyTypes);
    assert(propertyTypes.includes(data.offer.type));
  });

  it(`should have offer.rooms field`, () => {
    const {rooms} = data.offer;
    assert(
        rooms >= propertyConstants.MIN_ROOMS_NUMBER && rooms <= propertyConstants.MAX_ROOMS_NUMBER,
        `wrong rooms number: ${rooms},
        it should be between ${propertyConstants.MIN_ROOMS_NUMBER} and ${propertyConstants.MAX_ROOMS_NUMBER}`
    );
  });

  it(`should have integer offer.guests field`, () => {
    const {guests} = data.offer;
    assert(Number.isInteger(guests), `wrong guests value: ${guests}`);
  });

  it(`should have offer.checkin field, value must be one of CheckTypeVariants`, () => {
    const checkTimeVariants = utils.mapToArray(propertyConstants.CheckTimeVariants);
    assert(checkTimeVariants.includes(data.offer.checkin));
  });

  it(`should have offer.checkout field, value must be one of CheckTypeVariants`, () => {
    const checkTimeVariants = utils.mapToArray(propertyConstants.CheckTimeVariants);
    assert(checkTimeVariants.includes(data.offer.checkout));
  });

  it(`should have offer.features field, contains some of PropertyFeatures values`, () => {
    const {features} = data.offer;
    const availableFeatures = utils.mapToArray(propertyConstants.PropertyFeatures);
    assert(
        features.every((feature) => availableFeatures.includes(feature)),
        `list ${features} includes wrong feature; must include only features from list ${availableFeatures}`
    );
    assert(
        utils.getUniqueItems(features).length === features.length,
        `features list must contain only unique values; current list: ${features}`
    );
  });

  it(`should have blank offer.description field`, () => {
    const {description} = data.offer;
    assert(description.length === 0, `description must be blank string, but it contains: ${description}`);
  });

  it(`should have offer.photos field with unique string array inside`, () => {
    const {photos} = data.offer;

    assert(Array.isArray(photos), `offer.photos must be an array`);
    assert(photos.length > 0, `offer.photos must have some photos inside`);
    assert(
        photos.every((photo) => typeof photo === `string`),
        `offer.photos must contain string array, but it contains: ${photos}`
    );
    assert(
        utils.getUniqueItems(photos).length === photos.length,
        `offer.photos array must contain unique items, but it contains: ${photos}`
    );
  });

  it(`should contain .location field with x and y coords`, () => {
    const {x, y} = data.location;
    assert(
        x >= propertyConstants.MIN_COORD_X && x <= propertyConstants.MAX_COORD_X,
        `x coord must be between ${propertyConstants.MIN_COORD_X} and ${propertyConstants.MAX_COORD_X}, but it is ${x}`
    );
    assert(
        y >= propertyConstants.MIN_COORD_Y && y <= propertyConstants.MAX_COORD_Y,
        `y coord must be between ${propertyConstants.MIN_COORD_Y} and ${propertyConstants.MAX_COORD_Y}, but it is ${y}`
    );
  });

  it(`should contain .date field`, () => {
    let {date} = data;

    assert.strictEqual(typeof date, `number`, `date must be a number, but it is ${typeof date}`);

    date = new Date(date);
    const dateOffset = Date.now() - date;
    assert(
        dateOffset > 0 && dateOffset < utils.daysToMs(propertyConstants.MAX_DATE_OFFSET_IN_DAYS),
        `date must be not older than ${propertyConstants.MAX_DATE_OFFSET_IN_DAYS} days, 
         but it is: ${date}`
    );
  });
});
