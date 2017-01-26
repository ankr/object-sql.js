# object-sql.js


## Simple example
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

## Advanced example
```javascript
const teachers = [
  {id: 1, name: 'Alice'},
  {id: 2, name: 'Bob'}
];

const students = [
  {id: 1, teacher_id: 1, name: 'Charlie'},
  {id: 2, teacher_id: 2, name: 'Dave'},
  {id: 3, teacher_id: 1, name: 'Eve'},
  {id: 4, teacher_id: 3, name: 'Frank'}
];

const result = q()
  .select((tables) => ({
    id: tables[0].id,
    name: tables[0].name,
    teacher: tables[1],
  }))
  .from(students, teachers)
  .where((tables) => tables[0].teacher_id === tables[1].id)
  .execute();

console.log(result);
// [{
//     "id": 1,
//     "name": "Charlie",
//     "teacher": {
//       "id": 1,
//       "name": "Alice"
//     }
//   }, {
//     "id": 2,
//     "name": "Dave",
//     "teacher": {
//       "id": 2,
//       "name": "Bob"
//     }
//   }, {
//     "id": 3,
//     "name": "Eve",
//     "teacher": {
//       "id": 1,
//       "name": "Alice"
//     }
// }]
```
