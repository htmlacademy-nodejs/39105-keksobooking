'use strict';
const generateCommand = require(`./../src/commands/user-commands/command-generate-entity`);
const assert = require(`assert`);
const fs = require(`fs`);
const {promisify} = require(`util`);

const readFile = promisify(fs.readFile);
const access = promisify(fs.access);
const unlink = promisify(fs.unlink);

describe(`Module GenerateCommand`, () => {
  it(`.execute should be a function`, () => {
    assert.strictEqual(typeof generateCommand.execute, `function`);
  });

  it(`should fail on non-existed folder`, (done) => {
    const fileName = `./nonExistedFolder/test-entity.json`;
    generateCommand.execute(fileName).then(assert.fail, () => done());
  });

  const fileName = `./test-entity.json`;

  it(`should create a new file`, (done) => {
    generateCommand.execute(fileName)
      .then(() => {
        access(fileName);
        done();
      });
  });

  it(`file should be readable`, (done) => {
    readFile(fileName, `utf8`).then(() => done());
  });

  it(`test file should be deleted`, (done) => {
    unlink(fileName).then(() => done());
  });
});
