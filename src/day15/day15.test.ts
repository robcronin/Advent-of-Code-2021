import { parseGridInfo } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { range } from '../utils/looping';
import { day15, day15part2, getMinTravelCost, replicateGrid } from './day15';
import { input } from './day15.data';

const smallString = `00000
99990
00000
09999
00000`;
const testString = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;
const smallData = parseGridInfo(smallString);
const aboveMaxData = parseGridInfo(smallString);
const testData = parseGridInfo(testString);
const data = parseGridInfo(input);

range(aboveMaxData.numRows).forEach((x) =>
  range(aboveMaxData.numCols).forEach((y) => {
    aboveMaxData.grid[x][y] = aboveMaxData.numRows * aboveMaxData.numCols * 10;
  }),
);

describe('day 15', () => {
  it('small test cases', () => {
    expect(day15(smallData)).toEqual(0);
  });
  it('test cases', () => {
    expect(day15(testData)).toEqual(40);
  });

  it('answer', () => {
    const answer = day15(data);
    logAnswer(answer, 15, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(696);
  });
});

describe('day 15 part 2', () => {
  it('test cases', () => {
    expect(day15part2(testData)).toBe(315);
  });

  it.skip('answer', () => {
    const answer = day15part2(data);
    logAnswer(answer, 15, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(2952);
  });
});

describe('replicateGrid', () => {
  it('should replicate the grid', () => {
    expect(replicateGrid({ grid: [[8]], numRows: 1, numCols: 1 }, 5)).toEqual({
      grid: [
        [8, 9, 1, 2, 3],
        [9, 1, 2, 3, 4],
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
      ],
      numCols: 5,
      numRows: 5,
    });
  });
});

describe('getMinTravelCost', () => {
  it('should get the min travel cost', () => {
    expect(getMinTravelCost(testData)).toBe(40);
  });
  it('should get the min travel cost on backwards grid', () => {
    expect(getMinTravelCost(smallData)).toBe(0);
  });
  it('should get the min travel cost on grid with above max values', () => {
    expect(getMinTravelCost(aboveMaxData)).toBe(225);
  });
});
