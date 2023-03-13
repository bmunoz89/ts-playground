import { CallbackDef } from "src/getCallback";

export const world: CallbackDef<{ message: string }, string> = function ({
  message,
}) {
  return `${message} world`;
};
