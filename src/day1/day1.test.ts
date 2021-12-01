import { parseInput } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day1, day1part2 } from './day1';
import { data } from './day1.data';

const testString = `199
200
208
210
200
207
240
269
260
263`;
const testData = parseInput(testString) as number[];

describe('day 1', () => {
  it('test cases', () => {
    expect(day1(testData)).toBe(7);
  });

  it('answer', () => {
    const answer = day1(data);
    logAnswer(answer, 1, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(1374);
  });
});

describe('day 1 part 2', () => {
  it('test cases', () => {
    expect(day1part2(testData)).toBe(5);
  });

  it('answer', () => {
    const answer = day1part2(data);
    logAnswer(answer, 1, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(1418);
  });
});
