import { parseLines } from '../utils/input';

type HeightMap = number[][];
type Basins = (Coords | undefined)[][];
type HeightMapInfo = { map: HeightMap; numRows: number; numCols: number };
type Coords = { x: number; y: number };
type BasinSizes = Record<string, number>;

const MAX_HEIGHT = 9;

export const parseHeightMapInfo = (input: string): HeightMapInfo => {
  const rows = parseLines(input);
  const map = rows.map((row) => [...row].map((height) => +height));
  return {
    map,
    numRows: rows.length,
    numCols: map[0].length,
  };
};

export const getNeighbourCoords = ({
  coords,
  heightMapInfo,
}: {
  coords: Coords;
  heightMapInfo: HeightMapInfo;
}): Coords[] => {
  const { x, y } = coords;
  const { numRows, numCols } = heightMapInfo;
  const neighbourCoords = [];
  if (x > 0) neighbourCoords.push({ x: x - 1, y });
  if (y > 0) neighbourCoords.push({ x, y: y - 1 });
  if (x < numRows - 1) neighbourCoords.push({ x: x + 1, y });
  if (y < numCols - 1) neighbourCoords.push({ x, y: y + 1 });
  return neighbourCoords;
};

export const findLowLevels = (heightMapInfo: HeightMapInfo): number[] => {
  const { map, numRows, numCols } = heightMapInfo;
  const lowLevels = [];
  for (let x = 0; x < numRows; x++) {
    for (let y = 0; y < numCols; y++) {
      const neighbourCoords = getNeighbourCoords({
        coords: { x, y },
        heightMapInfo,
      });
      const isLowLevel = neighbourCoords.every((coords) => {
        return map[x][y] < map[coords.x][coords.y];
      });
      if (isLowLevel) lowLevels.push(map[x][y]);
    }
  }
  return lowLevels;
};

export const getLowestNeighbour = ({
  coords,
  heightMapInfo,
}: {
  coords: Coords;
  heightMapInfo: HeightMapInfo;
}): Coords => {
  const neighbourCoords = getNeighbourCoords({
    coords,
    heightMapInfo,
  });
  const { map } = heightMapInfo;
  return neighbourCoords.reduce((minCoords, neighbourCoords) => {
    const { x: minX, y: minY } = minCoords;
    const { x: neighX, y: neighY } = neighbourCoords;
    const currentMin = map[minX][minY];
    const neighbour = map[neighX][neighY];
    if (neighbour < currentMin) return neighbourCoords;
    return minCoords;
  }, coords);
};

export const getBasinForCoord = ({
  basins,
  heightMapInfo,
  coords,
}: {
  basins: Basins;
  heightMapInfo: HeightMapInfo;
  coords: Coords;
}): Coords | undefined => {
  const { x, y } = coords;
  if (heightMapInfo.map[x][y] === MAX_HEIGHT) return undefined;
  if (basins[x] && basins[x][y]) return basins[x][y];
  const { x: lowX, y: lowY } = getLowestNeighbour({
    coords: { x, y },
    heightMapInfo,
  });
  if (x === lowX && y === lowY) return coords;
  return getBasinForCoord({
    basins,
    heightMapInfo,
    coords: { x: lowX, y: lowY },
  });
};

export const getBasins = (heightMapInfo: HeightMapInfo): Basins => {
  const { numRows, numCols } = heightMapInfo;
  const basins: Basins = [[]];
  for (let x = 0; x < numRows; x++) {
    for (let y = 0; y < numCols; y++) {
      if (!basins[x]) basins[x] = [];
      basins[x][y] = getBasinForCoord({
        basins,
        heightMapInfo,
        coords: { x, y },
      });
    }
  }
  return basins;
};

export const getBasinSizes = ({
  basins,
  heightMapInfo,
}: {
  basins: Basins;
  heightMapInfo: HeightMapInfo;
}): BasinSizes => {
  const { numRows, numCols } = heightMapInfo;
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

export const day9 = (heightMapInfo: HeightMapInfo) => {
  const lowLevels = findLowLevels(heightMapInfo);
  return lowLevels.reduce((sum, lowLevel) => sum + lowLevel + 1, 0);
};

export const day9part2 = (heightMapInfo: HeightMapInfo) => {
  const basins = getBasins(heightMapInfo);

  const basinSizes = getBasinSizes({ basins, heightMapInfo });
  const sortedSizes = Object.values(basinSizes).sort((a, b) => b - a);
  const [one, two, three] = sortedSizes;

  return one * two * three;
};
