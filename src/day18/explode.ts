import { SnailfishPair } from './day18';

export const getPreExplodeString = ({
  stringifiedSnailfishPair,
  explodeIndexStart,
  left,
}: {
  stringifiedSnailfishPair: string;
  explodeIndexStart: number;
  left: number;
}): string => {
  const stringifiedPreExplode = stringifiedSnailfishPair.slice(
    0,
    explodeIndexStart,
  );
  const lastPreExplodeNumberReversed = [...stringifiedPreExplode]
    .reverse()
    .findIndex((char) => !isNaN(Number(char)));
  const preNumberLength =
    lastPreExplodeNumberReversed === -1
      ? 0
      : isNaN(
          Number(
            [...stringifiedPreExplode].reverse()[
              lastPreExplodeNumberReversed + 1
            ],
          ),
        )
      ? 1
      : 2;
  const lastPreExplodeNumber =
    lastPreExplodeNumberReversed === -1
      ? -1
      : stringifiedPreExplode.length -
        lastPreExplodeNumberReversed -
        preNumberLength;
  return lastPreExplodeNumber === -1
    ? stringifiedPreExplode
    : stringifiedPreExplode.slice(0, lastPreExplodeNumber) +
        (
          left +
          Number(
            stringifiedPreExplode.slice(
              lastPreExplodeNumber,
              lastPreExplodeNumber + preNumberLength,
            ),
          )
        ).toString() +
        stringifiedPreExplode.slice(lastPreExplodeNumber + preNumberLength);
};

export const getPostExplodeString = ({
  stringifiedSnailfishPair,
  explodeIndexEnd,
  right,
}: {
  stringifiedSnailfishPair: string;
  explodeIndexEnd: number;
  right: number;
}): string => {
  const stringifiedPostExplode =
    stringifiedSnailfishPair.slice(explodeIndexEnd);
  const firstPostExplodeNumber = [...stringifiedPostExplode].findIndex(
    (char) => !isNaN(Number(char)),
  );
  const postNumberLength =
    firstPostExplodeNumber === -1
      ? 0
      : isNaN(Number(stringifiedPostExplode[firstPostExplodeNumber + 1]))
      ? 1
      : 2;

  return firstPostExplodeNumber === -1
    ? stringifiedPostExplode
    : stringifiedPostExplode.slice(0, firstPostExplodeNumber) +
        (
          right +
          Number(
            stringifiedPostExplode.slice(
              firstPostExplodeNumber,
              firstPostExplodeNumber + postNumberLength,
            ),
          )
        ).toString() +
        stringifiedPostExplode.slice(firstPostExplodeNumber + postNumberLength);
};

export const snailfishExplode = (
  snailfishPair: SnailfishPair,
): { snailfishPair: SnailfishPair; didExplode: boolean } => {
  let bracketCount = 0;
  const stringifiedSnailfishPair = JSON.stringify(snailfishPair);
  const explodeIndexStart = [...stringifiedSnailfishPair].findIndex((char) => {
    if (char === '[') bracketCount++;
    else if (char === ']') bracketCount--;
    if (bracketCount === 5) return true;
  });
  if (explodeIndexStart !== -1) {
    const explodeIndexEnd =
      stringifiedSnailfishPair.slice(explodeIndexStart).indexOf(']') +
      explodeIndexStart +
      1;
    const stringifiedExplodePair = stringifiedSnailfishPair.slice(
      explodeIndexStart,
      explodeIndexEnd,
    );
    const explodePair = JSON.parse(stringifiedExplodePair);
    const [left, right] = explodePair;

    const preExplodeString = getPreExplodeString({
      stringifiedSnailfishPair,
      explodeIndexStart,
      left,
    });

    const postExplodeString = getPostExplodeString({
      stringifiedSnailfishPair,
      explodeIndexEnd,
      right,
    });

    return {
      snailfishPair: JSON.parse(preExplodeString + '0' + postExplodeString),
      didExplode: true,
    };
  }
  return { snailfishPair, didExplode: false };
};
