import { logAnswer } from '../utils/logging';
import { day25 } from './day25';
import { data, testData } from './day25.data';

describe('day 25', () => {
  it('test cases', () => {
    expect(day25(testData)).toBe(58);
  });

  it('answer', () => {
    const answer = day25(data);
    logAnswer(answer, 25, 1);
    expect(answer).toBe(471);
  });
});
