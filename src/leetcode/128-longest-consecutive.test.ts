// https://leetcode.com/problems/longest-consecutive-sequence/

import { test, expect } from "bun:test";

/**
 * Given an unsorted array of integers, find the length of the longest consecutive elements sequence.
 *
 * You must write an algorithm that runs in O(n) time.
 **/
function longestConsecutive(nums: number[]): number {
  const sortedNums = new Set(nums);
  let max = 0;
  for (const num of sortedNums) {
    if (sortedNums.has(num - 1)) {
      continue;
    }

    let currentMax = 1;
    while (sortedNums.has(num + currentMax)) {
      currentMax++;
    }
    max = Math.max(max, currentMax);
  }
  return max;
}

test("longestConsecutive - test case 1", () => {
  expect(longestConsecutive([100, 4, 200, 1, 3, 2])).toBe(4);
});

test("longestConsecutive - test case 2", () => {
  expect(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])).toBe(9);
});

test("longestConsecutive - test case 3", () => {
  expect(longestConsecutive([1, 2, 0, 1])).toBe(3);
});

test("longestConsecutive - test case 4", () => {
  expect(longestConsecutive([])).toBe(0);
});
