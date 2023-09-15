const fs = require('fs');
const path = require('path');

const getMedia = (request, response, contentType, pathname) => {
  const file = path.resolve(__dirname, pathname);

  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        response.writeHead(404);
      }
      return response.end(err);
    }

    let { range } = request.headers;

    if (!range) {
      range = 'bytes=0-';
    }

    const positions = range.replace(/bytes=/, '').split('-');

    let start = parseInt(positions[0], 10);

    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    if (start > end) {
      start = end - 1;
    }

    const chunkSize = (end - start) + 1;

    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': contentType,
    });

    const stream = fs.createReadStream(file, { start, end });

    stream.on('open', () => {
      stream.pipe(response);
    });

    stream.on('error', (streamErr) => {
      response.end(streamErr);
    });

    return stream;
  });
};

const getParty = (request, response) => {
  getMedia(request, response, 'video/mp4', '../client/party.mp4');
};

const getBling = (request, response) => {
  getMedia(request, response, 'audio/mpeg', '../client/bling.mp3');
};

const getBird = (request, response) => {
  getMedia(request, response, 'video/mp4', '../client/bird.mp4');
};

module.exports = {
  getParty,
  getBling,
  getBird,
};
