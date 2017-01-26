'use strict';

const q = require('../src/object-sql.js');

describe('Error tests', () => {
  it('should throw Error for illegal method calls', () => {
    expect(() => {
      q().select().from([]).from([]).execute();
    }).toThrow(new Error('Tables already defined.'));
  });
});
