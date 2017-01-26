# Examples

## Basic example
```javascript
const q = require('src/object-sql.js');

const r = q()
  .select()
  .from([1, 2, 3, 4])
  .where((n) => n > 2)
  .order((a, b) => b - a)
  .execute();

console.log(r); // [4, 3]
```

## GROUP example
```javascript
const a = [1, 2, 2, 1, 3, 2, 3, 1];
const r = q().from(a).group(n => n).execute();

console.log(r); // [[1, [1,1,1]], [2, [2,2,2]], [3, [3,3]]]
```

## JOIN example
```javascript
const owners = [
  {id: 1, name: 'Alice'},
  {id: 2, name: 'Bob'}
];

const dogs = [
  {id: 1, owner_id: 1, name: 'Charlie'},
  {id: 2, owner_id: 2, name: 'Dave'},
  {id: 3, owner_id: 1, name: 'Eve'},
  {id: 4, owner_id: 3, name: 'Frank'}
];

const result = q()
  .select((tables) => ({
    id: tables[0].id,
    name: tables[0].name,
    owner: tables[1],
  }))
  .from(dogs, owners)
  .where((tables) => tables[0].owner_id === tables[1].id)
  .execute();

console.log(result);
// [{
//     "id": 1,
//     "name": "Charlie",
//     "owner": {
//       "id": 1,
//       "name": "Alice"
//     }
//   }, {
//     "id": 2,
//     "name": "Dave",
//     "owner": {
//       "id": 2,
//       "name": "Bob"
//     }
//   }, {
//     "id": 3,
//     "name": "Eve",
//     "owner": {
//       "id": 1,
//       "name": "Alice"
//     }
// }]
```
