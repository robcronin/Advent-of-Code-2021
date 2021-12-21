import { logAnswer } from '../utils/logging';
import {
  day21,
  day21part2,
  getNextNumRolls,
  getTotalWinsFromDiracGame,
  getWrappedValue,
  runGameTillScore,
} from './day21';

const testData: [number, number] = [4, 8];
const data: [number, number] = [5, 6];

describe('day 21', () => {
  it('test cases', () => {
    expect(day21(testData)).toBe(739785);
  });

  it('answer', () => {
    const answer = day21(data);
    logAnswer(answer, 21, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(1002474);
  });
});

describe.skip('day 21 part 2', () => {
  it('test cases', () => {
    expect(day21part2(testData)).toBe(444356092776315);
  });

  it('answer', () => {
    const answer = day21part2(data);
    logAnswer(answer, 21, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(919758187195363);
  });
});

describe('getWrappedValue', () => {
  it('should get the next value', () => {
    expect(getWrappedValue(10, 1, 100)).toBe(11);
  });
  it('should get the next value with bigger increase', () => {
    expect(getWrappedValue(10, 12, 100)).toBe(22);
  });
  it('should get the next value at 99', () => {
    expect(getWrappedValue(99, 1, 100)).toBe(100);
  });
  it('should get the next value at 100', () => {
    expect(getWrappedValue(100, 1, 100)).toBe(1);
  });
});

describe('getNextNumRolls', () => {
  it('should get the next roll', () => {
    expect(getNextNumRolls(10, 3, 100)).toEqual([11, 12, 13]);
  });
  it('should get the next roll at 99', () => {
    expect(getNextNumRolls(99, 3, 100)).toEqual([100, 1, 2]);
  });
  it('should get the next roll at 100', () => {
    expect(getNextNumRolls(100, 3, 100)).toEqual([1, 2, 3]);
  });
});

describe('runGameTillScore', () => {
  it('should run the game until a winning score', () => {
    expect(
      runGameTillScore({
        startingPositions: testData,
        winningScore: 1000,
        pathSize: 10,
        dieSize: 100,
      }),
    ).toEqual({
      dieRolls: 993,
      positions: [10, 3],
      scores: [1000, 745],
    });
  });
});

describe('getTotalWinsFromDiracGame', () => {
  it('should get total wins from a simple dirac game', () => {
    expect(
      getTotalWinsFromDiracGame({
        startingPositions: [0, 0],
        personRolling: 0,
        startingScores: [0, 0],
        winningScore: 3,
        pathSize: 10,
      }),
    ).toEqual([27, 0]);
  });
  it('should get total wins from another simple dirac game', () => {
    expect(
      getTotalWinsFromDiracGame({
        startingPositions: [0, 0],
        personRolling: 0,
        startingScores: [0, 0],
        winningScore: 4,
        pathSize: 10,
      }),
    ).toEqual([53, 26]);
  });
  it('should get total wins from a slightly longer dirac game', () => {
    expect(
      getTotalWinsFromDiracGame({
        startingPositions: [0, 0],
        personRolling: 0,
        startingScores: [0, 0],
        winningScore: 10,
        pathSize: 10,
      }),
    ).toEqual([3825777, 1873814]);
  });
  it.skip('should get total wins from a full dirac game on test data', () => {
    expect(
      getTotalWinsFromDiracGame({
        startingPositions: testData,
        personRolling: 0,
        startingScores: [0, 0],
        winningScore: 21,
        pathSize: 10,
      }),
    ).toEqual([444356092776315, 341960390180808]);
  });
  it.skip('should get total wins from a full dirac game on main data', () => {
    expect(
      getTotalWinsFromDiracGame({
        startingPositions: data,
        personRolling: 0,
        startingScores: [0, 0],
        winningScore: 21,
        pathSize: 10,
      }),
    ).toEqual([919758187195363, 635572886949720]);
  });
});
