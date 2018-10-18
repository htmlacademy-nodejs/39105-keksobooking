'use strict';
const http = require(`http`);
const serveFile = require(`../../serve-static-file`).serveFile;
const CommandsNameList = require(`./../commands-name-list`).CommandsNameList;

const hostname = `127.0.0.1`;

module.exports = {
  name: CommandsNameList.SERVER,
  execute(port) {
    const server = http.createServer((req, res) => {
      serveFile(req.url, res);
    });

    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port || `3000`}/`);
    });
  }
};
