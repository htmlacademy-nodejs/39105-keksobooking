'use strict';

const fs = require(`fs`);
const generateEntity = require(`../../generate-entity`).generateEntity;
const CommandsNameList = require(`./../commands-name-list`).CommandsNameList;

module.exports = {
  name: CommandsNameList.GENERATE_ENTITY,

  execute(fileName = `./entity.json`) {
    return new Promise((resolve, reject) => {
      fs.writeFile(
          fileName,
          JSON.stringify(generateEntity()),
          (err) => err ? reject(err) : resolve());
    });
  }
};
