import { Coords, getNeighbourCoords, GridInfo } from '../utils/grid';

type Basins = (Coords | undefined)[][];
type BasinSizes = Record<string, number>;

const MAX_HEIGHT = 9;

export const findLowLevels = (gridInfo: GridInfo): number[] => {
  const { grid, numRows, numCols } = gridInfo;
  const lowLevels = [];
  for (let x = 0; x < numRows; x++) {
    for (let y = 0; y < numCols; y++) {
      const neighbourCoords = getNeighbourCoords({
        coords: { x, y },
        gridInfo,
      });
      const isLowLevel = neighbourCoords.every((coords) => {
        return grid[x][y] < grid[coords.x][coords.y];
      });
      if (isLowLevel) lowLevels.push(grid[x][y]);
    }
  }
  return lowLevels;
};

export const getLowestNeighbour = ({
  coords,
  gridInfo,
}: {
  coords: Coords;
  gridInfo: GridInfo;
}): Coords => {
  const neighbourCoords = getNeighbourCoords({
    coords,
    gridInfo,
  });
  const { grid } = gridInfo;
  return neighbourCoords.reduce((minCoords, neighbourCoords) => {
    const { x: minX, y: minY } = minCoords;
    const { x: neighX, y: neighY } = neighbourCoords;
    const currentMin = grid[minX][minY];
    const neighbour = grid[neighX][neighY];
    if (neighbour < currentMin) return neighbourCoords;
    return minCoords;
  }, coords);
};

export const getBasinForCoord = ({
  basins,
  gridInfo,
  coords,
}: {
  basins: Basins;
  gridInfo: GridInfo;
  coords: Coords;
}): Coords | undefined => {
  const { x, y } = coords;
  if (gridInfo.grid[x][y] === MAX_HEIGHT) return undefined;
  if (basins[x] && basins[x][y]) return basins[x][y];
  const { x: lowX, y: lowY } = getLowestNeighbour({
    coords: { x, y },
    gridInfo,
  });
  if (x === lowX && y === lowY) return coords;
  return getBasinForCoord({
    basins,
    gridInfo,
    coords: { x: lowX, y: lowY },
  });
};

export const getBasins = (gridInfo: GridInfo): Basins => {
  const { numRows, numCols } = gridInfo;
  const basins: Basins = [[]];
  for (let x = 0; x < numRows; x++) {
    for (let y = 0; y < numCols; y++) {
      if (!basins[x]) basins[x] = [];
      basins[x][y] = getBasinForCoord({
        basins,
        gridInfo,
        coords: { x, y },
      });
    }
  }
  return basins;
};

export const getBasinSizes = ({
  basins,
  gridInfo,
}: {
  basins: Basins;
  gridInfo: GridInfo;
}): BasinSizes => {
  const { numRows, numCols } = gridInfo;
  const basinSizes: BasinSizes = {};
  for (let x = 0; x < numRows; x++) {
    for (let y = 0; y < numCols; y++) {
      const basin = basins[x][y];
      if (basin) {
        const { x: basinX, y: basinY } = basin;
        const key = basinX.toString() + ',' + basinY.toString();
        if (basinSizes[key]) basinSizes[key] = basinSizes[key] + 1;
        else {
          basinSizes[key] = 1;
        }
      }
    }
  }
  return basinSizes;
};

export const day9 = (gridInfo: GridInfo) => {
  const lowLevels = findLowLevels(gridInfo);
  return lowLevels.reduce((sum, lowLevel) => sum + lowLevel + 1, 0);
};

export const day9part2 = (gridInfo: GridInfo) => {
  const basins = getBasins(gridInfo);

  const basinSizes = getBasinSizes({ basins, gridInfo });
  const sortedSizes = Object.values(basinSizes).sort((a, b) => b - a);
  const [one, two, three] = sortedSizes;

  return one * two * three;
};
