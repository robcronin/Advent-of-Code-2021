export const calculateFuelToTarget = (
  crabPositions: number[],
  target: number,
  fuelForSteps: (steps: number) => number,
): number =>
  crabPositions.reduce(
    (fuel, position) => fuel + fuelForSteps(Math.abs(position - target)),
    0,
  );

export const calculateMinFuel = (
  crabPositions: number[],
  fuelForSteps: (steps: number) => number,
): number => {
  const min = Math.min(...crabPositions);
  const max = Math.max(...crabPositions);
  let minFuel = calculateFuelToTarget(crabPositions, min, fuelForSteps);
  for (let i = min + 1; i <= max; i++) {
    const fuel = calculateFuelToTarget(crabPositions, i, fuelForSteps);
    if (fuel < minFuel) minFuel = fuel;
  }
  return minFuel;
};

export const day7 = (crabPositions: number[]) =>
  calculateMinFuel(crabPositions, (steps) => steps);

export const day7part2 = (crabPositions: number[]) =>
  calculateMinFuel(crabPositions, (steps) => (steps * (steps + 1)) / 2);
