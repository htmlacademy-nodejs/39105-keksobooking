'use strict';
const fs = require(`fs`);
const path = require(`path`);
const {promisify} = require(`util`);
const readFile = promisify(fs.readFile);
const readDir = promisify(fs.readdir);
const access = promisify(fs.access);
const lstat = promisify(fs.lstat);

const STATIC_DIR_PATH = path.resolve(__dirname, `../static/`);

const fileContentTypeMap = {
  [`.css`]: `text/css`,
  [`.html`]: `text/html; charset=UTF-8`,
  [`.jpg`]: `image/jpeg`,
  [`.png`]: `image/png`,
  [`.ico`]: `image/x-icon`
};

function getFileContentType(filename) {
  let extension = path.parse(filename).ext;
  return fileContentTypeMap[extension]
    ? fileContentTypeMap[extension]
    : `text/plain`;
}

async function readStaticFile(staticUrl, res) {
  const data = await readFile(staticUrl);
  res.writeHead(200, `OK`, {[`Content-Type`]: getFileContentType(staticUrl)});
  res.end(data);
}

async function readStaticDir(absoluteUrl, res) {
  const data = await readDir(absoluteUrl);
  res.writeHead(200, `OK`, {[`Content-Type`]: `text/html; charset=UTF-8`});
  const innerLinks = data.map((item) => {
    const staticLink = path.relative(STATIC_DIR_PATH, `${absoluteUrl}/${item}`);
    return `<li><a href='/${staticLink}'>./${item}</a></li>`;
  }).join(``);
  res.end(`<ul>${innerLinks}</ul>`);
}

module.exports = {
  async serveFile(staticUrl, res) {

    if (staticUrl === `/`) {
      staticUrl = `/index.html`;
    }

    const absoluteUrl = `${STATIC_DIR_PATH}${staticUrl}`;
    try {
      await access(absoluteUrl, fs.constants.F_OK);
    } catch (e) {
      res.writeHead(404, `Not Found`);
      res.end(`404`);
    }

    try {
      const dirent = await lstat(absoluteUrl);

      if (dirent.isDirectory()) {
        await readStaticDir(absoluteUrl, res);
      } else {
        await readStaticFile(absoluteUrl, res);
      }

    } catch (e) {
      res.statusCode = 500;
      res.end(e.toString());
    }
  }
};
