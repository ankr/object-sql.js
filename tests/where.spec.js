'use strict';

const q = require('../src/object-sql.js');
const usersFixture = require('./fixtures/users.js');

// Helpers
const activeUsers = (user) => user.is_active;
const blueEyes = (user) => user.eye_color === 'blue';
const oldEnough = (user) => user.age > 30;
const plainUser = (user) => ({
  id: user.id,
  name: user.name
});
const extendedUser = (user) => ({
  id: user.id,
  is_active: user.is_active,
  name: user.name,
  eye_color: user.eye_color
});

// Specs
describe('Where spec', () => {

  it('should handle single condition', () => {
    const users = usersFixture();

    const result = q()
      .select(plainUser)
      .from(users)
      .where(activeUsers)
      .execute();

    const expected = [
      { id: 3, name: 'Kelly Barr' },
      { id: 5, name: 'Garcia Hill' },
      { id: 7, name: 'Gloria Love' },
      { id: 10, name: 'Chandra Jones' }
    ];

    expect(result).toEqual(expected);
  });

  it('should handle AND conditions', () => {
    const users = usersFixture();

    const result = q()
      .select(extendedUser)
      .from(users)
      .where(activeUsers)
      .where(blueEyes) // AND
      .execute();

    const expected = [
      { id: 3, is_active: true, name: 'Kelly Barr', eye_color: 'blue' },
      { id: 7, is_active: true, name: 'Gloria Love', eye_color: 'blue' }
    ];

    expect(result).toEqual(expected);
  });

  it('should handle OR conditions', () => {
    const users = usersFixture();

    const result = q()
      .select(extendedUser)
      .from(users)
      .where(activeUsers, blueEyes) // OR
      .execute();

    const expected =  [
      {id: 2, is_active: false, name: 'Burton Mcclain', eye_color: 'blue'},
      {id: 3, is_active: true, name: 'Kelly Barr', eye_color: 'blue'},
      {id: 4, is_active: false, name: 'Gill Marks', eye_color: 'blue'},
      {id: 5, is_active: true, name: 'Garcia Hill', eye_color: 'brown'},
      {id: 6, is_active: false, name: 'Chelsea Thomas', eye_color: 'blue'},
      {id: 7, is_active: true, name: 'Gloria Love', eye_color: 'blue'},
      {id: 9, is_active: false, name: 'Deborah Hines', eye_color: 'blue'},
      {id: 10, is_active: true, name: 'Chandra Jones', eye_color: 'brown'}
    ];

    expect(result).toEqual(expected);
  });

  it('should handle mixed conditions', () => {
    const users = usersFixture();

    const result = q()
      .select(extendedUser)
      .from(users)
      .where(activeUsers, blueEyes) // OR
      .where(oldEnough) // AND
      .execute();

    const expected =  [
      {id: 5, is_active: true, name: 'Garcia Hill', eye_color: 'brown'},
      {id: 7, is_active: true, name: 'Gloria Love', eye_color: 'blue'},
      {id: 10, is_active: true, name: 'Chandra Jones', eye_color: 'brown'}
    ];

    expect(result).toEqual(expected);
  });
});
