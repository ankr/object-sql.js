'use strict';

const q = require('../src/object-sql.js');

describe('Basic functionality', () => {
  it('should pass simple tests', function() {
    let data = ['a', 'b', 'c'];
    expect(q().select().from(data).execute()).toEqual(data);
    expect(q().select().execute()).toEqual([]);
    expect(q().from(data).execute()).toEqual(data);
    expect(q().execute()).toEqual([]);
    expect(q().from(data).select().execute()).toEqual(data);
  });
});
