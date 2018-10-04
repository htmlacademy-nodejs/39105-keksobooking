'use strict';

const CommandsNameList = require(`./../commands-name-list`).CommandsNameList;

const COMMAND_TEXT = `
  Доступные команды:
${CommandsNameList.HELP} — печатает этот текст;
${CommandsNameList.VERSION} — печатает версию приложения;
${CommandsNameList.LICENSE} — печатает лицензию приложения;
${CommandsNameList.AUTHOR} — печатает автора приложения;
${CommandsNameList.DESCRIPTION} — печатает описание приложения;
`;

module.exports = {
  name: CommandsNameList.HELP,
  execute() {
    console.log(COMMAND_TEXT);
  }
};
