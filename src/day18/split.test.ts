import { snailfishSplit } from './split';

describe('snailfishSplit', () => {
  it('should split a number gte 10', () => {
    expect(
      snailfishSplit([
        [
          [[0, 7], 4],
          [15, [0, 13]],
        ],
        [1, 1],
      ]),
    ).toEqual({
      snailfishPair: [
        [
          [[0, 7], 4],
          [
            [7, 8],
            [0, 13],
          ],
        ],
        [1, 1],
      ],
      didSplit: true,
    });
    expect(
      snailfishSplit([
        [
          [[0, 7], 4],
          [
            [7, 8],
            [0, 13],
          ],
        ],
        [1, 1],
      ]),
    ).toEqual({
      snailfishPair: [
        [
          [[0, 7], 4],
          [
            [7, 8],
            [0, [6, 7]],
          ],
        ],
        [1, 1],
      ],
      didSplit: true,
    });
  });
  it('should not split a pair with no number gte 10', () => {
    const snailfishPair = [
      [
        [[0, 7], 4],
        [
          [7, 8],
          [0, 3],
        ],
      ],
      [1, 1],
    ];
    expect(snailfishSplit(snailfishPair)).toEqual({
      snailfishPair,
      didSplit: false,
    });
  });
});
