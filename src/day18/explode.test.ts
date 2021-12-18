import {
  getPostExplodeString,
  getPreExplodeString,
  snailfishExplode,
} from './explode';

describe('getPreExplodeString', () => {
  it('should get the pre explode string for no left number', () => {
    expect(
      getPreExplodeString({
        stringifiedSnailfishPair: '[[[[[9,8],1],2],3],4]',
        explodeIndexStart: 4,
        left: 9,
      }),
    ).toBe('[[[[');
  });
  it('should get the pre explode string for string with a left number', () => {
    expect(
      getPreExplodeString({
        stringifiedSnailfishPair: '[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]',
        explodeIndexStart: 10,
        left: 7,
      }),
    ).toBe('[[3,[2,[8,');
  });
});

describe('getPostExplodeString', () => {
  it('should get the post explode string for string with a left number', () => {
    expect(
      getPostExplodeString({
        stringifiedSnailfishPair: '[[[[[9,8],1],2],3],4]',
        explodeIndexEnd: 9,
        right: 8,
      }),
    ).toBe(',9],2],3],4]');
  });
});

describe('snailfishExplode', () => {
  it('should explode the first pair nested 4 times', () => {
    expect(snailfishExplode([[[[[9, 8], 1], 2], 3], 4])).toEqual({
      snailfishPair: [[[[0, 9], 2], 3], 4],
      didExplode: true,
    });
  });
  it('should explode a middle pair nested 4 times', () => {
    expect(
      snailfishExplode([
        [3, [2, [1, [7, 3]]]],
        [6, [5, [4, [3, 2]]]],
      ]),
    ).toEqual({
      snailfishPair: [
        [3, [2, [8, 0]]],
        [9, [5, [4, [3, 2]]]],
      ],
      didExplode: true,
    });
  });
  it('should not explode a number with no 4 nested pair', () => {
    expect(
      snailfishExplode([
        [1, 1],
        [2, 3],
      ]),
    ).toEqual({
      snailfishPair: [
        [1, 1],
        [2, 3],
      ],
      didExplode: false,
    });
  });
  it('should explode other pairs', () => {
    expect(snailfishExplode([7, [6, [5, [4, [3, 2]]]]])).toEqual({
      snailfishPair: [7, [6, [5, [7, 0]]]],
      didExplode: true,
    });
    expect(snailfishExplode([[6, [5, [4, [3, 2]]]], 1])).toEqual({
      snailfishPair: [[6, [5, [7, 0]]], 3],
      didExplode: true,
    });
    expect(
      snailfishExplode([
        [3, [2, [8, 0]]],
        [9, [5, [4, [3, 2]]]],
      ]),
    ).toEqual({
      snailfishPair: [
        [3, [2, [8, 0]]],
        [9, [5, [7, 0]]],
      ],
      didExplode: true,
    });
  });
});
