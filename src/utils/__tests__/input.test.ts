import { parseGridInfo, parseInput } from '../input';

test('Parses a newline delimited array of numbers', () => {
  const input = `142195
  119326
  -57976`;
  expect(parseInput(input)).toStrictEqual([142195, 119326, -57976]);
});

test('Parses a comma delimited array of numbers', () => {
  const input = '1,0,0,3,-1';
  expect(parseInput(input)).toStrictEqual([1, 0, 0, 3, -1]);
});

test('Parses a space delimited array of numbers', () => {
  const input = '1 0 0 3 -1';
  expect(parseInput(input)).toStrictEqual([1, 0, 0, 3, -1]);
});

test('Parses a newline delimited array of strings', () => {
  const input = `YP6)HRL
  5SN)Z3H
  46K)CGP`;
  expect(parseInput(input)).toStrictEqual(['YP6)HRL', '5SN)Z3H', '46K)CGP']);
});

test('Parses a comma delimited array of strings', () => {
  const input = 'R1010,D422,L354,U494';
  expect(parseInput(input)).toStrictEqual(['R1010', 'D422', 'L354', 'U494']);
});

test('Parses a space delimited array of strings', () => {
  const input = 'R1010 D422 L354 U494';
  expect(parseInput(input)).toStrictEqual(['R1010', 'D422', 'L354', 'U494']);
});

test('Returns an array if no delimiter present', () => {
  const input = '22222';
  expect(parseInput(input)).toStrictEqual([2, 2, 2, 2, 2]);
});

describe('parseGridInfo', () => {
  it('should parse grid info', () => {
    expect(
      parseGridInfo(`123
      456`),
    ).toEqual({
      grid: [
        [1, 2, 3],
        [4, 5, 6],
      ],
      numRows: 2,
      numCols: 3,
    });
  });
});
