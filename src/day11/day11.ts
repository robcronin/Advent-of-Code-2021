import {
  Coords,
  deepCopyGrid,
  genNewGrid,
  getNeighbourCoords,
  Grid,
  GridInfo,
  runFnOnGrid,
} from '../utils/grid';
import { range } from '../utils/looping';

export const runFlashInPlace = ({
  gridInfo,
  flasher,
}: {
  gridInfo: GridInfo;
  flasher: Coords;
}): void => {
  const { grid } = gridInfo;
  const neighbours = getNeighbourCoords({
    coords: flasher,
    gridInfo,
    isDiagonal: true,
  });

  neighbours.forEach((coords) => {
    const { x, y } = coords;
    grid[x][y] += 1;
  });
};

export const runOneSweepFlashInPlace = ({
  gridInfo,
  flashes,
}: {
  gridInfo: GridInfo;
  flashes: Grid;
}): { sweepFlashes: number } => {
  const { grid, numRows, numCols } = gridInfo;
  let sweepFlashes = 0;
  range(numRows).forEach((x) => {
    range(numCols).forEach((y) => {
      if (grid[x][y] > 9) {
        if (flashes[x][y] === 0) {
          runFlashInPlace({ gridInfo, flasher: { x, y } });
          flashes[x][y] = 1;
          sweepFlashes++;
        }
      }
    });
  });
  return { sweepFlashes };
};

export const flashWhilePossible = ({
  gridInfo,
  flashes,
}: {
  gridInfo: GridInfo;
  flashes: Grid;
}): { totalStepFlashes: number; gridInfo: GridInfo } => {
  let totalStepFlashes = 0;
  const newGridInfo = deepCopyGrid({ gridInfo });
  while (true) {
    const { sweepFlashes } = runOneSweepFlashInPlace({
      gridInfo: newGridInfo,
      flashes,
    });
    totalStepFlashes += sweepFlashes;
    if (sweepFlashes === 0) break;
  }
  return { totalStepFlashes, gridInfo: newGridInfo };
};

export const runLightStep = (
  gridInfo: GridInfo,
): { newGridInfo: GridInfo; totalStepFlashes: number } => {
  const { grid: flashes } = genNewGrid({ ...gridInfo, defaultValue: 0 });

  const bumpedGridInfo = runFnOnGrid({
    gridInfo,
    fnToRun: ({ value }) => value + 1,
  });

  const { gridInfo: flashedGridInfo, totalStepFlashes } = flashWhilePossible({
    gridInfo: bumpedGridInfo,
    flashes,
  });

  const zeroedGridInfo = runFnOnGrid({
    gridInfo: flashedGridInfo,
    fnToRun: ({ coords, value }) =>
      flashes[coords.x][coords.y] > 0 ? 0 : value,
  });

  return { newGridInfo: zeroedGridInfo, totalStepFlashes };
};

export const getTotalFlashesOverNumSteps = ({
  gridInfo,
  numSteps,
}: {
  gridInfo: GridInfo;
  numSteps: number;
}): number => {
  const { totalFlashes } = range(numSteps).reduce(
    (acc) => {
      const { gridInfo, totalFlashes } = acc;
      const { newGridInfo, totalStepFlashes } = runLightStep(gridInfo);
      return {
        gridInfo: newGridInfo,
        totalFlashes: totalFlashes + totalStepFlashes,
      };
    },
    { gridInfo, totalFlashes: 0 },
  );
  return totalFlashes;
};

export const stepsUntilFullGridFlash = ({
  gridInfo,
}: {
  gridInfo: GridInfo;
}): number => {
  const { numRows, numCols } = gridInfo;
  let currentGridInfo = gridInfo;
  let steps = 0;
  while (true) {
    const { newGridInfo, totalStepFlashes } = runLightStep(currentGridInfo);
    steps++;
    currentGridInfo = newGridInfo;
    if (totalStepFlashes === numRows * numCols) break;
  }
  return steps;
};

export const day11 = (gridInfo: GridInfo) =>
  getTotalFlashesOverNumSteps({ gridInfo, numSteps: 100 });

export const day11part2 = (gridInfo: GridInfo) =>
  stepsUntilFullGridFlash({ gridInfo });
