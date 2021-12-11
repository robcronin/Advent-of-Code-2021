import { parseInput } from '../utils/input';
import { logAnswer } from '../utils/logging';
import {
  day10,
  day10part2,
  getCorruptScoreAndUnclosedOpens,
  getIncompleteScore,
} from './day10';
import { input } from './day10.data';
const testString = `[({(<(())[]>[[{[]{<()<>>
  [(()[<>])]({[<{<<[]>>(
  {([(<{}[<>[]}>{[]{[(<()>
  (((({<>}<{<{<>}{[]{[]{}
  [[<[([]))<([[{}[[()]]]
  [{[{({}]{}}([{[{{{}}([]
  {<[[]]>}<{[{[{[]{()[[[]
  [<(<(<(<{}))><([]([]()
  <{([([[(<>()){}]>(<<{{
  <{([{{}}[<[[[<>{}]]]>[]]`;
const testData = parseInput(testString) as string[];
const data = parseInput(input) as string[];

describe('day 10', () => {
  it('test cases', () => {
    expect(day10(testData)).toBe(26397);
  });

  it('answer', () => {
    const answer = day10(data);
    logAnswer(answer, 10, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(367059);
  });
});

describe('day 10 part 2', () => {
  it('test cases', () => {
    expect(day10part2(testData)).toBe(288957);
  });

  it('answer', () => {
    const answer = day10part2(data);
    logAnswer(answer, 10, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(1952146692);
  });
});

describe('getCorruptScoreAndUnclosedOpens', () => {
  it('should return 0 for a valid string', () => {
    expect(getCorruptScoreAndUnclosedOpens('()').corruptScore).toBe(0);
  });
  it('should return 0 for corrupt score and opens for an incomplete string', () => {
    const { corruptScore, unclosedOpens } =
      getCorruptScoreAndUnclosedOpens('({}');
    expect(corruptScore).toBe(0);
    expect(unclosedOpens).toEqual(['(']);
  });
  it('should return corrupt score and remaining opens for (]', () => {
    const { corruptScore, unclosedOpens } =
      getCorruptScoreAndUnclosedOpens('(]');
    expect(corruptScore).toBe(57);
    expect(unclosedOpens).toEqual([]);
  });
  it('should return corrupt score and remaining opens for {()()()>', () => {
    const { corruptScore, unclosedOpens } =
      getCorruptScoreAndUnclosedOpens('{()()()>');
    expect(corruptScore).toBe(25137);
    expect(unclosedOpens).toEqual([]);
  });
  it('should return corrupt score and remaining opens for {([(<{}[<>[]}>{[]{[(<()>', () => {
    const { corruptScore, unclosedOpens } = getCorruptScoreAndUnclosedOpens(
      '{([(<{}[<>[]}>{[]{[(<()>',
    );
    expect(corruptScore).toBe(1197);
    expect(unclosedOpens).toEqual(['{', '(', '[', '(', '<']);
  });
});

describe('getIncompleteScore', () => {
  it('should return -1 for a corrupt line', () => {
    expect(getIncompleteScore('<([]){()}[{}])')).toBe(-1);
  });
  it('should return incomplete score for incomplete line', () => {
    expect(getIncompleteScore('<([]){()}[{}])')).toBe(-1);
    expect(getIncompleteScore('[({(<(())[]>[[{[]{<()<>>')).toBe(288957);
    expect(getIncompleteScore('[(()[<>])]({[<{<<[]>>(')).toBe(5566);
    expect(getIncompleteScore('(((({<>}<{<{<>}{[]{[]{}')).toBe(1480781);
  });
});
