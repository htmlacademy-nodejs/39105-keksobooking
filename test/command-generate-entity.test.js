'use strict';
const generateCommand = require(`./../src/commands/user-commands/command-generate-entity`);
const propertyConstants = require(`./../src/property-constants`);
const utils = require(`./../src/utils`);
const assert = require(`assert`);
const fs = require(`fs`);
const {promisify} = require(`util`);

const readFile = promisify(fs.readFile);
const access = promisify(fs.access);
const unlink = promisify(fs.unlink);

describe(`Module generateCommand`, () => {
  it(`.execute should be a function`, () => {
    assert.strictEqual(typeof generateCommand.execute, `function`);
  });

  it(`should fail on non-existed folder`, (done) => {
    const fileName = `./nonExistedFolder/test-entity.json`;
    generateCommand.execute(fileName).then(assert.fail, () => done());
  });

  const fileName = `./entities/test-entity.json`;
  let fileData;

  it(`should create a new file`, () => {
    generateCommand.execute(fileName)
      .then(() => access(fileName));
  });

  it(`file should be readable`, (done) => {
    readFile(fileName, `utf8`)
      .then((data) => {
        fileData = JSON.parse(data);
        done();
      });
  });

  it(`file should have string author.avatar field`, () => {
    assert.strictEqual(typeof fileData.author.avatar, `string`);
  });

  it(`file should have offer.title field, value must be one of propertyTitles`, () => {
    const propertyTitles = utils.mapToArray(propertyConstants.PropertyTitles);
    assert(propertyTitles.includes(fileData.offer.title));
  });

  it(`file should have offer.address field, template: {{location.x}}, {{location.y}}`, () => {
    const coords = fileData.offer.address.split(`,`);
    assert.strictEqual(coords.length, 2);

    const x = coords[0];
    const y = coords[1];
    assert(!isNaN(Number.parseFloat(x)), `can't parse number from ${x}`);
    assert(!isNaN(Number.parseFloat(y)), `can't parse number from ${y}`);
  });

  it(`file should have offer.price field`, () => {
    const {price} = fileData.offer;
    assert(
        price >= propertyConstants.MIN_PRICE && price <= propertyConstants.MAX_PRICE,
        `wrong price value: ${price}, 
        it should be between ${propertyConstants.MIN_PRICE} and ${propertyConstants.MAX_PRICE}`
    );
  });

  it(`file should have offer.type field, value must be one of propertyTypes`, () => {
    const propertyTypes = utils.mapToArray(propertyConstants.PropertyTypes);
    assert(propertyTypes.includes(fileData.offer.type));
  });

  it(`file should have offer.rooms field`, () => {
    const {rooms} = fileData.offer;
    assert(
        rooms >= propertyConstants.MIN_ROOMS_NUMBER && rooms <= propertyConstants.MAX_ROOMS_NUMBER,
        `wrong rooms number: ${rooms},
        it should be between ${propertyConstants.MIN_ROOMS_NUMBER} and ${propertyConstants.MAX_ROOMS_NUMBER}`
    );
  });

  it(`file should have integer offer.guests field`, () => {
    const {guests} = fileData.offer;
    assert(Number.isInteger(guests), `wrong guests value: ${guests}`);
  });

  it(`file should have offer.checkin field, value must be one of CheckTypeVariants`, () => {
    const checkTimeVariants = utils.mapToArray(propertyConstants.CheckTimeVariants);
    assert(checkTimeVariants.includes(fileData.offer.checkin));
  });

  it(`file should have offer.checkout field, value must be one of CheckTypeVariants`, () => {
    const checkTimeVariants = utils.mapToArray(propertyConstants.CheckTimeVariants);
    assert(checkTimeVariants.includes(fileData.offer.checkout));
  });

  it(`file should have offer.features field, contains some of PropertyFeatures values`, () => {
    const {features} = fileData.offer;
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

  it(`file should have blank offer.description field`, () => {
    const {description} = fileData.offer;
    assert(description.length === 0, `description must be blank string, but it contains: ${description}`);
  });

  it(`file should have offer.photos field with unique string array inside`, () => {
    const {photos} = fileData.offer;

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

  it(`file should contain .location field with x and y coords`, () => {
    const {x, y} = fileData.location;
    assert(
        x >= propertyConstants.MIN_COORD_X && x <= propertyConstants.MAX_COORD_X,
        `x coord must be between ${propertyConstants.MIN_COORD_X} and ${propertyConstants.MAX_COORD_X}, but it is ${x}`
    );
    assert(
        y >= propertyConstants.MIN_COORD_Y && y <= propertyConstants.MAX_COORD_Y,
        `y coord must be between ${propertyConstants.MIN_COORD_Y} and ${propertyConstants.MAX_COORD_Y}, but it is ${y}`
    );
  });

  it(`file should contain .date field`, () => {
    let {date} = fileData;

    assert.strictEqual(typeof date, `number`, `date must be a number, but it is ${typeof date}`);

    date = new Date(date);
    const dateOffset = Date.now() - date;
    assert(
        dateOffset > 0 && dateOffset < utils.daysToMs(propertyConstants.MAX_DATE_OFFSET_IN_DAYS),
        `date must be not older than ${propertyConstants.MAX_DATE_OFFSET_IN_DAYS} days, 
        but it is: ${date}`
    );
  });

  it(`test file should be deleted`, (done) => {
    unlink(fileName).then(done);
  });
});
