'use strict';

require(`colors`);
const commandExecutor = require(`./src/commands/command-executor`);

const commandName = process.argv.slice(2)[0];
const params = process.argv.slice(3);
commandExecutor.executeCommand(commandName, params);
