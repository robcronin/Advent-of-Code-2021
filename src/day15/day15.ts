import {
  Coords,
  genNewGrid,
  getNeighbourCoords,
  GridInfo,
} from '../utils/grid';
import { range } from '../utils/looping';

const MAX_VALUE = 9;

export const replicateGrid = (
  gridInfo: GridInfo<number>,
  repNumber: number,
): GridInfo<number> => {
  const { numRows, numCols, grid } = gridInfo;
  const newGridInfo = genNewGrid({
    numRows: numRows * repNumber,
    numCols: numCols * repNumber,
    defaultValue: 0,
  });

  range(repNumber).forEach((repNumX) => {
    range(repNumber).forEach((repNumY) => {
      range(numRows).forEach((x) => {
        range(numCols).forEach((y) => {
          const actualX = x + repNumX * numRows;
          const actualY = y + repNumY * numCols;
          const ogValue = grid[x][y];
          const actualValue = (repNumX + repNumY + ogValue) % MAX_VALUE;
          const adjustedValue = actualValue === 0 ? MAX_VALUE : actualValue;
          newGridInfo.grid[actualX][actualY] = adjustedValue;
        });
      });
    });
  });

  return newGridInfo;
};

export const getMinTravelCost = (gridInfo: GridInfo<number>): number => {
  const { numRows, numCols, grid } = gridInfo;
  const { grid: visitedGrid } = genNewGrid({
    ...gridInfo,
    defaultValue: false,
  });

  const target = { x: numRows - 1, y: numCols - 1 };
  const queue: { coords: Coords; cost: number }[] = [
    { coords: { x: 0, y: 0 }, cost: 0 },
  ];
  let ans: number = numRows * numCols * MAX_VALUE;

  while (!visitedGrid[target.x][target.y]) {
    const nextNode = queue.shift();
    if (!nextNode) break;
    const { coords, cost: nodeCost } = nextNode;
    if (coords.x === target.x && coords.y === target.y) {
      ans = nodeCost;
      break;
    }
    const { x, y } = coords;
    const neighbours = getNeighbourCoords({ coords, gridInfo });
    neighbours.forEach((neighbour) => {
      const { x: neighX, y: neighY } = neighbour;
      if (!visitedGrid[neighX][neighY]) {
        const currentNeighboutCost =
          queue.find((a) => a.coords.x === neighX && a.coords.y === neighY)
            ?.cost || numRows * numCols * MAX_VALUE;
        const neighbourAdditonalCost = grid[neighX][neighY];
        const potentialMinCost = nodeCost + neighbourAdditonalCost;
        if (potentialMinCost < currentNeighboutCost) {
          queue.push({
            coords: { x: neighX, y: neighY },
            cost: potentialMinCost,
          });
        }
      }
      queue.sort((a, b) => a.cost - b.cost);
    });

    visitedGrid[x][y] = true;
  }
  return ans;
};

export const day15 = getMinTravelCost;

export const day15part2 = (ogGridInfo: GridInfo<number>) => {
  const gridInfo = replicateGrid(ogGridInfo, 5);
  return getMinTravelCost(gridInfo);
};
