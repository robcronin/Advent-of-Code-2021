import { range } from './looping';

export type Grid = number[][];
export type GridInfo = { grid: Grid; numRows: number; numCols: number };
export type Coords = { x: number; y: number };

export const genNewGrid = ({
  numRows,
  numCols,
  defaultValue,
}: {
  numRows: number;
  numCols: number;
  defaultValue: number;
}): GridInfo => {
  const newGrid: Grid = [];
  range(numRows).forEach((x) => {
    range(numCols).forEach((y) => {
      if (!newGrid[x]) newGrid.push([]);
      newGrid[x][y] = defaultValue;
    });
  });
  return { numRows, numCols, grid: newGrid };
};

export const deepCopyGrid = ({
  gridInfo,
}: {
  gridInfo: GridInfo;
}): GridInfo => {
  const newGrid: Grid = [];
  const { numRows, numCols, grid } = gridInfo;
  range(numRows).forEach((x) => {
    range(numCols).forEach((y) => {
      if (!newGrid[x]) newGrid.push([]);
      newGrid[x][y] = grid[x][y];
    });
  });
  return { numRows, numCols, grid: newGrid };
};

export const getNeighbourCoords = ({
  coords,
  gridInfo,
  isDiagonal,
}: {
  coords: Coords;
  gridInfo: GridInfo;
  isDiagonal?: boolean;
}): Coords[] => {
  const { x, y } = coords;
  const { numRows, numCols } = gridInfo;
  const neighbourCoords = [];
  if (x > 0) neighbourCoords.push({ x: x - 1, y });
  if (y > 0) neighbourCoords.push({ x, y: y - 1 });
  if (x < numRows - 1) neighbourCoords.push({ x: x + 1, y });
  if (y < numCols - 1) neighbourCoords.push({ x, y: y + 1 });
  if (isDiagonal) {
    if (x > 0 && y > 0) neighbourCoords.push({ x: x - 1, y: y - 1 });
    if (x > 0 && y < numCols - 1) neighbourCoords.push({ x: x - 1, y: y + 1 });
    if (x < numRows - 1 && y > 0) neighbourCoords.push({ x: x + 1, y: y - 1 });
    if (x < numRows - 1 && y < numCols - 1)
      neighbourCoords.push({ x: x + 1, y: y + 1 });
  }
  return neighbourCoords;
};

export const runFnOnGrid = ({
  gridInfo,
  fnToRun,
}: {
  gridInfo: GridInfo;
  fnToRun: (arg: { coords: Coords; grid: Grid; value: number }) => number;
}): GridInfo => {
  const newGrid: Grid = [];
  const { numRows, numCols, grid } = gridInfo;
  range(numRows).forEach((x) => {
    range(numCols).forEach((y) => {
      if (!newGrid[x]) newGrid.push([]);
      newGrid[x][y] = fnToRun({ coords: { x, y }, grid, value: grid[x][y] });
    });
  });
  return { numRows, numCols, grid: newGrid };
};
