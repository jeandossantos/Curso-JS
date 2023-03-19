import { fork } from 'child_process';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import csvToJson from 'csvtojson';
import { Writable } from 'stream';

const database = './data/All_Pokemon.csv';

const PROCESS_COUNT = 30;
const backgroundFile = './src/backgroundTask.js';
const processes = new Map();
const replications = [];

for (let i = 0; i < PROCESS_COUNT; i++) {
  const child = fork(backgroundFile, [database]);

  child.on('exit', () => {
    console.log(`Process ${child.pid} exited`);
    processes.delete(child.pid);
  });

  child.on('error', (err) => {
    console.log(`Process ${child.pid} has an error`);
    process.exit(1);
  });

  child.on('message', (msg) => {
    if (replications.includes(msg)) return;

    console.log(`${msg} is replicated!`);
    replications.push(msg);
  });

  processes.set(child.pid, child);
}

function roundRobin(array, index = 0) {
  return function () {
    if (index >= array.length) index = 0;

    return array[index++];
  };
}

const getProcess = roundRobin([...processes.values()]);

for (let i = 0; i < 100; i++) console.count(getProcess().pid);
console.log(`starting with ${processes.size} processes`);

await pipeline(
  createReadStream(database),
  csvToJson(),
  new Writable({
    write(chunk, enc, cb) {
      const chosenProcess = getProcess();
      chosenProcess.send(JSON.parse(chunk));

      cb();
    },
  })
);
