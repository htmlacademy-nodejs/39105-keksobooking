'use strict';

const PropertyTypes = {
  flat: `flat`,
  palace: `palace`,
  house: `house`,
  bungalo: `bungalo`,
};

const PropertyTitles = {
  goodFlat: `Большая уютная квартира`,
  badFlat: `Маленькая неуютная квартира`,
  goodCastle: `Огромный прекрасный дворец`,
  badCastle: `Маленький ужасный дворец`,
  goodHouse: `Красивый гостевой домик`,
  badHouse: `Некрасивый негостеприимный домик`,
  goodBungalo: `Уютное бунгало далеко от моря`,
  badBungalo: `Неуютное бунгало по колено в воде`
};

const CheckTimeVariants = {
  EARLY: `12:00`,
  MIDDLE: `13:00`,
  LATE: `14:00`,
};

const PropertyFeatures = {
  wifi: `wifi`,
  dishwasher: `dishwasher`,
  parking: `parking`,
  washer: `washer`,
  elevator: `elevator`,
  conditioner: `conditioner`,
};

const propertyPhotos = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const MAX_DATE_OFFSET_IN_DAYS = 7;

const MIN_PRICE = 1000;
const MAX_PRICE = 1000000;

const MIN_COORD_X = 300;
const MAX_COORD_X = 900;
const MIN_COORD_Y = 150;
const MAX_COORD_Y = 500;

const MIN_ROOMS_NUMBER = 1;
const MAX_ROOMS_NUMBER = 5;

module.exports = {
  PropertyTitles,
  PropertyTypes,
  CheckTimeVariants,
  PropertyFeatures,
  propertyPhotos,
  MAX_DATE_OFFSET_IN_DAYS,
  MIN_COORD_X,
  MAX_COORD_X,
  MIN_COORD_Y,
  MAX_COORD_Y,
  MIN_PRICE,
  MAX_PRICE,
  MIN_ROOMS_NUMBER,
  MAX_ROOMS_NUMBER,
};
