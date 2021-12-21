import { GridInfo } from './grid';

const getDelimiter = (input: string) => {
  if (input.includes('\n')) {
    return '\n';
  }
  if (input.includes(',')) {
    return ',';
  }
  if (input.includes(' ')) {
    return ' ';
  }
  return '';
};

const mapToNumberIfNecessary = (input: string[]) => {
  if (input.every((value) => !isNaN(Number(value)))) {
    return input.map((element) => Number(element));
  }
  return input;
};

export const parseLines = (input: string, delimiter?: string) => {
  const inputArray = input.split(delimiter || getDelimiter(input));
  return inputArray.map((element) => element.trim());
};

export const parseInput = (input: string) => {
  const parsed = parseLines(input);
  return mapToNumberIfNecessary(parsed);
};

export const parseGridInfo = (input: string): GridInfo<number> => {
  const rows = parseLines(input);
  const grid = rows.map((row) => [...row].map((height) => +height));
  return {
    grid,
    numRows: rows.length,
    numCols: grid[0].length,
  };
};
export const parseGridInfoString = (input: string): GridInfo<string> => {
  const rows = parseLines(input);
  const grid = rows.map((row) => [...row]);
  return {
    grid,
    numRows: rows.length,
    numCols: grid[0].length,
  };
};
