import { parseInput } from '../utils/input';
import { logAnswer } from '../utils/logging';
import {
  calculateFuelToTarget,
  calculateMinFuel,
  day7,
  day7part2,
} from './day7';
import { input } from './day7.data';

const testString = '16,1,2,0,4,2,7,1,2,14';
const testData = parseInput(testString) as number[];
const data = parseInput(input) as number[];

describe('day 7', () => {
  it('test cases', () => {
    expect(day7(testData)).toBe(37);
  });

  it('answer', () => {
    const answer = day7(data);
    logAnswer(answer, 7, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(344535);
  });
});

describe('day 7 part 2', () => {
  it('test cases', () => {
    expect(day7part2(testData)).toBe(168);
  });

  it('answer', () => {
    const answer = day7part2(data);
    logAnswer(answer, 7, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(95581659);
  });
});

describe('calculateFuelToTarget', () => {
  it('should calculate the fuel to target for a given fuel function', () => {
    expect(calculateFuelToTarget([1, 3, 7], 2, (steps) => steps * 2)).toBe(14);
  });
});

describe('calculateMinFuel', () => {
  it('should calculate the minimum fuel to a position for a given fuel function', () => {
    expect(calculateMinFuel([1, 3, 7], (steps) => steps * 2)).toBe(12);
  });
});
