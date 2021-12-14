import { parseLines } from '../utils/input';
import { range } from '../utils/looping';

type PairInsertion = Record<string, string>;
type PolymerInfo = {
  polymerTemplate: string;
  pairInsertions: Record<string, string>;
};
type NumPairs = Record<string, number>;

export const parsePolymerInfo = (input: string): PolymerInfo => {
  const parsed = parseLines(input);
  const polymerTemplate = parsed[0];
  const pairInsertions = parsed
    .slice(2)
    .reduce((accPairInstructions, instruction) => {
      const [pair, newElement] = instruction.split(' -> ');
      return { ...accPairInstructions, [pair]: newElement };
    }, {});
  return { polymerTemplate, pairInsertions };
};

export const getStartignNumPairs = (polymerInfo: PolymerInfo): NumPairs => {
  const { polymerTemplate } = polymerInfo;
  return [...polymerTemplate].reduce(
    (numPairs: Record<string, number>, char, index) => {
      if (index === polymerTemplate.length - 1) return numPairs;
      const pair = char + polymerTemplate[index + 1];
      return {
        ...numPairs,
        [pair]: (numPairs[pair] || 0) + 1,
      };
    },
    {},
  );
};

export const runPolymerStep = ({
  pairInsertions,
  numPairs,
}: {
  pairInsertions: PairInsertion;
  numPairs: NumPairs;
}): NumPairs =>
  Object.keys(numPairs).reduce((accExtraPairs: NumPairs, pair) => {
    const newElement = pairInsertions[pair];
    const newPair1 = pair[0] + newElement;
    const newPair2 = newElement + pair[1];
    return {
      ...accExtraPairs,
      [newPair1]: (accExtraPairs[newPair1] || 0) + numPairs[pair],
      [newPair2]: (accExtraPairs[newPair2] || 0) + numPairs[pair],
    };
  }, {});

export const runNumPolymerSteps = ({
  polymerInfo,
  numSteps,
}: {
  polymerInfo: PolymerInfo;
  numSteps: number;
}): NumPairs => {
  const { pairInsertions } = polymerInfo;
  const numPairs = getStartignNumPairs(polymerInfo);
  return range(numSteps).reduce(
    (accPairs) => runPolymerStep({ pairInsertions, numPairs: accPairs }),
    numPairs,
  );
};

export const getMaxAndMinLetterOccurence = ({
  numPairs,
  lastLetter,
}: {
  numPairs: NumPairs;
  lastLetter: string;
}): { min: number; max: number } => {
  const charCounts = Object.keys(numPairs).reduce(
    (counts: Record<string, number>, pair) => {
      const letterOne = pair[0];
      return {
        ...counts,
        [letterOne]: (counts[letterOne] || 0) + numPairs[pair],
      };
    },
    { [lastLetter]: 1 },
  );
  const sortedCounts = Object.values(charCounts).sort((a, b) => a - b);
  return { min: sortedCounts[0], max: sortedCounts.pop() as number };
};

export const getMinMaxAfterNumSteps = ({
  polymerInfo,
  numSteps,
}: {
  polymerInfo: PolymerInfo;
  numSteps: number;
}): number => {
  const postPairs = runNumPolymerSteps({ polymerInfo, numSteps });

  const { min, max } = getMaxAndMinLetterOccurence({
    numPairs: postPairs,
    lastLetter: [...polymerInfo.polymerTemplate].pop() as string,
  });
  return max - min;
};

export const day14 = (polymerInfo: PolymerInfo) =>
  getMinMaxAfterNumSteps({ polymerInfo, numSteps: 10 });

export const day14part2 = (polymerInfo: PolymerInfo) =>
  getMinMaxAfterNumSteps({ polymerInfo, numSteps: 40 });
