'use strict';

const q = require('../src/object-sql.js');

describe('Having tests', () => {
  it('should work with simple values', function() {
    const data = [1, 1, 2, 3, 2, 1];

    const result = q()
      .select()
      .from(data)
      .group(n => n)
      .having((row) => row[1].length > 1)
      .execute();

    const expected = [[1, [1, 1, 1]], [2, [2, 2]]];

    expect(result).toEqual(expected);
  });
});
