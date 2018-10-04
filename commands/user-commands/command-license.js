'use strict';

const packageInfo = require(`./../../package.json`);
const CommandsNameList = require(`./../commands-name-list`).CommandsNameList;

const COMMAND_TEXT = `${packageInfo.license}`;

module.exports = {
  name: CommandsNameList.LICENSE,
  execute() {
    console.log(COMMAND_TEXT);
  }
};
