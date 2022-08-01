type Item = Record<string, unknown>;
type Identifier<T, Value = string | number | boolean> = keyof {
  [P in keyof T as T[P] extends Value ? P : never]: T[P];
};

interface ICollectionAdd {
  add<T extends Item>(source: T[], item: T, identifier?: Identifier<T>): T[];
  add<T extends Item>(source: T[], items: T[], identifier?: Identifier<T>): T[];
  add<T extends Item>(
    source: T[]
  ): {
    <U extends T>(item: U, identifier?: Identifier<U>): U[];
    <U extends T>(items: U[], identifier?: Identifier<U>): U[];
  };
}
interface ICollectionRemove {
  remove<T extends Item>(
    source: T[],
    id: T[Identifier<T>],
    identifier?: Identifier<T>
  ): T[];
  remove<T extends Item>(
    source: T[],
    ids: T[Identifier<T>][],
    identifier?: Identifier<T>
  ): T[];
  remove<T extends Item>(source: T[], item: Partial<T>): T[];
  remove<T extends Item>(source: T[], items: Partial<T>[]): T[];
  remove<T extends Item>(
    source: T[]
  ): {
    <U extends T>(id: U[Identifier<U>], identifier?: Identifier<U>): U[];
    <U extends T>(ids: U[Identifier<U>][], identifier?: Identifier<U>): U[];
    <U extends T>(item: Partial<U>): U[];
    <U extends T>(items: Partial<U>[]): U[];
  };
}

interface ICollectionFindOne {
  findOne<T extends Item>(
    source: T[],
    id: T[Identifier<T>],
    identifier?: Identifier<T>
  ): T | undefined;
  findOne<T extends Item>(source: T[], item: Partial<T>): T | undefined;
  findOne<T extends Item>(
    source: T[]
  ): {
    <U extends T>(id: U[Identifier<U>], identifier?: Identifier<U>):
      | U
      | undefined;
    <U extends T>(item: Partial<U>): U | undefined;
  };
}

interface ICollectionFindMany {
  findMany<T extends Item>(
    source: T[],
    id: T[Identifier<T>],
    identifier?: Identifier<T>
  ): T[];
  findMany<T extends Item>(
    source: T[],
    ids: T[Identifier<T>][],
    identifier?: Identifier<T>
  ): T[];
  findMany<T extends Item>(source: T[], item: Partial<T>): T[];
  findMany<T extends Item>(source: T[], items: Partial<T>[]): T[];
  findMany<T extends Item>(
    source: T[]
  ): {
    <U extends T>(id: U[Identifier<U>], identifier?: Identifier<U>): U[];
    <U extends T>(ids: U[Identifier<U>][], identifier?: Identifier<U>): U[];
    <U extends T>(item: Partial<U>): U[];
    <U extends T>(items: Partial<U>[]): U[];
  };
}

export interface ICollection
  extends ICollectionAdd,
    ICollectionRemove,
    ICollectionFindOne,
    ICollectionFindMany {}
