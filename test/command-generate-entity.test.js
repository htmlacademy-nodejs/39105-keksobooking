'use strict';
const generateCommand = require(`./../src/commands/user-commands/command-generate-entity`);
const assert = require(`assert`);
const fs = require(`fs`);
const {promisify} = require(`util`);

const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

describe(`Module GenerateCommand`, () => {
  const ENTITIES_NUMBER = 10;
  const FILE_NAME = `./test-entity.json`;
  let fileData;

  it(`.execute should be a function`, () => {
    assert.strictEqual(typeof generateCommand.execute, `function`);
  });

  it(`should fail on non-existed folder`, (done) => {
    const fileName = `./nonExistedFolder/test-entity.json`;
    generateCommand.execute(ENTITIES_NUMBER, fileName).then(assert.fail, () => done());
  });

  it(`should create a new readable file`, (done) => {
    generateCommand.execute(ENTITIES_NUMBER, FILE_NAME)
      .then(() => readFile(FILE_NAME))
      .then((data) => {
        fileData = JSON.parse(data);
      })
      .then(() => done());
  });

  it(`file should contain exact number of entities`, () => {
    assert(fileData.length === ENTITIES_NUMBER);
  });

  it(`test file should be deleted`, (done) => {
    unlink(FILE_NAME).then(() => done());
  });
});
