import * as callbacks from "./callbacks";

export type CallbackDef<T extends object, R> = (settings: T) => R;

type CallbackTypes = typeof callbacks;

type Callbacks = { [K in keyof CallbackTypes]: CallbackTypes[K] };
//      ^?

type CallbackKeys = keyof Callbacks;
//      ^?

type CallbackNames = `callbacks.${CallbackKeys}`;
//      ^?

type GetCallbackKey<T extends CallbackNames> = T extends `callbacks.${infer R}`
  ? R
  : never;

type GetCallbackSettings<T extends CallbackKeys> = Parameters<Callbacks[T]>[0];

function getCallback<
  T extends CallbackNames,
  F extends CallbackKeys = GetCallbackKey<T>
>(name: T, settings: GetCallbackSettings<F>): ReturnType<Callbacks[F]> {
  const fnName = name.split(".")[1] as F;
  const fn: Callbacks[F] = callbacks[fnName];

  return fn(settings as any) as ReturnType<Callbacks[F]>;
}

const res1 = getCallback("callbacks.sum", { val1: 1, val2: 2 });
//                   ^?
console.log("res1 :>> ", res1);

const res2 = getCallback("callbacks.hello", { message: "world" });
//                   ^?
console.log("res2 :>> ", res2);

const res3 = getCallback("callbacks.world", { message: "hello" });
//                   ^?
console.log("res3 :>> ", res3);
