import { logAnswer } from '../utils/logging';
import { day3, day3part2, parseBinary } from './day3';
import { input } from './day3.data';

const testString = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;
const { data: testData, maxLength: testMaxLength } = parseBinary(testString);
const { data, maxLength } = parseBinary(input);

describe('day 3', () => {
  it('test cases', () => {
    expect(day3(testData, testMaxLength)).toBe(198);
  });

  it('answer', () => {
    const answer = day3(data, maxLength);
    logAnswer(answer, 3, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(741950);
  });
});

describe('day 3 part 2', () => {
  it('test cases', () => {
    expect(day3part2(testData, testMaxLength)).toBe(230);
  });

  it('answer', () => {
    const answer = day3part2(data, maxLength);
    logAnswer(answer, 3, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(903810);
  });
});
