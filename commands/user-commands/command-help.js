'use strict';
const CommandsNameList = require(`./../commands-name-list`).CommandsNameList;

const COMMAND_TEXT = `
  Доступные команды:
${CommandsNameList.HELP.gray} — ${`печатает этот текст`.green};
${CommandsNameList.VERSION.gray} — ${`печатает версию приложения`.green};
${CommandsNameList.LICENSE.gray} — ${`печатает лицензию приложения`.green};
${CommandsNameList.AUTHOR.gray} — ${`печатает автора приложения`.green};
${CommandsNameList.DESCRIPTION.gray} — ${`печатает описание приложения`.green};
`;

module.exports = {
  name: CommandsNameList.HELP,
  execute() {
    console.log(COMMAND_TEXT);
  }
};
