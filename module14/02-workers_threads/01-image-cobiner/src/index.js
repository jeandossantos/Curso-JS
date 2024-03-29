import { createServer } from 'http';
import { parse, fileURLToPath } from 'url';
import { Worker } from 'worker_threads';
import { dirname } from 'path';
//precisa ser importado antes de usar no worker_threads no sharp dessa função
import sharp from 'sharp';
import workerPool from 'workerpool';

const currentFolder = dirname(fileURLToPath(import.meta.url));
const workerName = 'worker.js';
const pool = workerPool.pool(`${currentFolder}/${workerName}`);

async function combineImages(images) {
  const abortController = new AbortController();
  const { signal } = abortController;

  try {
    const result = await pool.exec('onMessage', [images], {
      on: (msg) => console.log(msg),
    });

    await pool.terminate();
    return result;
  } catch (error) {
    console.log(error.message);
  }

  //   return new Promise((resolve, reject) => {
  //     const worker = new Worker(`${currentFolder}/${workerName}`);
  //     worker.postMessage(images);
  //     worker.once('message', resolve);
  //     worker.once('error', reject);
  //     worker.once('exit', (code) => {
  //       if (code !== 0) {
  //         return reject(`Thread ${worker.threadId} has stopped!`);
  //       }

  //       console.log(`Thread ${worker.threadId} has exited!`);
  //     });
  //   });
}

createServer(async function (req, res) {
  if (req.url.includes('joinImages')) {
    const {
      query: { image, background },
    } = parse(req.url, true);

    const imageBase64 = await combineImages({ image, background });

    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(
      `<img style="width: 100%; height:100%" src="data:image/jpeg;base64,${imageBase64}"/>`
    );
  }

  return res.end('ok');
}).listen(3001, () => console.log('Server listening on port 3001'));
