'use strict';

const packageInfo = require(`./../package.json`);

const COMMAND_TEXT = `
Привет пользователь!
Эта программа будет запускать сервер приложения «${packageInfo.name}».
Автор: ${packageInfo.author}.
`;

module.exports = {
  execute() {
    console.log(COMMAND_TEXT);
  }
};
