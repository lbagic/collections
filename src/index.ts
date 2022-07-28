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

// collection.add
function add<T extends Item>(source: T[], item: T, identifier?: Identifier<T>): T[]
function add<T extends Item>(source: T[], items: T[], identifier?: Identifier<T>): T[]
function add(source: any[], item: any, identifier: any = 'id') {
  const _add = adder(source, identifier)
  if (Array.isArray(item)) item.forEach(_add)
  else _add(item) 
  return [...source]
}

// collection.remove
function remove<T extends Item>(source: T[], id: T[Identifier<T>], identifier?: Identifier<T>): T[]
function remove<T extends Item>(source: T[], ids: T[Identifier<T>][], identifier?: Identifier<T>): T[]
function remove<T extends Item>(source: T[], item: Partial<T>): T[]
function remove<T extends Item>(source: T[], items: Partial<T>[]): T[]
function remove(source: any[], item: any, identifier: any = 'id') {
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

// collection.find
function find<T extends Item>(source: T[], id: T[Identifier<T>], identifier?: Identifier<T>): T | undefined
function find<T extends Item>(source: T[], item: Partial<T>): T | undefined
function find(source: any[], item: any, identifier: any = 'id') {
  const isObjectItem = typeof item === 'object'
  const match = matcher(identifier, isObjectItem)
  return source.find(savedItem => match(item, savedItem))
}

// collection.findMany
function findMany<T extends Item>(source: T[], id: T[Identifier<T>], identifier?: Identifier<T>): T[]
function findMany<T extends Item>(source: T[], ids: T[Identifier<T>][], identifier?: Identifier<T>): T[]
function findMany<T extends Item>(source: T[], item: Partial<T>): T[]
function findMany<T extends Item>(source: T[], items: Partial<T>[]): T[]
function findMany(source: any[], item: any, identifier: any = 'id') {
  const isArray = Array.isArray(item)
  const sampleItem = isArray ? item[0] : item
  const isObjectItem = typeof sampleItem === 'object'
  const match = matcher(identifier, isObjectItem)

  return source.filter((savedItem) =>
    isArray ?
      item.some((i) => match(i, savedItem))
      : match(item, savedItem)
  )
}

export const collection = {
  add,
  remove,
  find,
  findMany
}
