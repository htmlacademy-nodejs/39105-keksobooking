const helpText = `
  Доступные команды:
--help    — печатает этот текст;
--version — печатает версию приложения;
`;
const versionText = '0.01';
const defaultText = `
Привет пользователь!
Эта программа будет запускать сервер «Кексобукинг».
Автор: Геннадий Белогорцев.
`;
const createErrorText = (command) => `
Неизвестная команда ${command}.
Чтобы прочитать правила использования приложения, наберите "--help"
`;

const command = process.argv.slice(2)[0];
switch (command) {
  case '--version':
    console.log(versionText);
    process.exit(0);
    break;
  case '--help':
    console.log(helpText);
    process.exit(0);
    break;
  case undefined:
    console.log(defaultText);
    process.exit(0);
    break;
  default:
    console.error(createErrorText(command));
    process.exit(1);
    break;
}
