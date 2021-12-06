import { parseInput } from '../utils/input';
import { logAnswer } from '../utils/logging';
import {
  breedFish,
  caculateEndFish,
  day6,
  day6Maths,
  day6part2,
  getStartingFishCount,
  sumTotalFish,
} from './day6';
import { input } from './day6.data';

const testString = '3,4,3,1,2';
const testData = parseInput(testString) as number[];
const data = parseInput(input) as number[];

describe('day 6', () => {
  it('smaller test cases', () => {
    expect(caculateEndFish({ input: testData, totalDays: 18 })).toBe(26);
  });

  it('test cases', () => {
    expect(day6(testData)).toBe(5934);
  });

  it('answer', () => {
    const answer = day6(data);
    logAnswer(answer, 6, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(380612);
  });
});

describe('day 6 part 2', () => {
  it('test cases', () => {
    expect(day6part2(testData)).toBe(26984457539);
  });

  it('answer', () => {
    const answer = day6part2(data);
    logAnswer(answer, 6, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(1710166656900);
  });
});

describe('getStartingFishCount', () => {
  it('should parse the starting fish counts', () => {
    expect(getStartingFishCount(testData)).toEqual({
      '1': 1,
      '2': 1,
      '3': 2,
      '4': 1,
    });
  });
});

describe('breedFish', () => {
  it('should breed fish for 1 day', () => {
    expect(breedFish({ fish: { 0: 1, 3: 4 }, totalDays: 1 })).toEqual({
      2: 4,
      6: 1,
      8: 1,
    });
  });
  it('should breed fish for 2 days', () => {
    expect(breedFish({ fish: { 0: 1, 3: 4 }, totalDays: 2 })).toEqual({
      1: 4,
      5: 1,
      7: 1,
    });
  });
});

describe('sumTotalFish', () => {
  it('should sum all the fish', () => {
    expect(sumTotalFish({ 0: 1, 3: 4 })).toBe(5);
  });
});

describe('day 6 Maths', () => {
  it('smaller test cases', () => {
    expect(day6Maths({ input: testData, totalDays: 18 })).toBe(26);
  });
  it('test cases', () => {
    expect(day6Maths({ input: testData, totalDays: 80 })).toBe(5934);
  });

  it('answer part 1', () => {
    const answer = day6Maths({ input: data, totalDays: 80 });
    logAnswer(answer, 6, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(380612);
  });
  it('answer part 2', () => {
    const answer = day6Maths({ input: data, totalDays: 256 });
    logAnswer(answer, 6, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(1710166656900);
  });
});
