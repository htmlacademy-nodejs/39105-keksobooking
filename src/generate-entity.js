'use strict';
const utils = require(`./utils`);
const propertyConstants = require(`./property-constants`);

function generateAvatar() {
  return `https://robohash.org/${Math.random().toString().slice(2)}`;
}

function generateFeatures() {
  const features = [];
  const allFeatures = utils.mapToArray(propertyConstants.PropertyFeatures);
  const length = utils.getRandomIntInRange(0, allFeatures.length - 1);
  for (let i = 0; i < length; i++) {
    const randomFeatureIndex = utils.getRandomIntInRange(0, allFeatures.length - 1);
    features.push(allFeatures.splice(randomFeatureIndex, 1)[0]);
  }
  return features;
}

function generatePhotos() {
  return utils.getShuffledArray(propertyConstants.propertyPhotos);
}

function generateCoords() {
  return {
    x: utils.getRandomIntInRange(300, 900),
    y: utils.getRandomIntInRange(150, 500)
  };
}

function generateDate() {
  const now = Date.now();
  return utils.getRandomIntInRange(now - utils.daysToMs(propertyConstants.MAX_DATE_OFFSET_IN_DAYS), now);
}

module.exports = {
  generateEntity() {
    return {
      author: {
        avatar: generateAvatar(),
      },
      offer: {
        title: utils.getRandomMapItem(propertyConstants.PropertyTitles),
        address: `${Math.random() * 100}, ${Math.random() * 100}`,
        price: utils.getRandomIntInRange(1000, 1000000),
        type: utils.getRandomMapItem(propertyConstants.PropertyTypes),
        rooms: utils.getRandomIntInRange(1, 5),
        guests: utils.getRandomIntInRange(1, 20),
        checkin: utils.getRandomMapItem(propertyConstants.CheckTimeVariants),
        checkout: utils.getRandomMapItem(propertyConstants.CheckTimeVariants),
        features: generateFeatures(),
        description: ``,
        photos: generatePhotos(),
      },
      location: generateCoords(),
      date: generateDate(),
    };
  }
};
