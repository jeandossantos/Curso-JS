import { parentPort } from 'worker_threads';
import axios from 'axios';
import sharp from 'sharp';
import workerPool from 'workerpool';

async function downloadFile(url) {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
  });

  return response.data;
}

export default async function onMessage({ image, background }) {
  const firstLayer = await sharp(await downloadFile(image))
    // .grayscale()
    // .rotate(90)
    .toBuffer();

  const secondLayer = await sharp(await downloadFile(background))
    .composite([{ input: firstLayer, gravity: sharp.gravity.south }])
    .toBuffer();

  workerPool.workerEmit('Work task completed');
  return secondLayer.toString('base64');
  //parentPort.postMessage(secondLayer.toString('base64'));
}

workerPool.worker({ onMessage });

//parentPort.on('message', onMessage);
