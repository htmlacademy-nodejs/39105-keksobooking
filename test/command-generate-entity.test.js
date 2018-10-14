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

  it(`should be a function`, () => {
    assert.strictEqual(typeof generateCommand.execute, `function`);
  });

  it(`should fail on non-existed folder`, (done) => {
    const fileName = `./nonExistedFolder/test-entity.json`;
    generateCommand.execute(ENTITIES_NUMBER, fileName).then(() => done(new Error()), () => done());
  });

  it(`should create a file with exact number of entities`, (done) => {
    generateCommand.execute(ENTITIES_NUMBER, FILE_NAME)
      .then(() => readFile(FILE_NAME))
      .then((data) => {
        const fileData = JSON.parse(data);
        assert(fileData.length === ENTITIES_NUMBER);
        done();
      })
      .catch((e) => done(e));
  });

  after(() => {
    unlink(FILE_NAME);
  });
});
