'use strict';

const fs = require(`fs`);
const generateEntity = require(`../../generate-entity`).generateEntity;
const CommandsNameList = require(`./../commands-name-list`).CommandsNameList;
const questionInterface = require(`./../../question-interface`).questionInterface;
const {promisify} = require(`util`);
const access = promisify(fs.access);
const writeFile = promisify(fs.writeFile);

function createFileWithEntities({number, path}) {
  const entities = Array.from({length: number}, () => generateEntity());
  return writeFile(
      path,
      JSON.stringify(entities)
  ).then(
      () => console.log(`\nГотово!\n`),
      (e) => {
        console.log(`\nУпс! Что-то пошло не так: ${e}\n`);
        return Promise.reject(e);
      }
  );
}

function askForNumberAndPath() {
  const answer = {
    number: null,
    path: null
  };

  return askForNumber()
  .then((promptedNumber) => {
    answer.number = promptedNumber;
  })
  .then(askForPath)
  .then((promptedPath) => {
    answer.path = promptedPath;
    return Promise.resolve(answer);
  });
}

function askForNumber() {
  return questionInterface.ask(
      `\nПривет! Давай сгенерируем данные. Сколько элементов нужно сгенерировать? Введи цифру.\n`
  )
    .then((promptedNumber) => {
      if (isNaN(promptedNumber)) {
        return askForNumber();
      }
      return Promise.resolve(promptedNumber);
    });
}

function askForPath() {
  return questionInterface.ask(`\nУкажи путь до файла, в котором надо сохранить данные\n`)
    .then((path) => {
      return access(path, fs.constants.F_OK).then(
          () => askForRewrite(path),
          () => Promise.resolve(path)
      );
    });
}

function askForRewrite(path) {
  return questionInterface.ask(`\nТакой файл уже существует. Перезаписать? [yes, no]\n`)
    .then((answer) => {
      if (answer === `yes` || answer === `Y` || answer === `y`) {
        return Promise.resolve(path);
      }

      return askForPath();
    });
}

function askForMissingParams({number, path}) {
  if (!number || isNaN(number)) {
    return askForNumberAndPath()
      .then(({path: promptedPath, number: prompedNumber}) => {
        return Promise.resolve({number: prompedNumber, path: promptedPath});
      });
  }

  if (!path) {
    return askForPath().then((promptedPath) => {
      return Promise.resolve({number, path: promptedPath});
    });
  }

  return Promise.resolve({number, path});
}

module.exports = {
  name: CommandsNameList.GENERATE_ENTITY,

  execute(paramNumber, paramPath) {
    questionInterface.createInterface();
    return askForMissingParams({number: paramNumber, path: paramPath}).then(({number, path}) => {
      questionInterface.closeInterface();
      return createFileWithEntities({number, path});
    });
  }
};
