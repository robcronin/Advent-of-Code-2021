import { logAnswer } from '../utils/logging';
import {
  countConnections,
  day12,
  day12part2,
  getIsSmallCave,
  parseCaveMap,
} from './day12';
import { input, testString2, testString3 } from './day12.data';

const testString = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const testData = parseCaveMap(testString);
const testData2 = parseCaveMap(testString2);
const testData3 = parseCaveMap(testString3);
const data = parseCaveMap(input);

describe('day 12', () => {
  it('test cases', () => {
    expect(day12(testData)).toBe(10);
  });
  it('test cases 2', () => {
    expect(day12(testData2)).toBe(19);
  });
  it('test cases 3', () => {
    expect(day12(testData3)).toBe(226);
  });

  it('answer', () => {
    const answer = day12(data);
    logAnswer(answer, 12, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(5157);
  });
});

describe('day 12 part 2', () => {
  it('test cases', () => {
    expect(day12part2(testData)).toBe(36);
  });
  it('test cases 2', () => {
    expect(day12part2(testData2)).toBe(103);
  });
  it('test cases 3', () => {
    expect(day12part2(testData3)).toBe(3509);
  });

  it('answer', () => {
    const answer = day12part2(data);
    logAnswer(answer, 12, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(144309);
  });
});

describe('parseCaveMap', () => {
  it('should parse the cave map into connections', () => {
    expect(parseCaveMap(testString)).toEqual({
      A: ['c', 'b', 'end'],
      b: ['A', 'd', 'end'],
      c: ['A'],
      d: ['b'],
      start: ['A', 'b'],
    });
  });
});

describe('getIsSmallCave', () => {
  it('should return false for start', () => {
    expect(getIsSmallCave('start')).toBe(false);
  });
  it('should return false for end', () => {
    expect(getIsSmallCave('end')).toBe(false);
  });
  it('should return false for big cave', () => {
    expect(getIsSmallCave('AAA')).toBe(false);
  });
  it('should return true for small cave', () => {
    expect(getIsSmallCave('aaa')).toBe(true);
  });
});

describe('countConnections', () => {
  it('should recursively count the connections from a given point with no small revisits', () => {
    expect(countConnections({ connections: testData })).toBe(10);
  });
  it('should recursively count the connections from a given point with one small revisits', () => {
    expect(
      countConnections({ connections: testData, allowDoubleSmall: true }),
    ).toBe(36);
  });
});
