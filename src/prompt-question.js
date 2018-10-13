'use strict';

const readline = require(`readline`);

module.exports = {
  promptQuestion(question) {
    const readlineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      readlineInterface.question(question, (answer) => {
        readlineInterface.close();
        resolve(answer);
      });
    });
  }
};
