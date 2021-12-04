import { logAnswer } from '../utils/logging';
import {
  day4,
  day4part2,
  isCardComplete,
  markBingoNumber,
  MarkedBingoCard,
  parseBingoCardsAndNumbers,
  sumUnmarkedNumbers,
} from './day4';
import { input } from './day4.data';

const testString = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;
const testData = parseBingoCardsAndNumbers(testString);
const data = parseBingoCardsAndNumbers(input);

describe('day 4', () => {
  it('test cases', () => {
    expect(day4(testData)).toBe(4512);
  });

  it('answer', () => {
    const answer = day4(data);
    logAnswer(answer, 4, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(50008);
  });
});

describe('day 4 part 2', () => {
  it('test cases', () => {
    expect(day4part2(testData)).toBe(1924);
  });

  it('answer', () => {
    const answer = day4part2(data);
    logAnswer(answer, 4, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(17408);
  });
});

describe('parseBingoCardsAndNumbers', () => {
  it('should parse the bingo card input', () => {
    expect(testData).toEqual({
      bingoCards: [
        [
          [22, 13, 17, 11, 0],
          [8, 2, 23, 4, 24],
          [21, 9, 14, 16, 7],
          [6, 10, 3, 18, 5],
          [1, 12, 20, 15, 19],
        ],
        [
          [3, 15, 0, 2, 22],
          [9, 18, 13, 17, 5],
          [19, 8, 7, 25, 23],
          [20, 11, 10, 24, 4],
          [14, 21, 16, 12, 6],
        ],
        [
          [14, 21, 17, 24, 4],
          [10, 16, 15, 9, 19],
          [18, 8, 23, 26, 20],
          [22, 11, 13, 6, 5],
          [2, 0, 12, 3, 7],
        ],
      ],
      bingoNumbers: [
        7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22,
        18, 20, 8, 19, 3, 26, 1,
      ],
    });
  });
});

describe('markBingoNumber', () => {
  it('should mark a card with xs', () => {
    expect(
      markBingoNumber(
        [
          [
            [1, 'x'],
            [3, 4],
          ],
        ],
        3,
      ),
    ).toEqual([
      [
        [1, 'x'],
        ['x', 4],
      ],
    ]);
  });
});

describe('isCardComplete', () => {
  it('should say complete if full row', () => {
    const fullRow: MarkedBingoCard = [
      ['x', 'x', 'x', 'x', 'x'],
      [10, 16, 15, 'x', 19],
      [18, 8, 'x', 26, 20],
      [22, 'x', 13, 6, 'x'],
      ['x', 'x', 12, 3, 'x'],
    ];
    expect(isCardComplete(fullRow)).toBe(true);
  });
  it('should say complete if full column', () => {
    const fullColumn: MarkedBingoCard = [
      ['x', 'x', 'x', 'x', 2],
      [10, 16, 'x', 'x', 19],
      [18, 8, 'x', 26, 20],
      [22, 'x', 'x', 6, 'x'],
      ['x', 'x', 'x', 3, 'x'],
    ];
    expect(isCardComplete(fullColumn)).toBe(true);
  });
  it('should not say complete if full diagonal', () => {
    const fullDiagonal: MarkedBingoCard = [
      ['x', 'x', 'x', 3, 'x'],
      [10, 16, 2, 'x', 19],
      [18, 8, 'x', 26, 20],
      [22, 'x', 'x', 6, 'x'],
      ['x', 'x', 'x', 3, 'x'],
    ];
    expect(isCardComplete(fullDiagonal)).toBe(false);
  });
});

describe('sumUnmarkedNumbers', () => {
  it('should sum the non marked numbers', () => {
    expect(
      sumUnmarkedNumbers([
        [1, 'x'],
        [3, 'x'],
      ]),
    ).toBe(4);
  });
});

describe('bad inputs should throw errors', () => {
  const noMatchData = parseBingoCardsAndNumbers(`2

  3`);
  it('should throw an error if missing first line', () => {
    expect(() => parseBingoCardsAndNumbers('')).toThrowError(
      'Input is missing first line',
    );
  });
  it('should throw an error if no bingo cards', () => {
    expect(() => parseBingoCardsAndNumbers('2')).toThrowError(
      'No bingo cards found',
    );
  });
  it('should throw an error if no completed card found in part 1', () => {
    expect(() => day4(noMatchData)).toThrowError('No completed card');
  });
  it('should throw an error if no completed card found in part 2', () => {
    expect(() => day4part2(noMatchData)).toThrowError('No completed card');
  });
});
