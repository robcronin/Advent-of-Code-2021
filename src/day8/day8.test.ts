import { logAnswer } from '../utils/logging';
import {
  day8,
  day8part2,
  determineOutputSum,
  parseClockInfo,
  parseSingleClockInfo,
} from './day8';
import { input } from './day8.data';

const oneInput = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`;
const testString = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;
const testData = parseClockInfo(testString);
const data = parseClockInfo(input);

describe('day 8', () => {
  it('test cases', () => {
    expect(day8(testData)).toBe(26);
  });

  it('answer', () => {
    const answer = day8(data);
    logAnswer(answer, 8, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(539);
  });
});

describe('day 8 part 2', () => {
  it('test cases', () => {
    expect(day8part2(testData)).toBe(61229);
  });

  it('answer', () => {
    const answer = day8part2(data);
    logAnswer(answer, 8, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(1084606);
  });
});

describe('parseSingleClockInfo', () => {
  it('should parse a clock info', () => {
    expect(parseSingleClockInfo(oneInput)).toEqual({
      clockDigits: [
        'acedgfb',
        'cdfbe',
        'gcdfa',
        'fbcad',
        'dab',
        'cefabd',
        'cdfgeb',
        'eafb',
        'cagedb',
        'ab',
      ],
      clockOutput: ['cdfeb', 'fcadb', 'cdfeb', 'cdbaf'],
    });
  });
});

describe('determineOutputSum', () => {
  it('should figure out the digits and return the sum', () => {
    expect(determineOutputSum(parseSingleClockInfo(oneInput))).toBe(5353);
  });
});
