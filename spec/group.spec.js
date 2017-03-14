'use strict';

const q = require('../src/object-sql.js');
const usersFixture = require('./fixtures/users.js');

// Helpers
const plainUser = (user) => ({
  id: user.id,
  name: user.name
});

// Spec
describe('Grouping tests', () => {

  it('should group simple integer arrays', () => {
    const a = [1, 2, 2, 1, 3, 2, 3, 1];
    const r = q().from(a).group(n => n).execute();

    expect(r).toEqual([[1, [1,1,1]], [2, [2,2,2]], [3, [3,3]]])
  });

  it('should group data objects', () => {
    const users = usersFixture();

    const eyeColor = (user) => user.eye_color;
    const isActive = (user) => user.is_active;

    const result = q()
      .select()
      .from(users)
      .group(eyeColor)
      .where(isActive)
      .execute();

      const expected = [
        ['blue', [{
          id: 3,
          country_id: 2,
          is_active: true,
          age: 26,
          eye_color: 'blue',
          name: 'Kelly Barr'
        }, {
          id: 7,
          country_id: 3,
          is_active: true,
          age: 40,
          eye_color: 'blue',
          name: 'Gloria Love'
        }]],
        ['brown', [{
          id: 5,
          country_id: 2,
          is_active: true,
          age: 39,
          eye_color: 'brown',
          name: 'Garcia Hill'
        }, {
          id: 10,
          country_id: 1,
          is_active: true,
          age: 40,
          eye_color: 'brown',
          name: 'Chandra Jones'
        }]]
      ];

    expect(result).toEqual(expected);
  });

  it('should group data objects in multiple levels', () => {
    const users = usersFixture();

    const eyeColor = (user) => user.eye_color;
    const isActive = (user) => user.is_active;
    const countryId = (user) => user.country_id;

    const result = q()
      .select()
      .from(users)
      .group(eyeColor, countryId)
      .group(isActive)
      .execute();

      const expected = [
        ['brown', [
          [1, [
            [false, [{
              id: 1,
              country_id: 1,
              is_active: false,
              age: 36,
              eye_color: 'brown',
              name: 'Sheryl Marsh'
            }]],
            [true, [{
              id: 10,
              country_id: 1,
              is_active: true,
              age: 40,
              eye_color: 'brown',
              name: 'Chandra Jones'
            }]]
          ]],
          [2, [
            [true, [{
              id: 5,
              country_id: 2,
              is_active: true,
              age: 39,
              eye_color: 'brown',
              name: 'Garcia Hill'
            }]]
          ]]
        ]],
        ['blue', [
          [1, [
            [false, [{
              id: 2,
              country_id: 1,
              is_active: false,
              age: 30,
              eye_color: 'blue',
              name: 'Burton Mcclain'
            }, {
              id: 6,
              country_id: 1,
              is_active: false,
              age: 23,
              eye_color: 'blue',
              name: 'Chelsea Thomas'
            }]]
          ]],
          [2, [
            [true, [{
              id: 3,
              country_id: 2,
              is_active: true,
              age: 26,
              eye_color: 'blue',
              name: 'Kelly Barr'
            }]],
            [false, [{
              id: 9,
              country_id: 2,
              is_active: false,
              age: 28,
              eye_color: 'blue',
              name: 'Deborah Hines'
            }]]
          ]],
          [3, [
            [false, [{
              id: 4,
              country_id: 3,
              is_active: false,
              age: 25,
              eye_color: 'blue',
              name: 'Gill Marks'
            }]],
            [true, [{
              id: 7,
              country_id: 3,
              is_active: true,
              age: 40,
              eye_color: 'blue',
              name: 'Gloria Love'
            }]]
          ]]
        ]],
        ['green', [
          [3, [
            [false, [{
              id: 8,
              country_id: 3,
              is_active: false,
              age: 40,
              eye_color: 'green',
              name: 'Rosario Henderson'
            }]]
          ]]
        ]]
      ];

    expect(result).toEqual(expected);
  });
});
