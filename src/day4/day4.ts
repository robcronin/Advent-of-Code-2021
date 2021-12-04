import { parseInput, parseLines } from '../utils/input';

type BingoCard = number[][];
type MarkedNumber = 'x';
const MARK: MarkedNumber = 'x';
export type MarkedBingoCard = (number | MarkedNumber)[][];
type BingoCardsAndNumbers = {
  bingoCards: BingoCard[];
  bingoNumbers: number[];
};

const parseBingoLine = (line: string) =>
  line
    .split('  ')
    .join(' ')
    .split(' ')
    .filter((number) => number !== '')
    .map((number) => Number(number));

export const parseBingoCardsAndNumbers = (
  input: string,
): BingoCardsAndNumbers => {
  const parsed = parseLines(input, '\n');
  const numbersString = parsed.shift();
  if (!numbersString) throw new Error('Input is missing first line');
  const bingoNumbers = parseInput(numbersString) as number[];

  const bingoCards: BingoCard[] = [];
  parsed.forEach((bingoLine) => {
    if (!bingoLine) bingoCards.push([]);
    else {
      bingoCards[bingoCards.length - 1].push(parseBingoLine(bingoLine));
    }
  });
  if (bingoCards.length < 1) throw new Error('No bingo cards found');

  return { bingoCards, bingoNumbers };
};

export const markBingoNumber = (
  cards: BingoCard[] | MarkedBingoCard[],
  target: number,
): MarkedBingoCard[] =>
  cards.map((card) =>
    card.map((row) => row.map((number) => (number === target ? MARK : number))),
  );

export const isCardComplete = (card: MarkedBingoCard): boolean => {
  const hasCompleteRow = card.some((row) =>
    row.every((number) => number === MARK),
  );
  if (hasCompleteRow) return true;
  const hasCompleteColumn = card[0]?.some((_, index) =>
    card.every((row) => row[index] === MARK),
  );
  return hasCompleteColumn;
};

const getCompleteCard = (
  cards: MarkedBingoCard[],
): MarkedBingoCard | undefined => cards.find((card) => isCardComplete(card));

export const sumUnmarkedNumbers = (card: MarkedBingoCard): number =>
  card
    .map((row) =>
      row.reduce(
        (rowSum: number, number) =>
          number !== MARK ? rowSum + number : rowSum,
        0,
      ),
    )
    .reduce((sum, rowSum) => rowSum + sum);

export const day4 = (input: BingoCardsAndNumbers) => {
  const { bingoNumbers, bingoCards } = input;
  let markedCards: MarkedBingoCard[] = bingoCards;

  const lastNumber = bingoNumbers.find((target) => {
    markedCards = markBingoNumber(markedCards, target);
    return getCompleteCard(markedCards);
  });
  const completedCard = getCompleteCard(markedCards);
  if (!completedCard || !lastNumber) throw new Error('No completed card');

  return sumUnmarkedNumbers(completedCard) * lastNumber;
};

export const day4part2 = (input: BingoCardsAndNumbers) => {
  const { bingoNumbers, bingoCards } = input;
  let markedCards: MarkedBingoCard[] = bingoCards;

  const lastNumber = bingoNumbers.find((target) => {
    markedCards = markBingoNumber(markedCards, target);
    if (markedCards.length > 1) {
      markedCards = markedCards.filter((card) => !isCardComplete(card));
    }
    return isCardComplete(markedCards[0]);
  });
  const completedCard = getCompleteCard(markedCards);
  if (!completedCard || !lastNumber) throw new Error('No completed card');

  return sumUnmarkedNumbers(completedCard) * lastNumber;
};
