'use strict';

const CommandsNameList = require(`./commands-name-list`).CommandsNameList;

const createErrorText = (command) => `
Неизвестная команда ${command}.
Чтобы прочитать правила использования приложения, наберите "${CommandsNameList.HELP}"
`;

module.exports = {
  execute(wrongCommandName) {
    console.log(createErrorText(wrongCommandName));
    process.exit(1);
  }
};
