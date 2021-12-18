import { SnailfishPair } from './day18';

export const snailfishSplit = (
  snailfishPair: SnailfishPair,
): { didSplit: boolean; snailfishPair: SnailfishPair } => {
  const stringifedSnailfishPair = JSON.stringify(snailfishPair);
  const numberGte10Index = [...stringifedSnailfishPair].findIndex(
    (char, index) => {
      const char1Num = !isNaN(Number(char));
      const char2Num =
        index < stringifedSnailfishPair.length - 1 &&
        !isNaN(Number(stringifedSnailfishPair[index + 1]));
      return char1Num && char2Num;
    },
  );
  if (numberGte10Index === -1) return { snailfishPair, didSplit: false };
  const numToSplit = Number(
    stringifedSnailfishPair.slice(numberGte10Index, numberGte10Index + 2),
  );
  const left = Math.floor(numToSplit / 2);
  const right = Math.ceil(numToSplit / 2);
  return {
    snailfishPair: JSON.parse(
      stringifedSnailfishPair.slice(0, numberGte10Index) +
        `[${left},${right}]` +
        stringifedSnailfishPair.slice(numberGte10Index + 2),
    ),
    didSplit: true,
  };
};
