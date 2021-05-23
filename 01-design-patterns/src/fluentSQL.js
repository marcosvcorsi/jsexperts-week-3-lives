export class FluentSQLBuilder {
  #database = [];
  #select = [];
  #limit = 0;
  #where = [];
  #orderBy = '';

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
    const conditions = Object.entries(query).map(([prop, selectedValue]) => {
      const filter = selectedValue instanceof RegExp ? 
        selectedValue : new RegExp(selectedValue);
      
      return {
        prop,
        filter
      }
    })

    for(const condition of conditions) {
      this.#where.push(condition);
    }

    return this;
  }

  orderBy(field) {
    this.#orderBy = field;

    return this;
  }

  #performLimit(results) {
    return this.#limit && results.length === this.#limit;
  }

  #performWhere(item) {
    for(const { prop, filter } of this.#where) {
      if(!filter.test(item[prop])) return false;
    }

    return true;
  }

  build() {
    const results = [];

    for(const item of this.#database) {
      if(!this.#performWhere(item)) {
        continue;
      }

      results.push(item);

      if(this.#performLimit(results)) {
        break;
      }
    }

    return results;
  }
}