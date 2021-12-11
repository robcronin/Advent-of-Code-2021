import { deepCopyGrid, genNewGrid, runFnOnGrid } from '../utils/grid';
import { parseGridInfo } from '../utils/input';
import { logAnswer } from '../utils/logging';
import {
  day11,
  day11part2,
  flashWhilePossible,
  getTotalFlashesOverNumSteps,
  runFlashInPlace,
  runLightStep,
  runOneSweepFlashInPlace,
  stepsUntilFullGridFlash,
} from './day11';
import { input } from './day11.data';

const smallTestString = `11111
19991
19191
19991
11111`;
const testString = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;
const smallTestData = parseGridInfo(smallTestString);
const testData = parseGridInfo(testString);
const data = parseGridInfo(input);

describe('day 11', () => {
  it('test cases', () => {
    expect(day11(testData)).toBe(1656);
  });

  it('answer', () => {
    const answer = day11(data);
    logAnswer(answer, 11, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(1700);
  });
});

describe('day 11 part 2', () => {
  it('test cases', () => {
    expect(day11part2(testData)).toBe(195);
  });

  it('answer', () => {
    const answer = day11part2(data);
    logAnswer(answer, 11, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(273);
  });
});

describe('runFlashInPlace', () => {
  it('should flash a grid in place', () => {
    const gridInfo = deepCopyGrid({ gridInfo: smallTestData });
    runFlashInPlace({ gridInfo, flasher: { x: 1, y: 1 } });
    expect(gridInfo.grid).toEqual([
      [2, 2, 2, 1, 1],
      [2, 9, 10, 9, 1],
      [2, 10, 2, 9, 1],
      [1, 9, 9, 9, 1],
      [1, 1, 1, 1, 1],
    ]);
  });
});

describe('runOneSweepFlashInPlace', () => {
  it('should flash every applicable spot of a grid in place', () => {
    const gridInfo = runFnOnGrid({
      gridInfo: smallTestData,
      fnToRun: ({ value }) => value + 1,
    });
    const { numRows, numCols } = gridInfo;

    const { grid: flashes } = genNewGrid({ numRows, numCols, defaultValue: 0 });
    runOneSweepFlashInPlace({
      gridInfo,
      flashes,
    });
    expect(gridInfo.grid).toEqual([
      [3, 4, 5, 4, 3],
      [4, 12, 14, 12, 4],
      [5, 14, 10, 14, 5],
      [4, 12, 14, 12, 4],
      [3, 4, 5, 4, 3],
    ]);
    expect(flashes).toEqual([
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ]);
  });

  it('should flash nothing in a grid if not applicable', () => {
    const gridInfo = deepCopyGrid({ gridInfo: smallTestData });
    const { numRows, numCols } = gridInfo;
    const { grid: flashes } = genNewGrid({ numRows, numCols, defaultValue: 0 });
    runOneSweepFlashInPlace({
      gridInfo,
      flashes,
    });
    expect(gridInfo.grid).toEqual(smallTestData.grid);
    expect(flashes).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
});

describe('flashWhilePossible', () => {
  it('should flash as many times as possible in a step', () => {
    const gridInfo = runFnOnGrid({
      gridInfo: smallTestData,
      fnToRun: ({ value }) => value + 1,
    });
    const { grid: flashes } = genNewGrid({ ...gridInfo, defaultValue: 0 });
    const { gridInfo: flashedGridInfo, totalStepFlashes } = flashWhilePossible({
      gridInfo,
      flashes,
    });
    expect(totalStepFlashes).toBe(9);
    expect(flashedGridInfo.grid).toEqual([
      [3, 4, 5, 4, 3],
      [4, 13, 15, 13, 4],
      [5, 15, 10, 15, 5],
      [4, 13, 15, 13, 4],
      [3, 4, 5, 4, 3],
    ]);
  });
});

describe('runLightStep', () => {
  it('should run a full light step', () => {
    const { newGridInfo, totalStepFlashes } = runLightStep(smallTestData);
    expect(newGridInfo.grid).toEqual([
      [3, 4, 5, 4, 3],
      [4, 0, 0, 0, 4],
      [5, 0, 0, 0, 5],
      [4, 0, 0, 0, 4],
      [3, 4, 5, 4, 3],
    ]);
    expect(totalStepFlashes).toEqual(9);
  });
});

describe('getTotalFlashesOverNumSteps', () => {
  it('should return the total flashes over x steps', () => {
    expect(
      getTotalFlashesOverNumSteps({ gridInfo: testData, numSteps: 10 }),
    ).toBe(204);
  });
});

describe('stepsUntilFullGridFlash', () => {
  it('should return the number of steps until the whole grid flashes', () => {
    expect(stepsUntilFullGridFlash({ gridInfo: testData })).toBe(195);
  });
});
