'use strict';

require(`colors`);
const commandExecutor = require(`./commands/command-executor`);

commandExecutor.executeCommand(process.argv.slice(2)[0]);
