import { CallbackDef } from "src/getCallback";

export * from "./world";

export const hello: CallbackDef<{ message: string }, string> = function ({
  message,
}) {
  return `hello ${message}`;
};

export const sum: CallbackDef<{ val1: number; val2: number }, number> =
  function ({ val1, val2 }) {
    return val1 + val2;
  };
