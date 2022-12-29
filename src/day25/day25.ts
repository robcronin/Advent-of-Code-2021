import { deepCopyGrid, genNewGrid, GridInfo, runFnOnGrid } from '../utils/grid';
import { range } from '../utils/looping';

enum GridItem {
  EAST = '>',
  SOUTH = 'v',
  EMPTY = '.',
}
type Map = GridInfo<GridItem>;

const parseMap = (input: string[]): Map => {
  const numRows = input.length;
  const numCols = input[0].length;
  const emptyGrid = genNewGrid({
    numCols,
    numRows,
    defaultValue: GridItem.EMPTY,
  });
  return runFnOnGrid({
    gridInfo: emptyGrid,
    fnToRun: ({ coords: { x, y } }) => input[x][y] as GridItem,
  });
};

const moveHerd = (
  map: Map,
  isEast: boolean,
): { newMap: Map; numMoves: number } => {
  const { numRows, numCols, grid } = map;
  const newMap = deepCopyGrid({ gridInfo: map });
  const [dx, dy] = isEast ? [0, 1] : [1, 0];
  const mover = isEast ? GridItem.EAST : GridItem.SOUTH;
  let numMoves = 0;
  range(numRows).forEach((x) => {
    range(numCols).forEach((y) => {
      if (grid[x][y] === mover) {
        const nx = x + dx === numRows ? 0 : x + dx;
        const ny = y + dy === numCols ? 0 : y + dy;
        if (grid[nx][ny] === GridItem.EMPTY) {
          newMap.grid[nx][ny] = grid[x][y];
          newMap.grid[x][y] = GridItem.EMPTY;
          numMoves++;
        }
      }
    });
  });
  return { newMap, numMoves };
};

const runStep = (map: Map): { newMap: Map; totalMoves: number } => {
  const afterEast = moveHerd(map, true);
  const afterSouth = moveHerd(afterEast.newMap, false);
  return {
    newMap: afterSouth.newMap,
    totalMoves: afterEast.numMoves + afterSouth.numMoves,
  };
};

export const day25 = (input: string[]) => {
  let map = parseMap(input);
  let numMoves;
  let steps = 0;
  do {
    const { newMap, totalMoves } = runStep(map);
    map = newMap;
    numMoves = totalMoves;
    steps++;
  } while (numMoves > 0);
  return steps;
};
