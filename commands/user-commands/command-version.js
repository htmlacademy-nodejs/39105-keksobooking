'use strict';

const packageInfo = require(`./../../package.json`);
const CommandsNameList = require(`./../commands-name-list`).CommandsNameList;

const COMMAND_TEXT = `v${packageInfo.version}`;

module.exports = {
  name: CommandsNameList.VERSION,
  execute() {
    console.log(COMMAND_TEXT);
  }
};
