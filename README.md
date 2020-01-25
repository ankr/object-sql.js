# object-sql.js

`object-sql` is a tool for querying javascript objects using a sql like syntax. It was originally inspired from a [kata by surtich](https://www.codewars.com/kata/545434090294935e7d0010ab).

Please see the [docs](https://ankr.github.io/object-sql.js) for more informations.

## Examples
```javascript
const q = require('src/object-sql.js');

q().select().from([1, 2, 3]).execute(); // [1, 2, 3]
```

```javascript
const users = [
  {id: 1, name: 'Alice', age: 35},
  {id: 2, name: 'Bob', age: 25},
  {id: 3, name: 'Charlie', age: 30}
];

const nameAndAge = (user) => ({
  name: user.name,
  age: user.age
});

const thirtyOrAbove (user) => user.age >= 30;

q().select(nameAndAge).from(users).where(thirtyOrAbove).execute();
// [
//   {name: 'Alice', age: 35},
//   {name: 'Charlie', age: 30}
// ]
```

## Tests

Tests are running using `jasmine-node`. Install and run `bin/test`.
```bash
npm install
bin/test
```

## Todo

 - Support joins on multiple objects
 - Refactor joins to return format; `{key: [v,a,l,u,e,s]}` instead of `[key, [v,a,l,u,e,s]]`.
