// process.stdin
//   .pipe(process.stdout)
//   .on('data', (msg) => console.log('data', msg))
//   .on('error', (msg) => console.log('error'))
//   .on('end', (_) => console.log('end'))
//   .on('close', (_) => console.log('close'));

// node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"

//node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import { createReadStream, readFileSync } from 'node:fs';
import http from 'node:http';

http
  .createServer((req, res) => {
    // const file = readFileSync('big.file').toString();

    // res.write(file);
    // res.end();

    createReadStream('big.file').pipe(res);
  })
  .listen(3001, () => console.log('listening on port 3001'));

//curl localhost:3001 -o output.txt
