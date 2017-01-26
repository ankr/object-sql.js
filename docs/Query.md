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

### select()
### from()
### where()
### group()
### having()
### order()
### execute()
