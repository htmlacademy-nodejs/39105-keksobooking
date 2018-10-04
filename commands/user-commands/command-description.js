'use strict';

const packageInfo = require(`./../../package.json`);
const CommandsNameList = require(`./../commands-name-list`).CommandsNameList;

const COMMAND_TEXT = `${packageInfo.description}`;

module.exports = {
  name: CommandsNameList.DESCRIPTION,
  execute() {
    console.log(COMMAND_TEXT);
  }
};
