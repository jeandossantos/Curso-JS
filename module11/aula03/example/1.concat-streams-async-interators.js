import axios from 'axios';
import { pipeline } from 'node:stream/promises';

const API_1 = 'http://localhost:3001';
const API_2 = 'http://localhost:4001';

const request = await Promise.all([
  axios({
    method: 'get',
    url: API_1,
    responseType: 'stream',
  }),
  axios({
    method: 'get',
    url: API_2,
    responseType: 'stream',
  }),
]);

const results = request.map(({ data }) => data);

// writable Stream
async function* writable(stream) {
  for await (const chunk of stream) {
<<<<<<< HEAD
    const name = chunk.match(/:"(?<name>.*)(?=-)/).groups.name;

    console.log(`[${name.toLowerCase()}] ${chunk}`);
=======
    const data = chunk;
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;

    console.log(`[${name.toLowerCase()}] ${data}`);
>>>>>>> e6584bea3b8876bf8c45635c9ad0958e4b7029d1
  }
}

//pass through
async function* merge(streams) {
  for (const readable of streams) {
    readable.setEncoding('utf8');

    for await (const chunk of readable) {
      for (const line of chunk.trim().split(/\n/)) {
        yield line;
      }
    }
  }
}

await pipeline(merge(results), writable);
//result[0].pipe(writable);
