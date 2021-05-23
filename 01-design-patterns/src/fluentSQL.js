export class FluentSQLBuilder {
  #database = [];
  #select = [];
  #limit = 0;
  #where = [];

  constructor({ database }) {
    this.#database = database;
  }

  static for(database) {
    return new FluentSQLBuilder({ database })
  }

  select(props) {
    this.#select = props;

    return this;
  }

  limit(max) {
    this.#limit = max;

    return this;
  }

  where(query) {
    this.#where = query;

    return this;
  }

  build() {
    const results = [];

    return results;
  }
}