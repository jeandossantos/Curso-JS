#!/usr/bin/env zx

// não funciona :(

import 'zx/globals';
import isSafe from 'safe-regex';
$.verbose = false;

await $`docker run -p 8080:80 -d nginx`;

await sleep(500);

const req = await $`curl --silent http://localhost:8080`;

console.log('req\n', req.stdout);

const containers = $`docker ps`;

const exp = /(?<containerId>\w+)\W+(?=nginx)/;

if (!isSafe(exp)) {
  throw new Error(`this $expression [${exp}] is not safe`);
}

const {
  groups: { containerId },
} = containers.toString().match(exp);

const logs = await $`docker logs ${containerId}`;
console.log('logs\n', logs.stdout);

const rm = await $`docker rm -f ${containerId}`;
console.log('rm -f\n', rm.stdout);
