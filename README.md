# Collections

Javascript collection helper methods.

## Installation

```
npm i @lbagic/collections
```

## Basic usage

```js
import { collection } from "@lbagic/collections";

const data = [{ id: 1, name: "One" }];

collection.add(data, { id: 3, name: "One" }); // @returns modified array
collection.remove(data, 2); // @returns modified array
collection.findOne(data, 1); // @returns item | undefined
collection.findMany(data, "One", "name"); // @returns item[]
```

## Function signatures

| Parameter  | Accepted values                                                                 |
| ---------- | ------------------------------------------------------------------------------- |
| source     | array of objects                                                                |
| item       | id \| id[] \| item \| item[]                                                    |
| identifier | object key (whose value is either boolean, string, or number), defaults to "id" |

All functions support curried first parameter.
