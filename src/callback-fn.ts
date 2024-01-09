import { get } from "lodash";
import * as callbacks from "src/callbacks";

type Simplify<T> = {
  [K in keyof T]: T[K] extends CallbackFn ? T[K] : Simplify<T[K]>;
} & {};

type CallbackFn = (ctx: any, settings: any) => ({ data }: { data: any }) => any;

type CallbackObj = {
  [key: string]: CallbackFn | CallbackObj;
};

const callbacksFns: Simplify<typeof callbacks> =
  callbacks satisfies CallbackObj;

type DerivePathAndSettingsUnionReturn<
  T,
  Path extends string = "",
  K extends keyof T & string = keyof T & string
> = K extends K
  ? T[K] extends CallbackFn
    ? Parameters<T[K]>[1] extends undefined
      ? {
          name: `${Path}${K}`;
          returnType: ReturnType<ReturnType<T[K]>>;
        }
      : {
          name: `${Path}${K}`;
          settings: Parameters<T[K]>[1];
          returnType: ReturnType<ReturnType<T[K]>>;
        }
    : T[K] extends object
    ? DerivePathAndSettingsUnionReturn<T[K], `${Path}${K}.`>
    : never
  : never;

type Callbacks = DerivePathAndSettingsUnionReturn<typeof callbacksFns>;

function $callback<
  N extends Callbacks["name"],
  R extends Callbacks = Extract<Callbacks, { name: N }>,
  S extends R["settings" & keyof R] = R["settings" & keyof R]
>(
  name: N,
  // This makes the settings object optional depending on the callback
  ...settings: S extends never ? [undefined?] : [S]
): R["returnType"] {
  const callbackFn = get(callbacksFns, name) as CallbackFn;
  const fn = callbackFn(
    {
      getVars: () => ({ var1: "foo", var2: "bar" }),
      asyncGetVars: () => Promise.resolve({ var1: "foo", var2: "bar" }),
    },
    settings
  );

  return fn({
    data: {
      val1: 1,
      val2: 2,
      val3: "test",
    },
  });
}

const c1 = $callback("hello", { concat: true });
//    ^?
console.log("hello :>> ", c1);

const c2 = $callback("sum");
//    ^?
console.log("sum :>> ", c2);

const c3 = $callback("world.nested");
//    ^?
console.log("world.nested :>> ", c3);

const c4 = $callback("test");
//    ^?
console.log("test :>> ", c4);

const c5 = $callback("world.asyncNested");
//    ^?
// console.log("world.nested :>> ", c5);
c5.then((res) => console.log("world.nested :>> ", res));
