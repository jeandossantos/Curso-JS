import http from 'node:http';
import { appendFile } from 'fs/promises';

export function initializeServer() {
  async function handle(req, res) {
    await appendFile('./log.txt', `processed by ${process.pid}\n`);

    const result = Array.from({ length: 1e3 }, () =>
      Math.floor(Math.random() * 40)
    ).reduce((current, next) => current + next, 0);

    return res.end(result.toString());
  }

  http
    .createServer(handle)
    .listen(3001, console.log(`Running at port 3001 and pid ${process.pid}`));

  setTimeout(() => process.exit(1), Math.random() * 1e4);
}
