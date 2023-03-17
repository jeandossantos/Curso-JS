import http from 'http';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import crypto from 'crypto';

http
  .createServer(function (req, res) {
    const filename = `filename-${crypto.randomUUID()}`;

    pipeline(req, createWriteStream(filename));

    res.end('upload complete successfully');
  })
  .listen(3001, () => console.log('Server listening on port 3001'));
