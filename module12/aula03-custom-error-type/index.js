import http from 'node:http';
import { BusinessError } from './errors/businessError.js';
import { statusCodes } from './util/http-status-codes.js';

function validateHero(hero) {
  //simulando um outro erro, por exemplo, banco de dados

  if (Reflect.has(hero, 'connectionError')) {
    throw new Error('DATABASE error on connection');
  }

  if (hero.name?.length < 4) {
    throw new BusinessError('hero name must be at least 4 characters');
  }

  if (hero.age < 20) {
    throw new BusinessError('age must be 20 or higher than 20');
  }
}

async function handler(req, res) {
  for await (const data of req) {
    try {
      const hero = JSON.parse(data);

      validateHero(hero);

      console.log({ hero });

      res.writeHead(statusCodes.OK);
    } catch (error) {
      if (error instanceof BusinessError) {
        res.writeHead(statusCodes.Bad_Request);
        res.end(error.message);

        continue;
      }

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
