import { logAnswer } from '../utils/logging';
import {
  day9,
  day9part2,
  findLowLevels,
  getBasinForCoord,
  getBasins,
  getBasinSizes,
  getLowestNeighbour,
  getNeighbourCoords,
  parseHeightMapInfo,
} from './day9';
import { input } from './day9.data';

const testString = `2199943210
3987894921
9856789892
8767896789
9899965678`;
const testData = parseHeightMapInfo(testString);
const data = parseHeightMapInfo(input);

describe('day 9', () => {
  it('test cases', () => {
    expect(day9(testData)).toBe(15);
  });

  it('answer', () => {
    const answer = day9(data);
    logAnswer(answer, 9, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(508);
  });
});

describe('day 9 part 2', () => {
  it('test cases', () => {
    expect(day9part2(testData)).toBe(1134);
  });

  it('answer', () => {
    const answer = day9part2(data);
    logAnswer(answer, 9, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(1564640);
  });
});

describe('parseHeightMapInfo', () => {
  it('should parse height map info', () => {
    expect(
      parseHeightMapInfo(`123
      456`),
    ).toEqual({
      map: [
        [1, 2, 3],
        [4, 5, 6],
      ],
      numRows: 2,
      numCols: 3,
    });
  });
});

describe('getNeighbourCoords', () => {
  const heightMapInfo = { map: [], numRows: 5, numCols: 6 };
  it('should return 2 neighbours for top left corner', () => {
    expect(
      getNeighbourCoords({ coords: { x: 0, y: 0 }, heightMapInfo }),
    ).toEqual([
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ]);
  });
  it('should return 2 neighbours for bottom right corner', () => {
    expect(
      getNeighbourCoords({ coords: { x: 4, y: 5 }, heightMapInfo }),
    ).toEqual([
      { x: 3, y: 5 },
      { x: 4, y: 4 },
    ]);
  });
  it('should return 3 neighbours for top row', () => {
    expect(
      getNeighbourCoords({ coords: { x: 1, y: 0 }, heightMapInfo }),
    ).toEqual([
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 1 },
    ]);
  });
  it('should return 4 neighbours for middle value', () => {
    expect(
      getNeighbourCoords({ coords: { x: 3, y: 4 }, heightMapInfo }),
    ).toEqual([
      { x: 2, y: 4 },
      { x: 3, y: 3 },
      { x: 4, y: 4 },
      { x: 3, y: 5 },
    ]);
  });
});

describe('findLowLevels', () => {
  it('should find the low level coordinates', () => {
    expect(findLowLevels(testData)).toEqual([1, 0, 5, 5]);
  });
});

describe('getLowestNeighbour', () => {
  it('should return the coords of the lowest neighbour', () => {
    expect(
      getLowestNeighbour({ heightMapInfo: testData, coords: { x: 1, y: 1 } }),
    ).toEqual({ x: 0, y: 1 });
  });
  it('should return itself if low level', () => {
    expect(
      getLowestNeighbour({ heightMapInfo: testData, coords: { x: 0, y: 1 } }),
    ).toEqual({ x: 0, y: 1 });
  });
});

describe('getBasinForCoord', () => {
  it('should return undefined as basin if max height', () => {
    expect(
      getBasinForCoord({
        basins: [],
        heightMapInfo: testData,
        coords: { x: 1, y: 1 },
      }),
    ).toBe(undefined);
  });
  it('should return existing basin if already calculated', () => {
    expect(
      getBasinForCoord({
        basins: [[{ x: 10, y: 10 }]],
        heightMapInfo: testData,
        coords: { x: 0, y: 0 },
      }),
    ).toEqual({ x: 10, y: 10 });
  });
  it('should return itself if a low point', () => {
    expect(
      getBasinForCoord({
        basins: [[]],
        heightMapInfo: testData,
        coords: { x: 0, y: 1 },
      }),
    ).toEqual({ x: 0, y: 1 });
  });
  it('should return its lowest neighbours basin if not a low level', () => {
    expect(
      getBasinForCoord({
        basins: [[undefined, { x: 3, y: 3 }]],
        heightMapInfo: testData,
        coords: { x: 0, y: 0 },
      }),
    ).toEqual({ x: 3, y: 3 });
  });
  it('should recursively find a basin', () => {
    expect(
      getBasinForCoord({
        basins: [[]],
        heightMapInfo: testData,
        coords: { x: 4, y: 9 },
      }),
    ).toEqual({ x: 4, y: 6 });
  });
});

describe('getBasins', () => {
  it('should recursively find all basins (testing one row)', () => {
    expect(getBasins(testData)[1]).toEqual([
      { x: 0, y: 1 },
      undefined,
      { x: 2, y: 2 },
      { x: 2, y: 2 },
      { x: 2, y: 2 },
      undefined,
      { x: 0, y: 9 },
      undefined,
      { x: 0, y: 9 },
      { x: 0, y: 9 },
    ]);
  });
});

describe('getBasinSizes', () => {
  it('should get all the basin sizes', () => {
    expect(
      getBasinSizes({ basins: getBasins(testData), heightMapInfo: testData }),
    ).toEqual({ '0,1': 3, '0,9': 9, '2,2': 14, '4,6': 9 });
  });
});
