import { logAnswer } from '../utils/logging';
import { day22, day22part2, getOverlaps } from './day22';
import {
  data,
  mediumTestData,
  onlyOnTestData,
  smallTestData,
  testData,
} from './day22.data';

describe('getOverlaps', () => {
  describe('a is before b', () => {
    it('should handle simple overlap', () => {
      expect(
        getOverlaps({ start: 10, end: 12 }, { start: 11, end: 13 }),
      ).toEqual(
        // sA  sB  eA  eB
        {
          before: { start: 10, end: 10 },
          overlap: { start: 11, end: 12 },
          after: undefined,
        },
      );
    });
    it('should handle same start', () => {
      expect(
        getOverlaps({ start: 11, end: 12 }, { start: 11, end: 13 }),
      ).toEqual(
        // sAB eA eB
        {
          before: undefined,
          overlap: { start: 11, end: 12 },
          after: undefined,
        },
      );
    });
    it('should handle overlap at edge', () => {
      expect(
        getOverlaps({ start: 11, end: 12 }, { start: 12, end: 13 }),
      ).toEqual(
        // sA  eAsB  eB
        {
          before: { start: 11, end: 11 },
          overlap: { start: 12, end: 12 },
          after: undefined,
        },
      );
    });
    it('should handle single range overlap at edge', () => {
      expect(
        getOverlaps({ start: 11, end: 11 }, { start: 11, end: 13 }),
      ).toEqual(
        // sAeAsB  eB
        {
          before: undefined,
          overlap: { start: 11, end: 11 },
          after: undefined,
        },
      );
    });
  });
  describe('b is before a', () => {
    it('reverse should handle simple overlap', () => {
      expect(
        getOverlaps({ start: 11, end: 13 }, { start: 10, end: 12 }),
      ).toEqual(
        // sB  sA  eB  eA
        {
          before: undefined,
          overlap: { start: 11, end: 12 },
          after: { start: 13, end: 13 },
        },
      );
    });
    it('reverse should handle same start', () => {
      expect(
        getOverlaps({ start: 11, end: 13 }, { start: 11, end: 12 }),
      ).toEqual(
        // sAB eA eB
        {
          before: undefined,
          overlap: { start: 11, end: 12 },
          after: { start: 13, end: 13 },
        },
      );
    });
    it('reverse should handle overlap at edge', () => {
      expect(
        getOverlaps({ start: 12, end: 13 }, { start: 11, end: 12 }),
      ).toEqual(
        // sA  eAsB  eB
        {
          before: undefined,
          overlap: { start: 12, end: 12 },
          after: { start: 13, end: 13 },
        },
      );
    });
    it('reverse should handle single range overlap at edge', () => {
      expect(
        getOverlaps({ start: 11, end: 13 }, { start: 11, end: 11 }),
      ).toEqual(
        // sAeAsB  eB
        {
          before: undefined,
          overlap: { start: 11, end: 11 },
          after: { start: 12, end: 13 },
        },
      );
    });
  });
});

describe('day 22', () => {
  it('only on test cases', () => {
    expect(day22(onlyOnTestData)).toBe(46);
  });
  it('small test cases', () => {
    expect(day22(smallTestData)).toBe(39);
  });
  it('test cases', () => {
    expect(day22(testData)).toBe(590784);
  });

  it('answer', () => {
    const answer = day22(data);
    logAnswer(answer, 22, 1);
    expect(answer).toBe(581108);
  });
});

describe('day 22 part 2', () => {
  it('test cases', () => {
    expect(day22part2(mediumTestData)).toBe(2758514936282235);
  });

  it('answer', () => {
    const answer = day22part2(data);
    logAnswer(answer, 22, 2);
    expect(answer).toBe(1325473814582641);
  });
});
