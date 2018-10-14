'use strict';

const fs = require(`fs`);
const generateEntity = require(`../../generate-entity`).generateEntity;
const CommandsNameList = require(`./../commands-name-list`).CommandsNameList;
const promptQuestion = require(`./../../prompt-question`).promptQuestion;
const {promisify} = require(`util`);
const access = promisify(fs.access);
const writeFile = promisify(fs.writeFile);

function createFileWithEntities(number, path) {
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
    promptedNumber: null,
    promptedPath: null
  };

  return askForNumber()
  .then((promptedNumber) => {
    answer.promptedNumber = promptedNumber;
  })
  .then(askForPath)
  .then((promptedPath) => {
    answer.promptedPath = promptedPath;
    return Promise.resolve(answer);
  });
}

function askForNumber() {
  return promptQuestion(`\nПривет! Давай сгенерируем данные. Сколько элементов нужно сгенерировать? Введи цифру.\n`)
    .then((promptedNumber) => {
      if (isNaN(promptedNumber)) {
        return askForNumber();
      }
      return Promise.resolve(promptedNumber);
    });
}

function askForPath() {
  return promptQuestion(`\nУкажи путь до файла, в котором надо сохранить данные\n`)
    .then((path) => {
      return access(path, fs.constants.F_OK).then(
          () => askForRewrite(path),
          () => Promise.resolve(path)
      );
    });
}

function askForRewrite(path) {
  return promptQuestion(`\nТакой файл уже существует. Перезаписать? [yes, no]\n`)
    .then((answer) => {
      if (answer === `yes` || answer === `Y` || answer === `y`) {
        return Promise.resolve(path);
      }

      return askForPath();
    });
}

module.exports = {
  name: CommandsNameList.GENERATE_ENTITY,

  execute(paramEntitiesNumber, paramPath) {
    if (!paramEntitiesNumber || isNaN(paramEntitiesNumber)) {
      return askForNumberAndPath()
        .then(({promptedPath, promptedNumber}) => createFileWithEntities(promptedNumber, promptedPath));
    }

    if (!paramPath) {
      return askForPath().then((promptedPath) => createFileWithEntities(paramEntitiesNumber, promptedPath));
    }

    return createFileWithEntities(paramEntitiesNumber, paramPath);
  }
};
