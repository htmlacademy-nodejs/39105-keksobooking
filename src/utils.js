'use strict';

function getRandomIntInRange(a, b) {
  return a + Math.round(Math.random() * (b - a));
}

function getRandomArrayItem(array) {
  const rndIndex = getRandomIntInRange(0, array.length - 1);
  return array[rndIndex];
}

function getRandomMapItem(map) {
  const randomKey = getRandomArrayItem(Object.keys(map));
  return map[randomKey];
}

function mapToArray(map) {
  return Object.keys(map).map((key) => map[key]);
}

function getUniqueItems(array) {
  return [...new Set(array)];
}

function getShuffledArray(array) {
  const newArray = [];
  const targetArray = [...array];
  for (let i = 0; i < array.length; i++) {
    newArray.push(targetArray.splice(getRandomIntInRange(0, targetArray.length - 1), 1)[0]);
  }
  return newArray;
}

function msToDays(ms) {
  return ms / (1000 * 60 * 60 * 24);
}

function daysToMs(days) {
  return days * (1000 * 60 * 60 * 24);
}

module.exports = {
  getRandomIntInRange,
  getRandomArrayItem,
  getRandomMapItem,
  mapToArray,
  getUniqueItems,
  getShuffledArray,
  msToDays,
  daysToMs
};
