import { logAnswer } from '../utils/logging';
import {
  addValueToVentMapInPlace,
  countMarksAboveThreshold,
  day5,
  day5part2,
  markVentMap,
  parseLineSegments,
} from './day5';
import { input } from './day5.data';

const testString = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;
const testData = parseLineSegments(testString);
const data = parseLineSegments(input);

describe('day 5', () => {
  it('test cases', () => {
    expect(day5(testData)).toBe(5);
  });

  it('answer', () => {
    const answer = day5(data);
    logAnswer(answer, 5, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(5294);
  });
});

describe('day 5 part 2', () => {
  it('test cases', () => {
    expect(day5part2(testData)).toBe(12);
  });

  it('answer', () => {
    const answer = day5part2(data);
    logAnswer(answer, 5, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(21698);
  });
});

describe('parseLineSegments', () => {
  it('should parse the line segments', () => {
    expect(
      parseLineSegments(`0,2 -> 0,3
    1,1 -> 2,2
    0,0 -> 2,0`),
    ).toEqual([
      { x1: 0, x2: 0, y1: 2, y2: 3 },
      { x1: 1, x2: 2, y1: 1, y2: 2 },
      { x1: 0, x2: 2, y1: 0, y2: 0 },
    ]);
  });
});

describe('addValueToVentMap', () => {
  it('should add a fresh value of 1', () => {
    const ventMap = {};
    addValueToVentMapInPlace({ ventMap, x: 2, y: 2 });
    expect(ventMap).toEqual({ 2: { 2: 1 } });
  });
  it('should add a fresh value of 1 to existing row', () => {
    const ventMap = { 2: { 0: 1 } };
    addValueToVentMapInPlace({ ventMap, x: 2, y: 2 });
    expect(ventMap).toEqual({ 2: { 0: 1, 2: 1 } });
  });
  it('should add one to an existing value', () => {
    const ventMap = { 2: { 0: 1 } };
    addValueToVentMapInPlace({ ventMap, x: 2, y: 0 });
    expect(ventMap).toEqual({ 2: { 0: 2 } });
  });
});

describe('markVentMap', () => {
  it('should mark horizontal and vertical lines only', () => {
    const lineSegments = [
      { x1: 0, x2: 0, y1: 2, y2: 3 },
      { x1: 1, x2: 2, y1: 1, y2: 2 },
      { x1: 0, x2: 2, y1: 0, y2: 0 },
    ];
    expect(markVentMap({ lineSegments, markDiagonal: false })).toEqual({
      0: { 0: 1, 2: 1, 3: 1 },
      1: { 0: 1 },
      2: { 0: 1 },
    });
  });
  it('should mark horizontal, vertical and diagonal lines', () => {
    const lineSegments = [
      { x1: 0, x2: 0, y1: 2, y2: 3 },
      { x1: 1, x2: 2, y1: 1, y2: 2 },
      { x1: 0, x2: 2, y1: 0, y2: 0 },
    ];
    expect(markVentMap({ lineSegments, markDiagonal: true })).toEqual({
      0: { 0: 1, 2: 1, 3: 1 },
      1: { 0: 1, 1: 1 },
      2: { 0: 1, 2: 1 },
    });
  });
});

describe('countMarksAboveThreshold', () => {
  it('should count values above a threshold', () => {
    expect(
      countMarksAboveThreshold({
        ventMap: {
          0: { 0: 1, 2: 2, 3: 1 },
          1: { 0: 3, 1: 1 },
          2: { 0: 1, 2: 4 },
        },
        threshold: 2,
      }),
    ).toEqual(3);
  });
});

describe('bad inputs should throw errors', () => {
  it('should throw an error if a bad segment', () => {
    expect(() =>
      parseLineSegments(`1,1 -> 2, 3
    0,2 - 2,3`),
    ).toThrowError('Invalid segment 1,1 -> 2, 3');
  });
});
