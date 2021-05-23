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
    category: 'othercategory'
  },
]

describe('Test suite for FluentSQL Builder', () => {
  it('should return a FluentSQLBuilder instance', () => {
    const result = FluentSQLBuilder.for(data);

    expect(result).toBeInstanceOf(FluentSQLBuilder);
    expect(result).toEqual(new FluentSQLBuilder({ database: data }));
  })

  it('should return the empty array instance', () => {
    const result = FluentSQLBuilder.for(data).build();

    expect(result).toEqual([]);
  })

  it('should given a collection with limit results', () => {

  })

  it('should filter data with where', () => {
    
  })

  it('should return only specific fields', () => {

  })

  it('should return order results by specific fields', () => {
    
  })

  it('should combine operations', () => {

  })
});