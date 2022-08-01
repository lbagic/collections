import { ICollection } from "./types";

const adder =
  <T>(source: T[], identifier: keyof T) =>
  (item: T) => {
    const index = source.findIndex((el) => el[identifier] === item[identifier]);
    if (index < 0) source.push(item);
    else source.splice(index, 1, item);
  };
const matcher =
  (identifier: any, isObjectItem: boolean) => (item: any, savedItem: any) =>
    isObjectItem
      ? Object.entries(item).every(([k, v]) => savedItem[k] === v)
      : item === savedItem[identifier];

const curry = (resolveFn: any, ...args: any[]) => {
  const source = args[0];
  if (args.length === 1)
    return (item: unknown, identifier: unknown) =>
      resolveFn(source, item, identifier ?? "id");
  else {
    const item = args[1];
    const identifier = args[2] ?? "id";
    return resolveFn(source, item, identifier);
  }
};

// collection.add
function _add(source: any[], item: any, identifier: any = "id") {
  const _add = adder(source, identifier);
  if (Array.isArray(item)) item.forEach(_add);
  else _add(item);
  return [...source];
}

function add(...args: any[]): any {
  return curry(_add, ...args);
}

// collection.remove
function _remove(source: any[], item: any, identifier: any = "id") {
  const isArray = Array.isArray(item);
  const sampleItem = isArray ? item[0] : item;
  const isObjectItem = typeof sampleItem === "object";
  const match = matcher(identifier, isObjectItem);
  const removeIndexSet = new Set<number>();

  source.forEach((savedItem, index) =>
    isArray
      ? item.forEach((i) => match(i, savedItem) && removeIndexSet.add(index))
      : match(item, savedItem) && removeIndexSet.add(index)
  );

  const removeIndexes = [...removeIndexSet.values()].sort((a, b) =>
    a > b ? -1 : 1
  );
  removeIndexes.forEach((index) => source.splice(index, 1));
  return [...source];
}

function remove(...args: any[]): any {
  return curry(_remove, ...args);
}

// collection.findOne
function _findOne(source: any[], item: any, identifier: any = "id") {
  const isObjectItem = typeof item === "object";
  const match = matcher(identifier, isObjectItem);
  return source.find((savedItem) => match(item, savedItem));
}

function findOne(...args: any[]): any {
  return curry(_findOne, ...args);
}

// collection.findMany
function _findMany(source: any[], item: any, identifier: any = "id") {
  const isArray = Array.isArray(item);
  const sampleItem = isArray ? item[0] : item;
  const isObjectItem = typeof sampleItem === "object";
  const match = matcher(identifier, isObjectItem);

  return source.filter((savedItem) =>
    isArray ? item.some((i) => match(i, savedItem)) : match(item, savedItem)
  );
}

function findMany(...args: any[]): any {
  return curry(_findMany, ...args);
}

export const collection: ICollection = {
  add,
  remove,
  findOne,
  findMany,
};
