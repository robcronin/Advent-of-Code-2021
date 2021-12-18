export type SnailfishPair = (SnailfishPair | number)[];

import { parseLines } from '../utils/input';
import { snailfishExplode } from './explode';
import { snailfishSplit } from './split';

export const parseSnailfishPairs = (input: string): SnailfishPair[] => {
  const parsed = parseLines(input);
  return parsed.map((line) => JSON.parse(line));
};

export const snailfishReduce = (
  snailfishPair: SnailfishPair,
): SnailfishPair => {
  let didExplode = false;
  let didSplit = false;
  let finalSnailfishPair = snailfishPair;
  do {
    do {
      const explodeResult = snailfishExplode(finalSnailfishPair);
      didExplode = explodeResult.didExplode;
      finalSnailfishPair = explodeResult.snailfishPair;
    } while (didExplode);
    const splitResult = snailfishSplit(finalSnailfishPair);
    didSplit = splitResult.didSplit;
    finalSnailfishPair = splitResult.snailfishPair;
  } while (didExplode || didSplit);
  return finalSnailfishPair;
};

export const snailfishAdd = (
  snailfishPairA: SnailfishPair,
  snailfishPairB: SnailfishPair,
): SnailfishPair => snailfishReduce([snailfishPairA, snailfishPairB]);

export const snailfishOperateList = (
  snailfishPairs: SnailfishPair[],
  operation: (a: SnailfishPair, b: SnailfishPair) => SnailfishPair,
) => {
  const [firstPair, ...restPairs] = snailfishPairs;
  const acc = restPairs.reduce(
    (accPair, nextPair) => operation(accPair, nextPair),
    firstPair,
  );
  return snailfishReduce(acc);
};

export const getSnailfishMagnitude = (snailfishPair: SnailfishPair): number => {
  const [left, right] = snailfishPair;
  const leftMag =
    typeof left === 'number' ? 3 * left : 3 * getSnailfishMagnitude(left);
  const rightMag =
    typeof right === 'number' ? 2 * right : 2 * getSnailfishMagnitude(right);
  return leftMag + rightMag;
};

export const getMaxPairMagnitude = (
  snailfishPairs: SnailfishPair[],
): number => {
  return snailfishPairs.reduce((max, snailfishPairA, indexA) => {
    const localMax = snailfishPairs.reduce(
      (localMax, snailfishPairB, indexB) => {
        if (indexA !== indexB) {
          const addedPairs = snailfishAdd(snailfishPairA, snailfishPairB);
          const magnitude = getSnailfishMagnitude(addedPairs);
          return magnitude > localMax ? magnitude : localMax;
        }
        return localMax;
      },
      0,
    );
    return localMax > max ? localMax : max;
  }, 0);
};

export const day18 = (snailfishPairs: SnailfishPair[]) => {
  const addedPairs = snailfishOperateList(snailfishPairs, snailfishAdd);
  return getSnailfishMagnitude(addedPairs);
};
export const day18part2 = getMaxPairMagnitude;
