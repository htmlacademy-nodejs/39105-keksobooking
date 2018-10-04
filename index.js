const HELP_TEXT = `
  Доступные команды:
--help    — печатает этот текст;
--version — печатает версию приложения;
`;

const VERSION = '0.01';

const DEFAULT_TEXT = `
Привет пользователь!
Эта программа будет запускать сервер «Кексобукинг».
Автор: Геннадий Белогорцев.
`;

const createErrorText = (command) => `
Неизвестная команда ${command}.
Чтобы прочитать правила использования приложения, наберите "--help"
`;

const COMMANDS = Object.freeze({
  VERSION: '--version',
  HELP: '--help'
});

const command = process.argv.slice(2)[0];
switch (command) {
  case COMMANDS.VERSION:
    console.log(VERSION);
    break;
  case COMMANDS.HELP:
    console.log(HELP_TEXT);
    break;
  case undefined:
    console.log(DEFAULT_TEXT);
    break;
  default:
    console.error(createErrorText(command));
    process.exit(1);
    break;
}
