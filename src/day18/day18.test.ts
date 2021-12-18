import { logAnswer } from '../utils/logging';
import {
  day18,
  day18part2,
  getMaxPairMagnitude,
  getSnailfishMagnitude,
  parseSnailfishPairs,
  snailfishAdd,
  snailfishOperateList,
  snailfishReduce,
} from './day18';
import { input } from './day18.data';

const smallTestString = `[1,1]
[2,2]
[3,3]
[4,4]
[5,5]`;
const midTestString = `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]`;
const testString = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;

const smallTestData = parseSnailfishPairs(smallTestString);
const midTestData = parseSnailfishPairs(midTestString);
const testData = parseSnailfishPairs(testString);
const data = parseSnailfishPairs(input);

describe('day 18', () => {
  it('test cases', () => {
    expect(day18(testData)).toBe(4140);
  });

  it('answer', () => {
    const answer = day18(data);
    logAnswer(answer, 18, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(4469);
  });
});

describe('day 18 part 2', () => {
  it('test cases', () => {
    expect(day18part2(testData)).toBe(3993);
  });

  it.skip('answer', () => {
    const answer = day18part2(data);
    logAnswer(answer, 18, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(4770);
  });
});

describe('parseSnailfishPairs', () => {
  it('should parse snailfish pairs', () => {
    expect(parseSnailfishPairs(smallTestString)).toEqual([
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
      [5, 5],
    ]);
  });
});

describe('snailfishReduce', () => {
  it('should reduce a snailfish pair', () => {
    expect(
      snailfishReduce([
        [
          [[[4, 3], 4], 4],
          [7, [[8, 4], 9]],
        ],
        [1, 1],
      ]),
    ).toEqual([
      [
        [[0, 7], 4],
        [
          [7, 8],
          [6, 0],
        ],
      ],
      [8, 1],
    ]);
  });
});

describe('snailfishAdd', () => {
  it('should add two simple snailfish pairs', () => {
    expect(snailfishAdd([1, 2], [[3, 4], 5])).toEqual([
      [1, 2],
      [[3, 4], 5],
    ]);
  });
  it('should add and reduce two snailfish pair', () => {
    expect(
      snailfishAdd(
        [
          [[[4, 3], 4], 4],
          [7, [[8, 4], 9]],
        ],
        [1, 1],
      ),
    ).toEqual([
      [
        [[0, 7], 4],
        [
          [7, 8],
          [6, 0],
        ],
      ],
      [8, 1],
    ]);
  });
});

describe('snailfishOperateList', () => {
  it('should add a list of snailfish pairs and reduce as they go for small data', () => {
    expect(snailfishOperateList(smallTestData, snailfishAdd)).toEqual([
      [
        [
          [3, 0],
          [5, 3],
        ],
        [4, 4],
      ],
      [5, 5],
    ]);
  });

  it('should add a list of snailfish pairs and reduce as they go for mid data', () => {
    expect(snailfishOperateList(midTestData, snailfishAdd)).toEqual([
      [
        [
          [8, 7],
          [7, 7],
        ],
        [
          [8, 6],
          [7, 7],
        ],
      ],
      [
        [
          [0, 7],
          [6, 6],
        ],
        [8, 7],
      ],
    ]);
  });
  it('should add a list of snailfish pairs and reduce as they go for test data', () => {
    expect(snailfishOperateList(testData, snailfishAdd)).toEqual([
      [
        [
          [6, 6],
          [7, 6],
        ],
        [
          [7, 7],
          [7, 0],
        ],
      ],
      [
        [
          [7, 7],
          [7, 7],
        ],
        [
          [7, 8],
          [9, 9],
        ],
      ],
    ]);
  });
});

describe('getSnailfishMagnitude', () => {
  it('should get the snailfish magnitude of a simple case', () => {
    expect(getSnailfishMagnitude([9, 1])).toBe(29);
  });
  it('should get the snailfish magnitude of a normal case', () => {
    expect(
      getSnailfishMagnitude([
        [1, 2],
        [[3, 4], 5],
      ]),
    ).toBe(143);
  });
});

describe('getMaxPairMagnitude', () => {
  it('should get the max pair magnitude', () => {
    expect(getMaxPairMagnitude(testData)).toBe(3993);
  });
});
