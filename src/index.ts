type Item = Record<string, unknown>
type Identifier<T, Value = string | number | boolean> =  keyof {
  [P in keyof T as T[P] extends Value ? P : never]: T[P]
}

const adder = <T extends Item>(source: T[], identifier: keyof T) => (item: T) => {
  const index = source.findIndex(el => el[identifier] === item[identifier])
  if (index < 0) source.push(item)
  else source.splice(index, 1, item)
}
const matcher = (identifier: any, isObjectItem: boolean) => (item: any, savedItem: any) => 
  isObjectItem ?
    Object.entries(item).every(([k, v]) => savedItem[k] === v)
    : item === savedItem[identifier]

const curry = (resolveFn: any, ...args: any[]) => {
  const source = args[0]
  if (args.length === 1) return (item: unknown, identifier: unknown) => resolveFn(source, item, identifier ?? 'id')
  else {
    const item = args[1]
    const identifier = args[2] ?? 'id'
    return resolveFn(source, item, identifier) 
  } 
}

// collection.add
function resolveAdd(source: any[], item: any, identifier: any = 'id') {
  const _add = adder(source, identifier)
  if (Array.isArray(item)) item.forEach(_add)
  else _add(item) 
  return [...source]
}

function add<T extends Item>(source: T[], item: T, identifier?: Identifier<T>): T[]
function add<T extends Item>(source: T[], items: T[], identifier?: Identifier<T>): T[]
function add<T extends Item>(source: T[]): (items: T[], identifier?: Identifier<T>) => T[]
function add<T extends Item>(source: T[]): (item: T, identifier?: Identifier<T>) => T[]
function add(...args: unknown[]): unknown {
  return curry(resolveAdd, ...args)
}

// collection.add
function resolveAdd2(source: any[], item: any, identifier: any = 'id') {
  const _add = adder(source, identifier)
  if (Array.isArray(item)) item.forEach(_add)
  else _add(item) 
  return [...source]
}

function add2<T extends Item>(source: T[], item: T, identifier?: Identifier<T>): T[]
function add2<T extends Item>(source: T[], items: T[], identifier?: Identifier<T>): T[]
function add2<T extends Item>(source: T[]): (items: T[], identifier?: Identifier<T>) => T[]
function add2<T extends Item>(source: T[]): (item: T, identifier?: Identifier<T>) => T[]
function add2(...args: unknown[]): unknown {
  return curry(resolveAdd, ...args)
}

// collection.remove
function resolveRemove(source: any[], item: any, identifier: any = 'id') {
  const isArray = Array.isArray(item)
  const sampleItem = isArray ? item[0] : item
  const isObjectItem = typeof sampleItem === 'object'
  const match = matcher(identifier, isObjectItem)
  const removeIndexSet = new Set<number>()
  
  source.forEach((savedItem, index) =>
  isArray ?
  item.forEach((i) => match(i, savedItem) && removeIndexSet.add(index))
  : match(item, savedItem) && removeIndexSet.add(index)
  )
  
  const removeIndexes = [...removeIndexSet.values()].sort((a, b) => a > b ? -1 : 1)
  removeIndexes.forEach(index => source.splice(index, 1))
  return [...source]
}

function remove<T extends Item>(source: T[], id: T[Identifier<T>], identifier?: Identifier<T>): T[]
function remove<T extends Item>(source: T[], ids: T[Identifier<T>][], identifier?: Identifier<T>): T[]
function remove<T extends Item>(source: T[], item: Partial<T>): T[]
function remove<T extends Item>(source: T[], items: Partial<T>[]): T[]
function remove<T extends Item>(source: T[]): (id: T[Identifier<T>], identifier?: Identifier<T>) => T[]
function remove<T extends Item>(source: T[]): (ids: T[Identifier<T>][], identifier?: Identifier<T>) => T[]
function remove<T extends Item>(source: T[]): (item: Partial<T>) => T[]
function remove<T extends Item>(source: T[]): (items: Partial<T>[]) => T[]
function remove(...args: unknown[]): unknown {
  return curry(resolveRemove, ...args)
}

// collection.find
function resolveFindOne(source: any[], item: any, identifier: any = 'id') {
  const isObjectItem = typeof item === 'object'
  const match = matcher(identifier, isObjectItem)
  return source.find((savedItem) => match(item, savedItem))
}

function findOne<T extends Item>(source: T[], id: T[Identifier<T>], identifier?: Identifier<T>): T | undefined
function findOne<T extends Item>(source: T[], item: Partial<T>): T | undefined
function findOne<T extends Item>(source: T[]):(id: T[Identifier<T>], identifier?: Identifier<T>) => T | undefined
function findOne<T extends Item>(source: T[]):(item: Partial<T>) => T | undefined
function findOne(...args: unknown[]): unknown {
  return curry(resolveFindOne, ...args)
}

// collection.findMany
function resolveFindMany(source: any[], item: any, identifier: any = 'id') {
  const isArray = Array.isArray(item)
  const sampleItem = isArray ? item[0] : item
  const isObjectItem = typeof sampleItem === 'object'
  const match = matcher(identifier, isObjectItem)

  return source.filter(savedItem =>
    isArray ?
      item.some((i) => match(i, savedItem))
      : match(item, savedItem)
  )
}

function findMany<T extends Item>(source: T[], id: T[Identifier<T>], identifier?: Identifier<T>): T[]
function findMany<T extends Item>(source: T[], ids: T[Identifier<T>][], identifier?: Identifier<T>): T[]
function findMany<T extends Item>(source: T[], item: Partial<T>): T[]
function findMany<T extends Item>(source: T[], items: Partial<T>[]): T[]
function findMany<T extends Item>(source: T[]): (id: T[Identifier<T>], identifier?: Identifier<T>) => T[]
function findMany<T extends Item>(source: T[]): (ids: T[Identifier<T>][], identifier?: Identifier<T>) => T[]
function findMany<T extends Item>(source: T[]): (item: Partial<T>) => T[]
function findMany<T extends Item>(source: T[]): (items: Partial<T>[]) => T[]
function findMany(...args: unknown[]): unknown {
  return curry(resolveFindMany, ...args)
}

export const collection = {
  add,
  remove,
  findOne,
  findMany
}

export const collectionCurried = {
  add: <T extends Item>(source: T[]) => add(source),
  remove: <T extends Item>(source: T[]) => remove(source),
  findOne: <T extends Item>(source: T[]) => findOne(source),
  findMany: <T extends Item>(source: T[]) => findMany(source),
}


const arr = [{id: 1, name: 'one'}]
collection.add(arr)
