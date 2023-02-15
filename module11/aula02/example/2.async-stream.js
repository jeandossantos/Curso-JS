import { pipeline } from 'node:stream/promises';
import { setTimeout } from 'timers/promises';

async function* myCustomReadable(stream) {
  yield Buffer.from('This is my');
  await setTimeout(100);
  yield Buffer.from('custom readable');
}

async function* myCustomTransform(stream) {
  for await (const chunk of stream) {
    yield chunk.toString().replace(/\s/g, '_');
  }
}

async function* myCustomDuplex(stream) {
  let bytesRead = 0;
  const wholeString = [];

  for await (const chunk of stream) {
    console.log('[Duplex writable]', chunk);
    bytesRead += chunk.length;
    wholeString.push(chunk);
  }

  yield `wholeString ${wholeString.join()}`;
  yield `bytesRead ${bytesRead}`;
}

async function* myCustomWritable(stream) {
  for await (const chunk of stream) {
    console.log('[writable]', chunk);
  }
}

try {
  const controller = new AbortController();
  setImmediate(() => controller.abort());

  await pipeline(
    myCustomReadable,
    myCustomTransform,
    myCustomDuplex,
    myCustomWritable,
    {
      signal: controller.signal,
    }
  );
} catch (error) {
  console.error(error.message);
}

console.log('precess finished');
