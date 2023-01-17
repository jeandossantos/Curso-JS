export class UserRepository {
  constructor({ dbConnection }) {
    this.dbConnection = dbConnection;
  }

  async find(query) {
    return await this.dbConnection.find(query);
  }
}
