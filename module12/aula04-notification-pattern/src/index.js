import http from 'node:http';
import { statusCodes } from './util/http-status-codes.js';
import { HeroEntity } from './heroEntity.js';

async function handler(req, res) {
  for await (const data of req) {
    try {
      const parsedData = JSON.parse(data);

      if (Reflect.has(parsedData, 'connectionError')) {
        throw new Error('Connection To DATABASE has Failed');
      }

      const hero = new HeroEntity(parsedData);

      if (!hero.isValid()) {
        res.writeHead(statusCodes.Bad_Request);
        res.end(hero.notifications.join('\n'));

        continue;
      }

      console.log({ hero });

      res.writeHead(statusCodes.OK);
    } catch (error) {
      res.writeHead(statusCodes.Internal_Server_Error);
      console.log(error);
    } finally {
      res.end();
    }
  }
}

http
  .createServer(handler)
  .listen(3001, () => console.log('Server listening on port 3001'));

/**
 * curl -i localhost:3001 -X POST --data '{"name": "Vingador", "age": 80}'
 * curl -i localhost:3001 -X POST --data '{"name": "Vingador", "age": 18}'
 */
