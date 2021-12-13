import {
  Coords,
  countValueInGrid,
  genNewGrid,
  GridInfo,
  reversePrintGrid,
} from '../utils/grid';
import { parseLines } from '../utils/input';
import { range } from '../utils/looping';

type Axis = 'x' | 'y';
type FoldInstruction = {
  axis: Axis;
  value: number;
};

type Origami = {
  coordinates: Coords[];
  foldInstructions: FoldInstruction[];
};

const DOT = '#';
const EMPTY = '.';

export const parseOrigami = (input: string): Origami => {
  const [unparsedCoordinates, instructions] = parseLines(input, '\n\n');
  const coordinates: Coords[] = parseLines(unparsedCoordinates).map(
    (unparsed) => {
      const [x, y] = unparsed.split(',');
      return { x: +x, y: +y };
    },
  );
  const foldInstructions = parseLines(instructions).map((instruction) => {
    const [axis, value] = instruction.split('fold along ')[1].split('='); // 🤢
    return { axis: axis as Axis, value: +value };
  });
  return { coordinates, foldInstructions };
};

export const generateOrigamiGrid = (origami: Origami): GridInfo<string> => {
  const { coordinates, foldInstructions } = origami;
  const { x: maxX, y: maxY } = getMaxCoords(foldInstructions);
  const gridInfo = genNewGrid({
    numRows: maxX,
    numCols: maxY,
    defaultValue: EMPTY,
  });
  coordinates.forEach((coord) => {
    const { x, y } = coord;
    gridInfo.grid[x][y] = DOT;
  });
  return gridInfo;
};

export const getMaxCoords = (foldInstructions: FoldInstruction[]): Coords => {
  const firstXFold = foldInstructions.find((fi) => fi.axis === 'x');
  const firstYFold = foldInstructions.find((fi) => fi.axis === 'y');
  if (!firstXFold || !firstYFold) throw new Error('No x or y fold found');
  return { x: 2 * firstXFold.value + 1, y: 2 * firstYFold.value + 1 };
};

// This is horrible - need a nicer way to generify the x and y flip
export const foldGrid = ({
  gridInfo,
  foldInstruction,
}: {
  gridInfo: GridInfo<string>;
  foldInstruction: FoldInstruction;
}): GridInfo<string> => {
  const { axis, value } = foldInstruction;
  const { numRows, numCols, grid } = gridInfo;
  if (axis === 'y') {
    const newGridInfo = genNewGrid({
      numRows,
      numCols: Math.floor(numCols / 2),
      defaultValue: EMPTY,
    });
    range(value).forEach((yDiff) => {
      const yFlip = numCols - yDiff - 1;
      range(numRows).forEach((x) => {
        const startValue = grid[x][yDiff];
        const flipValue = grid[x][yFlip];
        const newValue = startValue === DOT || flipValue === DOT ? DOT : EMPTY;
        newGridInfo.grid[x][yDiff] = newValue;
      });
    });
    return newGridInfo;
  } else {
    const newGridInfo = genNewGrid({
      numRows: Math.floor(numRows / 2),
      numCols,
      defaultValue: EMPTY,
    });
    range(value).forEach((xDiff) => {
      const xFlip = numRows - xDiff - 1;
      range(numCols).forEach((y) => {
        const startValue = grid[xDiff][y];
        const flipValue = grid[xFlip][y];
        const newValue = startValue === DOT || flipValue === DOT ? DOT : EMPTY;
        newGridInfo.grid[xDiff][y] = newValue;
      });
    });
    return newGridInfo;
  }
};

export const day13 = (origami: Origami) => {
  const { foldInstructions } = origami;
  const gridInfo = generateOrigamiGrid(origami);
  const newGridInfo = foldGrid({
    gridInfo,
    foldInstruction: foldInstructions[0],
  });

  return countValueInGrid(newGridInfo, DOT);
};
export const day13part2 = (origami: Origami) => {
  const { foldInstructions } = origami;
  const gridInfo = generateOrigamiGrid(origami);

  const newGridInfo = foldInstructions.reduce(
    (finalGrid, foldInstruction) =>
      foldGrid({ gridInfo: finalGrid, foldInstruction }),
    gridInfo,
  );
  return reversePrintGrid(newGridInfo);
};
