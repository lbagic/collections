# Collections

Javascript collection helper methods.

## Installation

```
npm i @lbagic/collections
```

## Example usage

```js
import { collection } from "@lbagic/collections";

const data = [
  { id: 1, type: "Odd" },
  { id: 2, type: "Odd" },
  { id: 3, type: "Odd" },
];

collection.add(data, [
  { id: 2, type: "Even" },
  { id: 4, type: "Even" },
]);
// @returns [
//   { id: 1, type: "Odd" },
//   { id: 2, type: "Even" },
//   { id: 3, type: "Odd" }
//   { id: 4, type: "Even" }
// ]

collection.remove(data, 4);
collection.remove(data, { id: 4 });
// @returns [
//   { id: 1, type: "Odd" },
//   { id: 2, type: "Even" },
//   { id: 3, type: "Odd" }
// ]

collection.findOne(data, 2);
collection.findOne(data, { id: 2 });
// @returns { id: 2, type: "Even" }

collection.findMany(data, "Odd", "type");
collection.findMany(data, { type: "Odd" });
// @returns [
//   { id: 1, type: "Odd" },
//   { id: 3, type: "Odd" }
// ]
```

## Documentation

Source parameter expects array of objects.<br>
Functions support curried first parameter.<br>
Identifier defaults to `id`.

| Function | Parameters                 | Returns           | Mutates |
| -------- | -------------------------- | ----------------- | ------- |
| add      | source, item, identifier?  | item[]            | ✅      |
| add      | source, items, identifier? | item[]            | ✅      |
| remove   | source, id, identifier?    | item[]            | ✅      |
| remove   | source, ids, identifier?   | item[]            | ✅      |
| remove   | source, item               | item[]            | ✅      |
| remove   | source, items              | item[]            | ✅      |
| findOne  | source, id, identifier?    | item \| undefined | ❌      |
| findOne  | source, item               | item \| undefined | ❌      |
| findMany | source, id, identifier?    | item[]            | ❌      |
| findMany | source, ids, identifier?   | item[]            | ❌      |
| findMany | source, item               | item[]            | ❌      |
| findMany | source, items              | item[]            | ❌      |
