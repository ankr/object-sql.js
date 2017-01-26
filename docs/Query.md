# Query.js

Calling the function exported from `src/object-sql.js` instantiates a new instance of `Query`.

## Usage
```javascript
const Query = require('src/Query.js');
const q = new Query;

// Note you must call execute() to get the results
q.select().from([1, 2, 3]).execute(); // [1, 2, 3]
```

## Methods

### select([Function selector])
`select()` accepts a function that will be run on each row return by the query, this is used to select specific fields and construct joined data.

Calling `select()` without an argument will return all fields.

### from([Array table1], [Array table2])
The `from()` function is where you feed your data to the `Query` object. It accepts **one or two** tables, in case of two tables they will be joined together.

### where([...Function condition])
`where()` accepts one or more functions for filtering the data. Calling `where()` with *multiple arguments* will create `OR` conditions -- while calling `where()` *multiple times* will create `AND` conditions.

```javascript
query.where(foo, bar) // `foo() OR bar()`
query.where(foo).where(bar) // `foo() AND bar()`
```

### group()
`group()` accepts one or more functions for grouping the data. Calling `group()` multiple times is the same as calling it once with all arguments.

### having()
`having()` accepts one or more functions for filtering the data *after* it has been joined and grouped. Behaves like `where()`.

### order()
`order()` accepts a function for ordering the final result. Calling `order()` multiple times will overwrite the previous ordering function.

### execute()
`execute()` must be called for the query to run and will return the final product of the query.
