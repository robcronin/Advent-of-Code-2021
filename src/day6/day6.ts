import { range } from '../utils/looping';

type FishCount = Record<number, number | undefined>;
type FishSpawns = FishCount;

const NEW_SPAWN = 9;
const MAIN_SPAWN = 7;

export const getStartingFishCount = (input: number[]): FishCount =>
  input.reduce((total: FishCount, days) => {
    const currentValue = total[days];
    return {
      ...total,
      [days]: currentValue ? currentValue + 1 : 1,
    };
  }, {});

export const breedFish = ({
  fish,
  totalDays,
}: {
  fish: FishCount;
  totalDays: number;
}): FishCount =>
  range(totalDays).reduce((currentFish) => {
    const newFish: FishCount = {};
    for (const key of Object.keys(currentFish)) {
      const day = +key;
      if (day > 0) {
        newFish[day - 1] = currentFish[day];
      }
    }
    const numBreeders = currentFish[0];
    if (numBreeders) {
      newFish[NEW_SPAWN - 1] = numBreeders;
      newFish[MAIN_SPAWN - 1] = (newFish[MAIN_SPAWN - 1] || 0) + numBreeders;
    }
    return newFish;
  }, fish);

export const sumTotalFish = (fish: FishCount): number =>
  Object.values(fish).reduce((sum: number, num) => (num ? sum + num : sum), 0);

export const caculateEndFish = ({
  input,
  totalDays,
}: {
  input: number[];
  totalDays: number;
}) => {
  const startingFish = getStartingFishCount(input);
  const endFish = breedFish({ fish: startingFish, totalDays });

  return sumTotalFish(endFish);
};

export const day6 = (input: number[]) =>
  caculateEndFish({ input, totalDays: 80 });

export const day6part2 = (input: number[]) =>
  caculateEndFish({ input, totalDays: 256 });

const generateNumSpawns = (max: number): FishSpawns =>
  range(max).reduce((spawns: FishSpawns, i) => {
    const numChildren = Math.floor((i - 1) / MAIN_SPAWN) + 1;
    const childSpawnDays = range(numChildren)
      .map((child) => i - NEW_SPAWN - child * MAIN_SPAWN)
      .filter((days) => days > 0);
    const expChildren = childSpawnDays.reduce(
      (sum, day) => sum + (spawns[day] || 0) - 1,
      0,
    );
    return { ...spawns, [i]: 1 + numChildren + expChildren };
  }, {});

export const day6Maths = ({
  input,
  totalDays,
}: {
  input: number[];
  totalDays: number;
}) => {
  const spawns = generateNumSpawns(totalDays);
  return input.reduce((sum, days) => sum + (spawns[totalDays - days] || 0), 0);
};
