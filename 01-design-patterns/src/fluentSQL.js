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

  #performSelect(item) {
    if(!this.#select || !this.#select.length) return item;

    const currentItem = {}

    const entries = Object.entries(item);

    for(const [key, value] of entries) {
      if(this.#select.includes(key)) {
        currentItem[key] = value;
      }
    }

    return currentItem;
  }

  #performOrderBy(results) {
    if(!this.#orderBy) return results;

    return results.sort((prev, next) => {
      return prev[this.#orderBy].localeCompare(next[this.#orderBy]);
    })
  }

  build() {
    const results = [];

    for(const item of this.#database) {
      if(!this.#performWhere(item)) {
        continue;
      }

      const currentItem = this.#performSelect(item);
      results.push(currentItem);

      if(this.#performLimit(results)) {
        break;
      }
    }

    const finalResult = this.#performOrderBy(results);

    return finalResult;
  }
}