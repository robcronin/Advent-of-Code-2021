import {
  Coords,
  countValueInGrid,
  genNewGrid,
  Grid,
  GridInfo,
} from '../utils/grid';
import { parseGridInfoString, parseLines } from '../utils/input';
import { range } from '../utils/looping';

const DARK = '.';
const LIGHT = '#';

type Pixel = typeof DARK | typeof LIGHT;
type ImageData = {
  imageEnhancementAlgorithm: string;
  inputImage: GridInfo<string>;
};

export const parseImageData = (input: string): ImageData => {
  const [imageEnhancementAlgorithm, inputImageString] = parseLines(
    input,
    '\n\n',
  );
  return {
    imageEnhancementAlgorithm,
    inputImage: parseGridInfoString(inputImageString),
  };
};

export const getValueOrDefault = ({
  coords,
  inputGrid,
  defaultValue,
}: {
  coords: Coords;
  inputGrid: Grid<string>;
  defaultValue: string;
}): string => {
  const { x, y } = coords;
  return (inputGrid[x] && inputGrid[x][y]) || defaultValue;
};

export const getBinaryOfNeighbours = ({
  coords,
  inputGrid,
  outsideRangeValue = DARK,
}: {
  coords: Coords;
  inputGrid: Grid<string>;
  outsideRangeValue: Pixel;
}): number => {
  let res = '';
  const { x, y } = coords;
  range(3).forEach((minusX) =>
    range(3).forEach((minusY) => {
      res += getValueOrDefault({
        coords: { x: x - (2 - minusX), y: y - (2 - minusY) },
        inputGrid,
        defaultValue: outsideRangeValue,
      });
    }),
  );
  const binaryString = res.replaceAll(DARK, '0').replaceAll(LIGHT, '1');
  return parseInt(binaryString, 2);
};

export const runEnhancement = ({
  imageData,
  outsideRangeValue,
}: {
  imageData: ImageData;
  outsideRangeValue: Pixel;
}): ImageData => {
  const {
    imageEnhancementAlgorithm,
    inputImage: { numRows, numCols, grid },
  } = imageData;
  const newGridInfo = genNewGrid({
    numRows: numRows + 2,
    numCols: numCols + 2,
    defaultValue: DARK,
  });
  const {
    numRows: newNumRows,
    numCols: newNumCols,
    grid: newGrid,
  } = newGridInfo;
  range(newNumRows).forEach((x) => {
    range(newNumCols).forEach((y) => {
      const enhancementIndex = getBinaryOfNeighbours({
        coords: { x, y },
        inputGrid: grid,
        outsideRangeValue,
      });
      newGrid[x][y] = imageEnhancementAlgorithm[enhancementIndex];
    });
  });
  return { imageEnhancementAlgorithm, inputImage: newGridInfo };
};

export const runNumEnhancements = (
  imageData: ImageData,
  numEnhancements: number,
): ImageData => {
  const defaults: [Pixel, Pixel] = [DARK, DARK];
  const { imageEnhancementAlgorithm } = imageData;
  if (imageEnhancementAlgorithm[0] === LIGHT) {
    defaults[1] = LIGHT;
    if (
      imageEnhancementAlgorithm[imageEnhancementAlgorithm.length - 1] === LIGHT
    ) {
      defaults[0] = LIGHT;
      console.warn('Infinite Light pixels in this case');
    }
  }
  return range(numEnhancements).reduce((accImageData, runNum) => {
    const defaultValue = runNum === 0 ? DARK : defaults[runNum % 2];
    return runEnhancement({
      imageData: accImageData,
      outsideRangeValue: defaultValue,
    });
  }, imageData);
};

export const day20 = (imageData: ImageData) => {
  const doubleEnhanced = runNumEnhancements(imageData, 2);
  return countValueInGrid(doubleEnhanced.inputImage, LIGHT);
};
export const day20part2 = (imageData: ImageData) => {
  const fiftyEnhanced = runNumEnhancements(imageData, 50);
  return countValueInGrid(fiftyEnhanced.inputImage, LIGHT);
};
