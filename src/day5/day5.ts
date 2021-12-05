import { parseInput } from '../utils/input';

type LineSegment = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

type VentMap = {
  [row: number]: { [column: number]: number | undefined };
};

export const parseLineSegments = (input: string): LineSegment[] => {
  const segments = parseInput(input) as string[];
  return segments.map((segment) => {
    const groups = segment.match(
      new RegExp('^([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)$'),
    );
    if (!groups) throw new Error(`Invalid segment ${segment}`);
    const [_, x1, y1, x2, y2] = groups;
    return { x1: +x1, y1: +y1, x2: +x2, y2: +y2 };
  });
};

export const addValueToVentMapInPlace = ({
  ventMap,
  x,
  y,
}: {
  ventMap: VentMap;
  x: number;
  y: number;
}) => {
  if (ventMap[x]) {
    const currentValue = ventMap[x][y];
    if (currentValue) {
      ventMap[x][y] = currentValue + 1;
    } else {
      ventMap[x][y] = 1;
    }
  } else {
    ventMap[x] = { [y]: 1 };
  }
};

export const markVentMap = ({
  lineSegments,
  markDiagonal,
}: {
  lineSegments: LineSegment[];
  markDiagonal: boolean;
}): VentMap =>
  lineSegments.reduce((ventMap, lineSegment) => {
    const { x1, y1, x2, y2 } = lineSegment;
    if (!markDiagonal && x1 !== x2 && y1 !== y2) return ventMap;

    let [x, y] = [x1, y1];
    const dx = x1 < x2 ? 1 : x1 > x2 ? -1 : 0;
    const dy = y1 < y2 ? 1 : y1 > y2 ? -1 : 0;
    const gap = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));

    for (let i = 0; i <= gap; i++) {
      addValueToVentMapInPlace({ ventMap, x, y });
      y += dy;
      x += dx;
    }
    return ventMap;
  }, {});

export const countMarksAboveThreshold = ({
  ventMap,
  threshold,
}: {
  ventMap: VentMap;
  threshold: number;
}): number =>
  Object.values(ventMap).reduce(
    (sum, row) =>
      sum +
      Object.values(row).reduce(
        (rowSum: number, value) =>
          value && value >= threshold ? (rowSum += 1) : rowSum,
        0,
      ),
    0,
  );

export const day5 = (lineSegments: LineSegment[]) => {
  const markedVentMap = markVentMap({ lineSegments, markDiagonal: false });
  return countMarksAboveThreshold({ ventMap: markedVentMap, threshold: 2 });
};

export const day5part2 = (lineSegments: LineSegment[]) => {
  const markedVentMap = markVentMap({ lineSegments, markDiagonal: true });
  return countMarksAboveThreshold({ ventMap: markedVentMap, threshold: 2 });
};
