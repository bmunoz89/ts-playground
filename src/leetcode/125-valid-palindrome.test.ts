// https://leetcode.com/problems/valid-palindrome/

import { test, expect } from "bun:test";

/**
 * A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters,
 * it reads the same forward and backward. Alphanumeric characters include letters and numbers.
 *
 * Given a string s, return true if it is a palindrome, or false otherwise.
 **/
function isPalindrome(s: string): boolean {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}

test("isPalindrome - test case 1", () => {
  expect(isPalindrome("A man, a plan, a canal: Panama")).toBe(true);
});

test("isPalindrome - test case 2", () => {
  expect(isPalindrome("race a car")).toBe(false);
});

test("isPalindrome - test case 3", () => {
  expect(isPalindrome(" ")).toBe(true);
});
