import ContextStrategy from './base/contextStrategy.mjs';
import MongoDBStrategy from './strategies/mongoDBStrategy.mjs';
import PostgresStrategy from './strategies/postgresStrategy.mjs';

const postgresConnectionString =
  'postgres://postgres:94198380@localhost:5432/heroes';
const mongoDBConnectionString = 'mongodb://127.0.0.1:27017/heroes';

const postgresContext = new ContextStrategy(
  new PostgresStrategy(postgresConnectionString)
);
await postgresContext.connect();

const mongoDBContext = new ContextStrategy(
  new MongoDBStrategy(mongoDBConnectionString)
);

await mongoDBContext.connect();

const data = [
  {
    name: 'erickWendel',
    type: 'transaction',
  },
  {
    name: 'mariaSilva',
    type: 'activityLog',
  },
];

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoDBContext,
};

for (let { type, name } of data) {
  const context = contextTypes[type];

  await context.create({ name: name + Date.now() });

  console.log(type, context.dbStrategy.constructor.name);
  console.log(await context.read());
}
