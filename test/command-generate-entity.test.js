'use strict';
const generateCommand = require(`../src/commands/user-commands/command-generate-entity`);
const propertyConstants = require(`../src/property-constants`);
const utils = require(`../src/utils`);
const assert = require(`assert`);
const fs = require(`fs`);
const {promisify} = require(`util`);

const readFile = promisify(fs.readFile);
const access = promisify(fs.access);
// const unlink = promisify(fs.unlink);

// "offer": {
//   "title": строка, заголовок предложения, одно из фиксированных значений "Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде". Значения могут повторяться.
//   "address": строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}"
//   "price": число, случайная цена от 1000 до 1 000 000
//   "type": строка с одним из четырёх фиксированных значений: flat, palace, house или bungalo
//   "rooms": число, случайное количество комнат от 1 до 5
//   "guests": число, случайное количество гостей, которое можно разместить
//   "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
//     "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
//   "features": массив строк случайной длины из неповторяющихся элементов: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
//     "description": пустая строка,
//     "photos": массив из строк "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg" и "http://o0.github.io/assets/images/tokyo/hotel3.jpg" расположенных в произвольном порядке
// },
//
// "location": {
//   "x": случайное число, координата x метки на карте от 300 до 900,
//     "y": случайное число, координата y метки на карте от 150 до 500
// },
// "date": число, дата размещения, представляет собой timestamp в формате UNIX. Представляет собой случайное число в интервале от сейчас минус 7 дней

describe(`Module generateCommand`, () => {
  it(`.execute should be a function`, () => {
    assert.strictEqual(typeof generateCommand.execute, `function`);
  });

  it(`should fail on non-existed folder`, (done) => {
    // TODO WTF
    const fileName = `./nonExistedFolder/test-entity.json`;
    generateCommand.execute(fileName).then(assert.fail, () => done());
  });

  const fileName = `./entities/test-entity.json`;
  let fileData;

  it(`should create a new file`, () => {
    generateCommand.execute(fileName)
      .then(() => access(fileName));
  });

  it(`file should have string author.avatar field`, (done) => {
    readFile(fileName, `utf8`)
      .then((data) => {
        fileData = JSON.parse(data);
        assert.strictEqual(typeof fileData.author.avatar, `string`);
        done();
      });
  });

  it(`file should have offer.title field, value must be one of propertyTitles`, () => {
    const propertyTitles = utils.mapToArray(propertyConstants.PropertyTitles);
    assert(propertyTitles.includes(fileData.offer.title));
  });

  it(`file should have offer.address field, template: {{location.x}}, {{location.y}}`, () => {
    const coords = fileData.offer.address.split(`,`);
    assert.strictEqual(coords.length, 2);
    assert(!isNaN(Number.parseFloat(coords[0])));
    assert(!isNaN(Number.parseFloat(coords[1])));
  });

  it(`file should have offer.price field, value between 1000 and 1 000 000`, () => {
    const {price} = fileData.offer;
    assert(price >= 1000 && price <= 1000000, `wrong price value: ${price}`);
  });

  it(`file should have offer.type field, value must be one of propertyTypes`, () => {
    const propertyTypes = utils.mapToArray(propertyConstants.PropertyTypes);
    assert(propertyTypes.includes(fileData.offer.type));
  });

  it(`file should have offer.rooms field, value between 1 and 5`, () => {
    const {rooms} = fileData.offer;
    assert(rooms >= 1 && rooms <= 5, `wrong rooms value: ${rooms}`);
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
        `offer.photos must contain strings, but it contains: ${photos}`
    );
    assert(
        utils.getUniqueItems(photos).length === photos.length,
        `offer.photos must contain unique items, but it contains: ${photos}`
    );
  });

  it(`file should contain .location field with x and y coords`, () => {
    const {x, y} = fileData.location;
    assert(
        x >= 300 && x <= 900,
        `x coord must be between 300 and 900, but it is ${x}`
    );
    assert(
        y >= 150 && y <= 500,
        `y coord must be between 150 and 500, but it is ${y}`
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
});
