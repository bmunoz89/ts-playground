// https://leetcode.com/problems/top-k-frequent-elements/

import { test, expect } from "bun:test";

function topKFrequent(nums: number[], k: number): number[] {
  const counts = nums.reduce(
    (a, c) => a.set(c, (a.get(c) || 0) + 1),
    new Map<number, number>()
  );
  return [...counts.keys()]
    .sort((a, b) => counts.get(b)! - counts.get(a)!)
    .slice(0, k);
}

test("topKFrequent - test case 1", () => {
  expect(topKFrequent([1, 1, 1, 2, 2, 3], 2)).toStrictEqual([1, 2]);
});

test("topKFrequent - test case 2", () => {
  expect(topKFrequent([1], 1)).toStrictEqual([1]);
});

test("topKFrequent - test case 3", () => {
  expect(topKFrequent([1, 1, 1, 2, 2, 3, 1, 4, 4, 4], 2)).toStrictEqual([1, 4]);
});
