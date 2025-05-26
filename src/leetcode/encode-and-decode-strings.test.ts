// https://leetcode.com/problems/encode-and-decode-strings/

import { test, expect } from "bun:test";

function encode(strs: string[]): string {
  return JSON.stringify(strs);
}

function decode(str: string): string[] {
  return JSON.parse(str);
}

test("encode - test case 1", () => {
  const strs = ["neet", "code", "love", "you"];
  expect(decode(encode(strs))).toStrictEqual(strs);
});

test("encode - test case 2", () => {
  const strs = ["we", "say", ":", "yest"];
  expect(decode(encode(strs))).toStrictEqual(strs);
});

test("encode - test case 3", () => {
  const strs: string[] = [];
  expect(decode(encode(strs))).toStrictEqual(strs);
});
