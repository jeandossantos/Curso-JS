import { initializeServer } from './server.js';

import os from 'node:os';
import cluster from 'cluster';

(() => {
  if (!cluster.isPrimary) {
    initializeServer();
    return;
  }

  const cpusNumber = os.cpus().length;

  console.log(`Primary ${process.pid} is running`);
  console.log(`Fork server for ${cpusNumber} cpus\n`);

  for (let i = 0; i < cpusNumber; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${code} died!`);
      cluster.fork();
    }
  });
})();
