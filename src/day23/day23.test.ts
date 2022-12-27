import { logAnswer } from '../utils/logging';
import { day23, day23part2 } from './day23';
import { data, testData } from './day23.data';

describe('day 23', () => {
  it.only('test cases', () => {
    expect(day23(testData)).toBe(12521); // 1.39s (1. start) -> 1.1s (2. memo positions)
  });

  it.skip('answer', () => {
    const answer = day23(data);
    logAnswer(answer, 23, 1);
    expect(answer).toBe(19046); // 10.5s (1. start)
  });
});

describe('day 23 part 2', () => {
  it.skip('test cases', () => {
    expect(day23part2(testData)).toBe(44169); // 12.6s (1. start)
  });

  it.only('answer', () => {
    const answer = day23part2(data);
    logAnswer(answer, 23, 2);
    expect(answer).toBe(47484); // 6.8s (1. start) -> 6.3s (2. memo positions)
  });
});
