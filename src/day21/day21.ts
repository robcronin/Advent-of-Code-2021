import { range } from '../utils/looping';

type TwoPlayer = [number, number];

export const getWrappedValue = (
  start: number,
  increase: number,
  size: number,
) => {
  const nextValue = (start + increase) % size;
  return nextValue === 0 ? size : nextValue;
};

export const getNextNumRolls = (
  startingDie: number,
  numRolls: number,
  dieSize: number,
): number[] => {
  let die = startingDie;
  return range(numRolls).map(() => {
    die = getWrappedValue(die, 1, dieSize);
    return die;
  });
};

export const runGameTillScore = ({
  startingPositions,
  winningScore,
  pathSize,
  dieSize,
}: {
  startingPositions: TwoPlayer;
  winningScore: number;
  pathSize: number;
  dieSize: number;
}): { scores: TwoPlayer; positions: TwoPlayer; dieRolls: number } => {
  const [startingA, startingB] = startingPositions;
  const positions: TwoPlayer = [startingA, startingB];
  const scores: TwoPlayer = [0, 0];
  let die = 0;
  let dieRolls = 0;
  let personRolling = 0;
  const numRollsPerTurn = 3;
  while (Math.max(...scores) < winningScore) {
    const rolls = getNextNumRolls(die, numRollsPerTurn, dieSize);
    dieRolls += numRollsPerTurn;
    die = rolls[numRollsPerTurn - 1];
    const rollScore = rolls.reduce((sum, roll) => sum + roll, 0);
    positions[personRolling] = getWrappedValue(
      positions[personRolling],
      rollScore,
      pathSize,
    );
    scores[personRolling] += positions[personRolling];
    personRolling = (personRolling + 1) % 2;
  }
  return { scores, positions, dieRolls };
};

const dieUniverseOptions: Record<number, number> = {
  3: 1,
  4: 3,
  5: 6,
  6: 7,
  7: 6,
  8: 3,
  9: 1,
};

export const getTotalWinsFromDiracGame = ({
  startingPositions,
  winningScore,
  pathSize,
  personRolling,
  startingScores,
}: {
  startingPositions: TwoPlayer;
  winningScore: number;
  pathSize: number;
  personRolling: number;
  startingScores: TwoPlayer;
}): TwoPlayer => {
  return Object.keys(dieUniverseOptions).reduce(
    (numWins, rollScore) => {
      const numPerms = dieUniverseOptions[+rollScore];
      const positions: TwoPlayer = [...startingPositions];
      const scores: TwoPlayer = [...startingScores];
      positions[personRolling] = getWrappedValue(
        positions[personRolling],
        +rollScore,
        pathSize,
      );
      scores[personRolling] += positions[personRolling];
      if (scores[personRolling] >= winningScore) {
        if (personRolling === 0) {
          return [numWins[0] + numPerms, numWins[1]];
        } else {
          return [numWins[0], numWins[1] + numPerms];
        }
      } else {
        const deeperNumWins = getTotalWinsFromDiracGame({
          startingPositions: positions,
          personRolling: (personRolling + 1) % 2,
          startingScores: scores,
          winningScore,
          pathSize,
        });
        return [
          numWins[0] + numPerms * deeperNumWins[0],
          numWins[1] + numPerms * deeperNumWins[1],
        ];
      }
    },
    [0, 0],
  );
};

export const day21 = (startingPositions: TwoPlayer) => {
  const { scores, dieRolls } = runGameTillScore({
    startingPositions,
    winningScore: 1000,
    pathSize: 10,
    dieSize: 100,
  });
  return Math.min(...scores) * dieRolls;
};
export const day21part2 = (startingPositions: TwoPlayer) => {
  const numWins = getTotalWinsFromDiracGame({
    startingPositions,
    personRolling: 0,
    startingScores: [0, 0],
    winningScore: 21,
    pathSize: 10,
  });
  return Math.max(...numWins);
};
