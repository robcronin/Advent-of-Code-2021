import { logAnswer } from '../utils/logging';
import {
  day20,
  day20part2,
  getBinaryOfNeighbours,
  getValueOrDefault,
  parseImageData,
  runEnhancement,
  runNumEnhancements,
} from './day20';
import { input } from './day20.data';

const testString = `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###`;
const testData = parseImageData(testString);
const data = parseImageData(input);

describe('day 20', () => {
  it('test cases', () => {
    expect(day20(testData)).toBe(35);
  });

  it('answer', () => {
    const answer = day20(data);
    logAnswer(answer, 20, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(5819);
  });
});

describe.skip('day 20 part 2', () => {
  it('test cases', () => {
    expect(day20part2(testData)).toBe(3351);
  });

  it('answer', () => {
    const answer = day20part2(data);
    logAnswer(answer, 20, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(18516);
  });
});

describe('parseImageData', () => {
  it('should parse the image data', () => {
    expect(
      parseImageData(`###...#

    ...
    #.#
    #..`),
    ).toEqual({
      imageEnhancementAlgorithm: '###...#',
      inputImage: {
        grid: [
          ['.', '.', '.'],
          ['#', '.', '#'],
          ['#', '.', '.'],
        ],
        numCols: 3,
        numRows: 3,
      },
    });
  });
});

describe('getValueOrDefault', () => {
  it('should return the value when it exists', () => {
    expect(
      getValueOrDefault({
        coords: { x: 0, y: 0 },
        inputGrid: testData.inputImage.grid,
        defaultValue: 'D',
      }),
    ).toBe('#');
  });
  it('should return the defautl value when out of range of x', () => {
    expect(
      getValueOrDefault({
        coords: { x: -1, y: 0 },
        inputGrid: testData.inputImage.grid,
        defaultValue: 'D',
      }),
    ).toBe('D');
  });
  it('should return the defautl value when out of range of y', () => {
    expect(
      getValueOrDefault({
        coords: { x: 0, y: -1 },
        inputGrid: testData.inputImage.grid,
        defaultValue: 'D',
      }),
    ).toBe('D');
  });
});

describe('getBinaryOfNeighbours', () => {
  it('should get the binary number of the neighbours on the new top left', () => {
    expect(
      getBinaryOfNeighbours({
        coords: { x: 0, y: 0 },
        inputGrid: testData.inputImage.grid,
        outsideRangeValue: '.',
      }),
    ).toBe(1);
  });
  it('should get the binary number of the neighbours on the old top left', () => {
    expect(
      getBinaryOfNeighbours({
        coords: { x: 1, y: 1 },
        inputGrid: testData.inputImage.grid,
        outsideRangeValue: '.',
      }),
    ).toBe(18);
  });
});

describe('runEnhancement', () => {
  it('should run an enhancement', () => {
    expect(
      runEnhancement({ imageData: testData, outsideRangeValue: '.' }),
    ).toEqual({
      imageEnhancementAlgorithm: testData.imageEnhancementAlgorithm,
      inputImage: {
        grid: [
          ['.', '#', '#', '.', '#', '#', '.'],
          ['#', '.', '.', '#', '.', '#', '.'],
          ['#', '#', '.', '#', '.', '.', '#'],
          ['#', '#', '#', '#', '.', '.', '#'],
          ['.', '#', '.', '.', '#', '#', '.'],
          ['.', '.', '#', '#', '.', '.', '#'],
          ['.', '.', '.', '#', '.', '#', '.'],
        ],
        numCols: 7,
        numRows: 7,
      },
    });
  });
});

describe('runNumEnhancements', () => {
  it('should run 2 enhancements', () => {
    const newImageInfo = runNumEnhancements(testData, 2);
    expect(newImageInfo).toEqual({
      imageEnhancementAlgorithm: testData.imageEnhancementAlgorithm,
      inputImage: {
        grid: [
          ['.', '.', '.', '.', '.', '.', '.', '#', '.'],
          ['.', '#', '.', '.', '#', '.', '#', '.', '.'],
          ['#', '.', '#', '.', '.', '.', '#', '#', '#'],
          ['#', '.', '.', '.', '#', '#', '.', '#', '.'],
          ['#', '.', '.', '.', '.', '.', '#', '.', '#'],
          ['.', '#', '.', '#', '#', '#', '#', '#', '.'],
          ['.', '.', '#', '.', '#', '#', '#', '#', '#'],
          ['.', '.', '.', '#', '#', '.', '#', '#', '.'],
          ['.', '.', '.', '.', '#', '#', '#', '.', '.'],
        ],
        numCols: 9,
        numRows: 9,
      },
    });
  });
});
