import { logAnswer } from '../utils/logging';
import {
  day17,
  day17part2,
  findAllCombosAndMaxHeight,
  getValidYSteps,
  parseTargetArea,
} from './day17';
import { input } from './day17.data';

const testString = 'target area: x=20..30, y=-10..-5';
const testData = parseTargetArea(testString);
const data = parseTargetArea(input);

describe('day 17', () => {
  it('test cases', () => {
    expect(day17(testData)).toBe(45);
  });

  it('answer', () => {
    const answer = day17(data);
    logAnswer(answer, 17, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(5671);
  });
});

describe('day 17 part 2', () => {
  it('test cases', () => {
    expect(day17part2(testData)).toBe(112);
  });

  it('answer', () => {
    const answer = day17part2(data);
    logAnswer(answer, 17, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(4556);
  });
});

describe('parseTargetArea', () => {
  it('should parse the target area', () => {
    expect(parseTargetArea(testString)).toEqual({
      minX: 20,
      maxX: 30,
      minY: -10,
      maxY: -5,
    });
  });
});

describe('getValidYSteps', () => {
  it('should get the valid steps for a target with a given starting velocity', () => {
    expect(getValidYSteps({ min: -10, max: -5, velocity: 9 })).toEqual([
      { numSteps: 20, startingVelocity: 9 },
    ]);
    expect(getValidYSteps({ min: -107, max: -57, velocity: 9 })).toEqual([
      { numSteps: 24, startingVelocity: 9 },
      { numSteps: 25, startingVelocity: 9 },
      { numSteps: 26, startingVelocity: 9 },
    ]);
  });
});

describe('findAllCombosAndMaxHeight', () => {
  it('should find all combos and max height', () => {
    expect(findAllCombosAndMaxHeight(testData)).toEqual({
      maxHeight: 45,
      numCombos: 112,
    });
  });
});
