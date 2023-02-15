import axios from 'axios';
import { PassThrough, Writable } from 'node:stream';

const API_1 = 'http://localhost:3001';
const API_2 = 'http://localhost:4001';

const request = await Promise.all([
  axios({
    baseURL: API_1,
    responseType: 'stream',
  }),
  axios({
    baseURL: API_2,
    responseType: 'stream',
  }),
]);

const results = request.map(({ data }) => data);

const writable = new Writable({
  write(chunk, enc, cb) {
    const data = chunk.toString().replace('\n', '');
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;

    console.log(`[${name.toLowerCase()}] ${data}`);

    cb();
  },
});

function merge(streams) {
  return streams.reduce((prev, current, index, array) => {
    current.pipe(prev, { end: false });

    current.on('end', () => array.every((s) => s.ended) && prev.end());

    return prev;
  }, new PassThrough());
}

merge(results).pipe(writable);
//result[0].pipe(writable);
