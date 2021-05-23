import { FluentSQLBuilder } from "../src/fluentSQL";

const data = [
  {
    id: 0,
    name: 'anyname',
    category: 'anycategory'
  },
  {
    id: 1,
    name: 'othername',
    category: 'othercategory'
  },
  {
    id: 2,
    name: 'name',
    category: 'anycategory'
  },
]

describe('Test suite for FluentSQL Builder', () => {
  it('should return a FluentSQLBuilder instance', () => {
    const result = FluentSQLBuilder.for(data);

    expect(result).toBeInstanceOf(FluentSQLBuilder);
    expect(result).toEqual(new FluentSQLBuilder({ database: data }));
  })

  it('should return the empty array instance', () => {
    const result = FluentSQLBuilder.for([]).build();

    expect(result).toEqual([]);
  })

  it('should given a collection with limit results', () => {
    const limit = 1;

    const result = FluentSQLBuilder.for(data).limit(1).build();

    expect(result).toHaveLength(limit);
    expect(result).toEqual([data[0]]);
  })

  it('should filter data with where', () => {
    const query =  {
      category: /^any/
    };

    const expected = data.filter(({ category }) => category.slice(0,3) === 'any')

    const result = FluentSQLBuilder.for(data).where(query).build();

    expect(result).toEqual(expected);
  })

  it('should return only specific fields', () => {

  })

  it('should return order results by specific fields', () => {
    
  })

  it('should combine operations', () => {

  })
});