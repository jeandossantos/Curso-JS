import { createServer } from 'node:http';
import Events from 'node:events';
import crypto from 'crypto';

const myEvents = new Events();

function getBytes() {
  return crypto.randomBytes(10000);
}

function onData() {
  getBytes();

  const items = [];

  setInterval(function myInterval() {
    items.push(Date.now());
  });
}

createServer(function handle(req, res) {
  myEvents.on('data', onData);
  myEvents.emit('data', Date.now());

  res.end('ok');
}).listen(3001, console.log('Express server listening on port 3001'));
