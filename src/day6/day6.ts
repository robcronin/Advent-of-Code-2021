type FishCount = Record<number, number | undefined>;

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
  [...Array(totalDays).keys()].reduce((currentFish) => {
    const newFish: FishCount = {};
    for (const key of Object.keys(currentFish)) {
      const day = +key;
      if (day > 0) {
        newFish[day - 1] = currentFish[day];
      }
    }
    const numBreeders = currentFish[0];
    if (numBreeders) {
      newFish[8] = numBreeders;
      newFish[6] = newFish[6] ? newFish[6] + numBreeders : numBreeders;
    }
    return newFish;
  }, fish);

export const sumTotalFish = (fish: FishCount): number =>
  Object.values(fish).reduce((sum: number, num) => (num ? sum + num : sum), 0);

export const day6 = (input: number[]) => {
  const totalDays = 80;
  const startingFish = getStartingFishCount(input);
  const endFish = breedFish({ fish: startingFish, totalDays });

  return sumTotalFish(endFish);
};

export const day6part2 = (input: number[]) => {
  const totalDays = 256;
  const startingFish = getStartingFishCount(input);
  const endFish = breedFish({ fish: startingFish, totalDays });

  return sumTotalFish(endFish);
};
