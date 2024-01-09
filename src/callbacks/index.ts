/**
 * `import type` only imports declarations to be used for type annotations and
 *  declarations. It always gets fully erased, so there’s no remnant of it at
 *  runtime. Similarly, `export type` only provides an export that can be used for
 *  type contexts, and is also erased from TypeScript’s output.
 *
 * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html
 */
export * as world from "./world";

export function hello(_ctx: any, settings: { concat: boolean }) {
  return ({ data }: { data: { val3: string } }) =>
    settings.concat ? `hello ${data.val3}` : "hello";
}

export function sum(_ctx: any) {
  return ({ data }: { data: { val1: number; val2: number } }) =>
    data.val1 + data.val2;
}

export function test() {
  return ({ data }: { data: { val3: string } }) => data.val3;
}
