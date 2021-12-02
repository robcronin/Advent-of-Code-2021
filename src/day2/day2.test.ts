import { logAnswer } from '../utils/logging';
import { day2, day2part2, parseSubmarineDirections } from './day2';
import { input } from './day2.data';

const testInput = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

const testData = parseSubmarineDirections(testInput);
const data = parseSubmarineDirections(input);

describe('parseSubmarineDirections', () => {
  it('should parseSubmarineDirections', () => {
    expect(
      parseSubmarineDirections(`forward 5
    down 5
    up 3`),
    ).toEqual([
      { action: 'forward', value: 5 },
      { action: 'down', value: 5 },
      { action: 'up', value: 3 },
    ]);
  });
  it('should error on a bad instruction', () => {
    expect(() =>
      parseSubmarineDirections(`left 5
    `),
    ).toThrowError('left 5 is not a valid submarine instruction');
  });
});

describe('day 2', () => {
  it('test cases', () => {
    expect(day2(testData)).toBe(150);
  });

  it('answer', () => {
    const answer = day2(data);
    logAnswer(answer, 2, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(1670340);
  });
  it('should throw on bad action', () => {
    // @ts-expect-error:  testing bad action
    expect(() => day2([{ action: 'fake', value: 5 }])).toThrowError(
      'Incorrect action: fake',
    );
  });
});

describe('day 2 part 2', () => {
  it('test cases', () => {
    expect(day2part2(testData)).toBe(900);
  });

  it('answer', () => {
    const answer = day2part2(data);
    logAnswer(answer, 2, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(1954293920);
  });
  it('should throw on bad action', () => {
    // @ts-expect-error: testing bad action
    expect(() => day2part2([{ action: 'fake', value: 5 }])).toThrowError(
      'Incorrect action: fake',
    );
  });
});
