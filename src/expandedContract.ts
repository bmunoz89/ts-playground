// https://stackoverflow.com/questions/57683303/how-can-i-see-the-full-expanded-contract-of-a-typescript-type
type ValidValues = string | number | null;
type ValidTypes = "text" | "time" | "unknown";

type Decorated = {
  name?: string | null;
  type?: ValidTypes;
  value?: ValidValues;
  title: string;
  start: number;
  subObject: Injected;
};

type Injected = {
  extras: object;
};

interface SomeFunction {
  (...args: string[]): Injected & { error: boolean };
}

// overriding the types from Decorated
type List = Decorated &
  Injected & {
    name: string;
    type: "text";
    value: string;
  };

// expands object types one level deep
type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

// expands object types recursively
export type ExpandRecursively<T> = T extends (...args: infer A) => infer R
  ? (...args: ExpandRecursively<A>) => ExpandRecursively<R>
  : T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;

type ExpandedList = Expand<List>;
/**
type ExpandedList = {
  name: string;
  type: "text";
  value: string;
  title: string;
  start: number;
  extras: object;
  subObject: Injected
}
*/

type ExpandedRecursivelyList = ExpandRecursively<List>;
/**
type ExpandedRecursivelyList = {
  name: string;
  type: "text";
  value: string;
  title: string;
  start: number;
  extras: object;
  subObject: {
    extras: object
  }
}
*/

type ExpandedSomeFunction = Expand<SomeFunction>;
/**
(...args: string[]) => {
    extras: object;
    error: boolean;
}
 */

type ExpandRecursivelySomeFunction = ExpandRecursively<SomeFunction>;
/**
(...args: string[]) => {
    extras: object;
    error: boolean;
}
 */
