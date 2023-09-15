const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const page2 = fs.readFileSync(`${__dirname}/../client/client2.html`);
const page3 = fs.readFileSync(`${__dirname}/../client/client3.html`);

const getHTML = (request, response, path) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(path);
  response.end();
};

const getIndex = (request, response) => {
  getHTML(request, response, index);
};

const getPage2 = (request, response) => {
  getHTML(request, response, page2);
};

const getPage3 = (request, response) => {
  getHTML(request, response, page3);
};

module.exports = {
  getIndex,
  getPage2,
  getPage3,
};
