import data from '../database/data.json';
import { FluentSQLBuilder } from './fluentSQL.js';

const result = FluentSQLBuilder
  .for(data)
  .select(['name', 'company', 'phone', 'category', 'registered'])
  .where({
    registered: /^(2020|2019)/
  })
  .where({
    category: /^(security|developer)$/
  })
  .where({
    phone: /\((852|850|810)\)/
  })
  .orderBy('category')
  .limit(1)
  .build();

console.table(result);
