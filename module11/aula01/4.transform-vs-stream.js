import { Duplex, Transform } from 'node:stream';

let count = 0;

const server = new Duplex({
  objectMode: true, //faz não precisar trabalhar com Buffer. mas gasta mais memória
  encoding: 'utf8',
  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push(`My name is Jean[${count}] `);
        return;
      }

      clearInterval(intervalContext);
      this.push(null);
    };

    setInterval(function () {
      everySecond(this);
    });
  },
  write(chunk, encoding, callback) {
    console.log(`[writable]: saving ${chunk}`);
    callback();
  },
});
//prova que são canais diferentes
//.write aciona o write do duplex
server.write('[Duplex]: this is a writable!\n');
// .on loga o que rolou no .push do readable
//server.on('data', (chunk) => console.log('[readable]' + chunk));

//o .push permite você enviar mais dados
server.push('[Duplex]: this is also a readable!\n');

const transformToUpperCase = new Transform({
  objectMode: true, //faz não precisar trabalhar com Buffer
  transform(chunk, encoding, cb) {
    cb(null, chunk.toUpperCase());
  },
});

// transform também é Duplex, mas não possuem comunicação independente
transformToUpperCase.write('[transform]: hello from write!');
// .push ignora o que o tem na função transform
transformToUpperCase.push('[transform]: hello from push!\n');

//server.pipe(process.stdout);

server.pipe(transformToUpperCase).pipe(server);
