// https://leetcode.com/problems/valid-sudoku/

import { test, expect } from "bun:test";

/**
 * Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
 *
 * Each row must contain the digits 1-9 without repetition.
 * Each column must contain the digits 1-9 without repetition.
 * Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
 * Note:
 *
 * A Sudoku board (partially filled) could be valid but is not necessarily solvable.
 * Only the filled cells need to be validated according to the mentioned rules.
 */
function isValidSudoku(board: string[][]): boolean {
  const rows: Record<string, Set<string>> = {};
  const columns: Record<string, Set<string>> = {};
  const subBoxes: Record<string, Set<string>> = {};

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = board[i][j];

      if (cell === ".") {
        continue;
      }

      rows[i] ??= new Set<string>();
      if (rows[i].has(cell)) {
        return false;
      }
      rows[i].add(cell);

      columns[j] ??= new Set<string>();
      if (columns[j].has(cell)) {
        return false;
      }
      columns[j].add(cell);

      const subBoxRow = Math.floor(i / 3);
      const subBoxColumn = Math.floor(j / 3);
      const subBoxKey = `${subBoxRow},${subBoxColumn}`;
      console.log(subBoxKey);
      subBoxes[subBoxKey] ??= new Set<string>();

      if (subBoxes[subBoxKey].has(cell)) {
        return false;
      }
      subBoxes[subBoxKey].add(cell);
    }
  }
  return true;
}

test("isValidSudoku - test case 1", () => {
  expect(
    isValidSudoku([
      ["5", "3", ".", ".", "7", ".", ".", ".", "."],
      ["6", ".", ".", "1", "9", "5", ".", ".", "."],
      [".", "9", "8", ".", ".", ".", ".", "6", "."],
      ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
      ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
      ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
      [".", "6", ".", ".", ".", ".", "2", "8", "."],
      [".", ".", ".", "4", "1", "9", ".", ".", "5"],
      [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ])
  ).toBe(true);
});

test("isValidSudoku - test case 2", () => {
  expect(
    isValidSudoku([
      ["8", "3", ".", ".", "7", ".", ".", ".", "."],
      ["6", ".", ".", "1", "9", "5", ".", ".", "."],
      [".", "9", "8", ".", ".", ".", ".", "6", "."],
      ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
      ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
      ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
      [".", "6", ".", ".", ".", ".", "2", "8", "."],
      [".", ".", ".", "4", "1", "9", ".", ".", "5"],
      [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ])
  ).toBe(false);
});
