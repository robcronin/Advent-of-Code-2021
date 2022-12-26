import { sumArr } from '../utils/array';

type Range = { start: number; end: number };
type Instruction = {
  isOn: boolean;
  x: Range;
  y: Range;
  z: Range;
};
type Overlap = { before?: Range; overlap?: Range; after?: Range };

const parseInstructions = (input: string[]): Instruction[] =>
  input.map((line) => {
    const [isOnOff, coordString] = line.split(' ');
    const coords = coordString
      .split(/x=|,y=|,z=/)
      .filter(Boolean)
      .map((coord) => {
        const ends = coord.split('..');
        return { start: +ends[0], end: +ends[1] };
      });
    return { isOn: isOnOff === 'on', x: coords[0], y: coords[1], z: coords[2] };
  });

const isRangeOutside = (range: Range, threshold: number) =>
  (range.start < -threshold && range.end < -threshold) ||
  (range.start > threshold && range.end > threshold);

const trimRange = (range: Range, threshold: number) => ({
  start: Math.max(-threshold, range.start),
  end: Math.min(threshold, range.end),
});

const trimInstructions = (instructions: Instruction[], threshold: number) => {
  const removedOutside = instructions.filter(({ x, y, z }) => {
    const outsideX = isRangeOutside(x, threshold);
    const outsideY = isRangeOutside(y, threshold);
    const outsideZ = isRangeOutside(z, threshold);
    return !outsideX && !outsideY && !outsideZ;
  });
  return removedOutside.map((instruction) => ({
    ...instruction,
    x: trimRange(instruction.x, threshold),
    y: trimRange(instruction.y, threshold),
    z: trimRange(instruction.z, threshold),
  }));
};

const countNumOn = (instructions: Instruction[]) =>
  sumArr(instructions, (instruction) => {
    if (!instruction.isOn) return 0;
    const { x, y, z } = instruction;
    return (
      (x.end - x.start + 1) * (y.end - y.start + 1) * (z.end - z.start + 1)
    );
  });

// bit of duplication here that should be refactored 😅
export const getOverlaps = (ra: Range, rb: Range): Overlap => {
  const overlaps: Overlap = {
    before: undefined,
    overlap: undefined,
    after: undefined,
  };
  const { start: startA, end: endA } = ra;
  const { start: startB, end: endB } = rb;
  if (startA <= startB) {
    if (endA < startB) {
      return overlaps;
    }
    if (endA > startB) {
      if (startA < startB) {
        overlaps.before = {
          start: startA,
          end: startB - 1,
        };
      }
      overlaps.overlap = {
        start: startB,
        end: Math.min(endA, endB),
      };
      if (endA > endB) {
        overlaps.after = {
          start: endB + 1,
          end: endA,
        };
      }
    }
    if (endA === startB) {
      if (startA < startB) {
        overlaps.before = {
          start: startA,
          end: endA - 1,
        };
      }
      overlaps.overlap = {
        start: endA,
        end: endA,
      };
    }
  } else {
    if (endB < startA) {
      return overlaps;
    }
    if (endB > startA) {
      overlaps.overlap = {
        start: startA,
        end: Math.min(endA, endB),
      };
      if (endA > endB) {
        overlaps.after = {
          start: endB + 1,
          end: endA,
        };
      }
    }
    if (endB === startA) {
      overlaps.overlap = {
        start: endB,
        end: endB,
      };
      overlaps.after = {
        start: endB + 1,
        end: endA,
      };
    }
  }

  return overlaps;
};

export const splitInstruction = (
  ia: Instruction,
  ib: Instruction,
): Instruction[] => {
  const { x: xa, y: ya, z: za } = ia;
  const { x: xb, y: yb, z: zb } = ib;
  const splitA: Instruction[] = [];
  const {
    before: beforeX,
    overlap: overlapX,
    after: afterX,
  } = getOverlaps(xa, xb);
  const {
    before: beforeY,
    overlap: overlapY,
    after: afterY,
  } = getOverlaps(ya, yb);
  const {
    before: beforeZ,
    overlap: overlapZ,
    after: afterZ,
  } = getOverlaps(za, zb);
  if (!overlapX || !overlapY || !overlapZ) return [ia];

  if (beforeX) splitA.push({ ...ia, x: beforeX });
  if (afterX) splitA.push({ ...ia, x: afterX });

  if (beforeY) splitA.push({ ...ia, x: overlapX, y: beforeY });
  if (afterY) splitA.push({ ...ia, x: overlapX, y: afterY });

  if (beforeZ) splitA.push({ ...ia, x: overlapX, y: overlapY, z: beforeZ });
  if (afterZ) splitA.push({ ...ia, x: overlapX, y: overlapY, z: afterZ });

  return splitA;
};

const combineInstructions = (instructions: Instruction[]) =>
  instructions.reduce((finalNonOverlapping: Instruction[], ib) => {
    const nonOverlapping = finalNonOverlapping
      .map((ia) => splitInstruction(ia, ib))
      .flat();
    if (ib.isOn) nonOverlapping.push(ib);
    return [...nonOverlapping];
  }, []);

export const day22 = (input: string[]) => {
  const instructions = parseInstructions(input);
  const trimmed = trimInstructions(instructions, 50);
  const combined = combineInstructions(trimmed);
  return countNumOn(combined);
};

export const day22part2 = (input: string[]) => {
  const instructions = parseInstructions(input);
  const combined = combineInstructions(instructions);
  return countNumOn(combined);
};
