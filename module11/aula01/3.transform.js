import { Readable, Writable, Transform } from 'node:stream';
import { createWriteStream } from 'node:fs';
//fonte de dados
const readable = Readable({
  read() {
    for (let index = 0; index < 2; index++) {
      const person = { id: Date.now() + 1, name: 'Jean ' + index };
      const data = JSON.stringify(person);
      this.push(data);
    }

    //informa que os dados acabaram
    this.push(null);
  },
});

//processamento de dados

const mapFields = Transform({
  transform(chunk, encoding, callback) {
    const data = JSON.parse(chunk);
    const result = `${data.id},${data.name.toUpperCase()}\n`;

    callback(null, result);
  },
});

const mapHeaders = Transform({
  transform(chunk, encoding, callback) {
    this.counter = this.counter ?? 0;

    if (this.counter) {
      return callback(null, chunk);
    }

    this.counter += 1;

    callback(null, 'id,name\n'.concat(chunk));
  },
});

readable.pipe(mapFields).pipe(mapHeaders).pipe(createWriteStream('my.csv'));
