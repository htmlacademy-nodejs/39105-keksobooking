'use strict';

const packageInfo = require(`./../../../package.json`);
const CommandsNameList = require(`./../commands-name-list`).CommandsNameList;

const COMMAND_TEXT = `${packageInfo.author}`;

module.exports = {
  name: CommandsNameList.AUTHOR,
  execute() {
    console.log(COMMAND_TEXT);
  }
};
