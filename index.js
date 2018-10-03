const helpText = `
  Доступные команды:
--help    — печатает этот текст;
--version — печатает версию приложения;
`;

const versionText = '0.01';

const createErrorText = (command) => {return `
Неизвестная команда ${command}.
Чтобы прочитать правила использования приложения, наберите "--help"
`};

const defaultText = `
Привет пользователь!
Эта программа будет запускать сервер «Кексобукинг».
Автор: Геннадий Белогорцев.
`;

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(defaultText);
  process.exit(0);
}

process.argv.slice(2).forEach(val => {
  switch (val) {
    case '--version':
      console.log(versionText);
      process.exit(0);
      break;
    case '--help':
      console.log(helpText);
      process.exit(0);
      break;
    default:
      console.error(createErrorText(val));
      process.exit(1);
      break;
  }
});
