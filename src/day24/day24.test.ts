import { logAnswer } from '../utils/logging';
import { day24, day24part2 } from './day24';
import { data } from './day24.data';

describe('day 24', () => {
  it('answer', () => {
    const answer = day24(data);
    logAnswer(answer, 24, 1);
    expect(answer).toBe(51939397989999);
  });
});

describe('day 24 part 2', () => {
  it('answer', () => {
    const answer = day24part2(data);
    logAnswer(answer, 24, 2);
    expect(answer).toBe(11717131211195);
  });
});
