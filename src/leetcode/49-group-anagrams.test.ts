// https://leetcode.com/problems/group-anagrams/

import { test, expect } from "bun:test";

function groupAnagrams(strs: string[]): string[][] {
  const groups: Record<string, string[]> = {};

  for (const str of strs) {
    const key = str.split("").sort().join("");
    if (groups[key] === undefined) {
      groups[key] = [];
    }

    groups[key].push(str);
  }
  return Object.values(groups);
}

test("groupAnagrams - test case 1", () => {
  expect(
    groupAnagrams(["eat", "tea", "tan", "atn", "nat", "bat"])
  ).toStrictEqual([["eat", "tea"], ["tan", "atn", "nat"], ["bat"]]);
});

test("groupAnagrams - test case 2", () => {
  expect(groupAnagrams(["a", "b", "c"])).toStrictEqual([["a"], ["b"], ["c"]]);
});

test("groupAnagrams - test case 3", () => {
  expect(groupAnagrams(["aa", "ab", "ba"])).toStrictEqual([
    ["aa"],
    ["ab", "ba"],
  ]);
});
