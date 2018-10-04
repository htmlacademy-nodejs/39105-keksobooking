'use strict';

const packageInfo = require(`./../../package.json`);
const CommandsNameList = require(`./../commands-name-list`).CommandsNameList;

let [major, minor, patch] = packageInfo.version.split(`.`);
const COMMAND_TEXT = `v${major.red}.${minor.green}.${patch.blue}`;

module.exports = {
  name: CommandsNameList.VERSION,
  execute() {
    console.log(COMMAND_TEXT);
  }
};
