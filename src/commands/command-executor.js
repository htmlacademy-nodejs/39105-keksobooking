'use strict';

const commandDefault = require(`./command-default`);
const commandError = require(`./command-error`);

const commandHelp = require(`./user-commands/command-help`);
const commandVersion = require(`./user-commands/command-version`);
const commandDescription = require(`./user-commands/command-description`);
const commandLicense = require(`./user-commands/command-license`);
const commandAuthor = require(`./user-commands/command-author`);
const commandGenerateEntity = require(`./user-commands/command-generate-entity`);

const namedCommandList = [
  commandHelp,
  commandVersion,
  commandDescription,
  commandLicense,
  commandAuthor,
  commandGenerateEntity
];

module.exports = {
  executeCommand(userCommandName, params) {
    if (!userCommandName) {
      return commandDefault.execute();
    }

    const userCommand = namedCommandList.find((existingCommand) => existingCommand.name === userCommandName);

    if (userCommand) {
      return userCommand.execute(...params);
    }

    return commandError.execute(userCommandName);
  }
};
