import { MongoClient } from 'mongodb';
import { createServer } from 'http';
import { promisify } from 'util';

async function dbConnect() {
  const client = new MongoClient('mongodb://localhost:27017');

  await client.connect();

  console.log('connected to MongoDB');

  const db = client.db('comics');

  return {
    collections: { heroes: db.collection('heroes') },
    client,
  };
}

const { client, collections } = await dbConnect();

async function handle(req, res) {
  try {
    for await (const data of req) {
      const hero = JSON.parse(data);

      await collections.heroes.insertOne({
        ...hero,
        updatedAt: new Date().toISOString(),
      });

      const heroes = await collections.heroes.find().toArray();

      res.writeHead(201);
      res.write(JSON.stringify(heroes));
    }
  } catch (error) {
    console.log('a request error has happened', error);
    res.writeHead(500);
    res.write(
      JSON.stringify({
        message: 'Internal server error',
      })
    );
  } finally {
    res.end();
  }
}

const server = createServer(handle).listen(3001, () =>
  console.log('server listening on port 3001 and process ', process.pid)
);

/**
 * curl -i localhost:3001 -X POST --data '{"name": "Batman", "age": 80}'
 */

const onStop = async (signal) => {
  console.info(`\n${signal} was signal received`);

  console.log('Http server stopped');
  await promisify(server.close.bind(server))();

  await client.close();
  console.log('Mongodb server stopped');

  process.exit(0);
};

['SIGINT', 'SIGTERM'].forEach((event) => process.on(event, onStop));
