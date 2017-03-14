'use strict';

const q = require('../src/object-sql.js');
const countriesFixture = require('./fixtures/countries.js');
const usersFixture = require('./fixtures/users.js');

describe('Join tests', () => {
  it('should join simple flat arrays', () => {
    const a = [1, 2, 3];
    const b = [4, 5, 6];

    const result = q()
      .select()
      .from(a, b)
      .execute();

    expect(result).toEqual([
      [1, 4],
      [1, 5],
      [1, 6],
      [2, 4],
      [2, 5],
      [2, 6],
      [3, 4],
      [3, 5],
      [3, 6]
    ]);
  });

  it('should join simple flat arrays with conditions', () => {
    const a = [1, 2, 3];
    const b = [4, 5, 6];

    const result = q()
      .select()
      .from(a, b)
      .where((t) => t[1] < 6)
      .execute();

    expect(result).toEqual([
      [1, 4],
      [1, 5],
      [2, 4],
      [2, 5],
      [3, 4],
      [3, 5]
    ]);
  });

  it('should join users and countries', () => {
    const countries = countriesFixture();
    const users = usersFixture();

    const userWithNestedCounty = (tables) => {
      const user = tables[0];
      const country = tables[1];
      return {
        id: user.id,
        name: user.name,
        country: {
          id: country.id,
          name: country.name
        }
      }
    };
    const activeUsers = (tables) => tables[0].is_active === true;
    const joinUsersCountries = (tables) => tables[0].country_id === tables[1].id;
    const countryIdDescending = (a, b) => b[0].country_id - a[0].country_id;

    const result = q()
      .select(userWithNestedCounty)
      .from(users, countries)
      .where(activeUsers)
      .where(joinUsersCountries)
      .order(countryIdDescending)
      .execute();

    const expected = [
      {
        id: 7,
        name: 'Gloria Love',
        country: {
            id: 3,
            name: 'Denmark'
        }
      }, {
        id: 3,
        name: 'Kelly Barr',
        country: {
            id: 2,
            name: 'England'
        }
      }, {
        id: 5,
        name: 'Garcia Hill',
        country: {
            id: 2,
            name: 'England'
        }
      }, {
        id: 10,
        name: 'Chandra Jones',
        country: {
            id: 1,
            name: 'USA'
        }
      }
    ];

    expect(result).toEqual(expected);
  });
});
