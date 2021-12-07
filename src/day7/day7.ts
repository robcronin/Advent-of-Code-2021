import { range } from '../utils/looping';

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
  return range(min, max + 1).reduce((minFuel, position) => {
    const fuel = calculateFuelToTarget(crabPositions, position, fuelForSteps);
    return fuel < minFuel ? fuel : minFuel;
  }, calculateFuelToTarget(crabPositions, min, fuelForSteps));
};

export const day7 = (crabPositions: number[]) =>
  calculateMinFuel(crabPositions, (steps) => steps);

export const day7part2 = (crabPositions: number[]) =>
  calculateMinFuel(crabPositions, (steps) => (steps * (steps + 1)) / 2);
