export class FluentSQLBuilder {
  #database = [];

  constructor({ database }) {
    this.#database = database;
  }

  static for(database) {
    return new FluentSQLBuilder({ database })
  }
}