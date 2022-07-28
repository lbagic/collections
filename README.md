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
collection.find(data, 1); // @returns item | undefined
collection.findMany(data, "One", "name"); // @returns item[]
```

## Function signatures

| Parameter  | Accepted values                                                                 |
| ---------- | ------------------------------------------------------------------------------- |
| source     | array of objects                                                                |
| item       | id \| id[] \| item \| item[]                                                    |
| identifier | object key (whose value is either boolean, string, or number), defaults to "id" |

### collection.add

```ts
declare function add<T extends Item>(
  source: T[],
  item: T,
  identifier?: Identifier<T>
): T[];
declare function add<T extends Item>(
  source: T[],
  items: T[],
  identifier?: Identifier<T>
): T[];
```

### collection.remove

```ts
declare function remove<T extends Item>(
  source: T[],
  id: T[Identifier<T>],
  identifier?: Identifier<T>
): T[];
declare function remove<T extends Item>(
  source: T[],
  ids: T[Identifier<T>][],
  identifier?: Identifier<T>
): T[];
declare function remove<T extends Item>(source: T[], item: Partial<T>): T[];
declare function remove<T extends Item>(source: T[], items: Partial<T>[]): T[];
```

### collection.find

```ts
declare function find<T extends Item>(
  source: T[],
  id: T[Identifier<T>],
  identifier?: Identifier<T>
): T | undefined;
declare function find<T extends Item>(
  source: T[],
  item: Partial<T>
): T | undefined;
```

### collection.findMany

```ts
declare function findMany<T extends Item>(
  source: T[],
  id: T[Identifier<T>],
  identifier?: Identifier<T>
): T[];
declare function findMany<T extends Item>(
  source: T[],
  ids: T[Identifier<T>][],
  identifier?: Identifier<T>
): T[];
declare function findMany<T extends Item>(source: T[], item: Partial<T>): T[];
declare function findMany<T extends Item>(
  source: T[],
  items: Partial<T>[]
): T[];
```
