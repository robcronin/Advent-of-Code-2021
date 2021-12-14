import { logAnswer } from '../utils/logging';
import {
  day14,
  day14part2,
  getMaxAndMinLetterOccurence,
  getMinMaxAfterNumSteps,
  getStartignNumPairs,
  parsePolymerInfo,
  runNumPolymerSteps,
  runPolymerStep,
} from './day14';
import { input } from './day14.data';

const testString = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;
const testData = parsePolymerInfo(testString);
const data = parsePolymerInfo(input);

describe('day 14', () => {
  it('test cases', () => {
    expect(day14(testData)).toBe(1588);
  });

  it('answer', () => {
    const answer = day14(data);
    logAnswer(answer, 14, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(2745);
  });
});

describe('day 14 part 2', () => {
  it('test cases', () => {
    expect(day14part2(testData)).toBe(2188189693529);
  });

  it('answer', () => {
    const answer = day14part2(data);
    logAnswer(answer, 14, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(3420801168962);
  });
});

describe('parsePolymerInfo', () => {
  it('should parse the polymer info', () => {
    const smallString = `NNCB

    CH -> B
    HH -> N
    CB -> H`;
    expect(parsePolymerInfo(smallString)).toEqual({
      pairInsertions: { CB: 'H', CH: 'B', HH: 'N' },
      polymerTemplate: 'NNCB',
    });
  });
});

describe('runPolymerStep', () => {
  it('should run a polymer step', () => {
    const pairInsertions = { NC: 'B', NN: 'C', CB: 'H' };
    const polymerInfo = {
      polymerTemplate: 'NNCB',
      pairInsertions,
    };
    const numPairs = getStartignNumPairs(polymerInfo);

    expect(
      runPolymerStep({
        numPairs,
        pairInsertions,
      }),
    ).toEqual({
      BC: 1,
      CH: 1,
      CN: 1,
      HB: 1,
      NB: 1,
      NC: 1,
    });
  });
});

describe('runNumPolymerSteps', () => {
  it('should run 4 polymer steps', () => {
    expect(runNumPolymerSteps({ polymerInfo: testData, numSteps: 4 })).toEqual({
      BB: 9,
      BC: 4,
      BH: 3,
      BN: 6,
      CB: 5,
      CC: 2,
      CN: 3,
      HC: 3,
      HH: 1,
      HN: 1,
      NB: 9,
      NC: 1,
      NH: 1,
    });
  });
});

describe('getMaxAndMinLetterOccurence', () => {
  it('should the number of occurences of the min and max char in a string', () => {
    const numPairs = getStartignNumPairs(testData);

    expect(getMaxAndMinLetterOccurence({ numPairs, lastLetter: 'A' })).toEqual({
      min: 1,
      max: 2,
    });
  });
});

describe('getMinMaxAfterNumSteps', () => {
  it('should get the max minus min after num steps', () => {
    expect(getMinMaxAfterNumSteps({ polymerInfo: testData, numSteps: 4 })).toBe(
      18,
    );
  });
});
