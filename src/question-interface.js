'use strict';

const readline = require(`readline`);

class QuestionInterface {
  ask(question) {
    if (!this.readlineInterface) {
      throw Error(`First you need to create interface`);
    }

    return new Promise((resolve) => {
      this.readlineInterface.question(question, (answer) => resolve(answer));
    });
  }

  createInterface() {
    this.readlineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  closeInterface() {
    if (this.readlineInterface) {
      this.readlineInterface.close();
      this.readlineInterface = null;
    }
  }
}

const questionInterface = new QuestionInterface();

module.exports = {
  questionInterface
};
