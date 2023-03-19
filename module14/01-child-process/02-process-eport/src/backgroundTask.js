import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import csvToJson from 'csvtojson';
import { Transform, Writable } from 'stream';
import { setTimeout } from 'timers/promises';
const database = process.argv[2];

async function onMessage(msg) {
  const firsTimeRun = [];

  await pipeline(
    createReadStream(database),
    csvToJson(),
    new Transform({
      transform(chunk, enc, cb) {
        const data = JSON.parse(chunk);

        if (data.Name !== msg.Name) return cb();

        if (firsTimeRun.includes(msg.Name)) {
          return cb(null, msg.Name);
        }

        firsTimeRun.push(msg.Name);
        cb();
      },
    }),
    new Writable({
      write(chunk, enc, cb) {
        // console.log(chunk);
        if (!chunk) return cb();

        process.send(chunk.toString());

        cb();
      },
    })
  );
}

process.on('message', onMessage);

//console.log(`I'm ready ${database}`);

// para fala que o processo pode morrer após inatividade
setTimeout(10000);
process.channel.unref();
