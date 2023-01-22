import MongoDB from 'mongodb';

export default class MongoDBStrategy {
  #instance;

  constructor(connectionString) {
    const { pathname } = new URL(connectionString);

    this.connectionString = connectionString.replace('pathname', '');
    this.db = pathname.replace(/^\W/, '');
    this.collection = 'warriors';
  }

  async connect() {
    const client = new MongoDB.MongoClient(this.connectionString);

    await client.connect();
    const db = client.db(this.db);
    const collection = db.collection(this.collection);

    this.#instance = collection;
  }

  async create(item) {
    return this.#instance.insertOne(item);
  }

  async read(item) {
    return this.#instance.find(item).toArray();
  }
}
