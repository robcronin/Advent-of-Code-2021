import { logAnswer } from '../utils/logging';
import {
  day13,
  day13part2,
  foldGrid,
  generateOrigamiGrid,
  getMaxCoords,
  parseOrigami,
} from './day13';
import { input } from './day13.data';

const testString = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;
const testData = parseOrigami(testString);
const data = parseOrigami(input);

describe('day 13', () => {
  it('test cases', () => {
    expect(day13(testData)).toBe(17);
  });

  it('answer', () => {
    const answer = day13(data);
    logAnswer(answer, 13, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(827);
  });
});

describe('day 13 part 2', () => {
  it('test cases', () => {
    expect(day13part2(testData)).toBe(
      `# # # # # \n# . . . # \n# . . . # \n# . . . # \n# # # # # \n. . . . . \n. . . . . \n`,
    );
  });

  it('answer', () => {
    const answer = day13part2(data);
    logAnswer(answer, 13, 2, true);
    expect(typeof answer).toBe('string');
    expect(answer).toBe(
      `# # # # . . # # . . # . . # . # . . # . # # # . . # # # # . . # # . . # # # . . \n# . . . . # . . # . # . . # . # . # . . # . . # . # . . . . # . . # . # . . # . \n# # # . . # . . # . # # # # . # # . . . # . . # . # # # . . # . . . . # . . # . \n# . . . . # # # # . # . . # . # . # . . # # # . . # . . . . # . . . . # # # . . \n# . . . . # . . # . # . . # . # . # . . # . # . . # . . . . # . . # . # . . . . \n# # # # . # . . # . # . . # . # . . # . # . . # . # # # # . . # # . . # . . . . \n`,
    );
  });
});

describe('parseOrigami', () => {
  it('should parse the origami instructions', () => {
    expect(parseOrigami(testString)).toEqual({
      coordinates: [
        { x: 6, y: 10 },
        { x: 0, y: 14 },
        { x: 9, y: 10 },
        { x: 0, y: 3 },
        { x: 10, y: 4 },
        { x: 4, y: 11 },
        { x: 6, y: 0 },
        { x: 6, y: 12 },
        { x: 4, y: 1 },
        { x: 0, y: 13 },
        { x: 10, y: 12 },
        { x: 3, y: 4 },
        { x: 3, y: 0 },
        { x: 8, y: 4 },
        { x: 1, y: 10 },
        { x: 2, y: 14 },
        { x: 8, y: 10 },
        { x: 9, y: 0 },
      ],
      foldInstructions: [
        { axis: 'y', value: 7 },
        { axis: 'x', value: 5 },
      ],
    });
  });
});

describe('generateOrigamiGrid', () => {
  it('should generate a grid from origami input', () => {
    expect(
      generateOrigamiGrid({
        coordinates: [
          { x: 1, y: 2 },
          { x: 0, y: 4 },
        ],
        foldInstructions: [
          { axis: 'y', value: 2 },
          { axis: 'x', value: 2 },
        ],
      }),
    ).toEqual({
      grid: [
        ['.', '.', '.', '.', '#'],
        ['.', '.', '#', '.', '.'],
        ['.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.'],
      ],
      numCols: 5,
      numRows: 5,
    });
  });
});

describe('getMaxCoords', () => {
  it('should return the max x and y coords based on the first folds', () => {
    expect(
      getMaxCoords([
        { axis: 'x', value: 15 },
        { axis: 'y', value: 9 },
      ]),
    ).toEqual({ x: 31, y: 19 });
  });
  it('should throw an error if missing an x or y instruction', () => {
    expect(() => getMaxCoords([])).toThrowError('No x or y fold found');
  });
});

describe('foldGrid', () => {
  it('should fold a grid along y axis', () => {
    expect(
      foldGrid({
        gridInfo: {
          grid: [
            ['.', '.', '.', '.', '#'],
            ['.', '.', '#', '.', '.'],
            ['.', '.', '.', '#', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '#'],
          ],
          numCols: 5,
          numRows: 5,
        },
        foldInstruction: { axis: 'y', value: 2 },
      }),
    ).toEqual({
      grid: [
        ['#', '.'],
        ['.', '.'],
        ['.', '#'],
        ['.', '.'],
        ['#', '.'],
      ],
      numCols: 2,
      numRows: 5,
    });
  });
  it('should fold a grid along x axis', () => {
    expect(
      foldGrid({
        gridInfo: {
          grid: [
            ['.', '.', '.', '.', '#'],
            ['.', '.', '#', '.', '.'],
            ['.', '.', '.', '#', '.'],
            ['.', '.', '.', '.', '.'],
            ['#', '.', '.', '.', '#'],
          ],
          numCols: 5,
          numRows: 5,
        },
        foldInstruction: { axis: 'x', value: 2 },
      }),
    ).toEqual({
      grid: [
        ['#', '.', '.', '.', '#'],
        ['.', '.', '#', '.', '.'],
      ],
      numCols: 5,
      numRows: 2,
    });
  });
});
