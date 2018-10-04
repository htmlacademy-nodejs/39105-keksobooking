const Commands = {
  VERSION: `--version`,
  HELP: `--help`
};

const HELP_TEXT = `
  Доступные команды:
${Commands.HELP} — печатает этот текст;
${Commands.VERSION} — печатает версию приложения;
`;

const VERSION = `0.01`;

const DEFAULT_TEXT = `
Привет пользователь!
Эта программа будет запускать сервер «Кексобукинг».
Автор: Геннадий Белогорцев.
`;

const createErrorText = (command) => `
Неизвестная команда ${command}.
Чтобы прочитать правила использования приложения, наберите "${Commands.HELP}"
`;

const command = process.argv.slice(2)[0];
switch (command) {
  case Commands.VERSION:
    console.log(VERSION);
    break;
  case Commands.HELP:
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
