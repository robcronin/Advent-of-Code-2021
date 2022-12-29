import { Coords3d } from '../utils/grid3d';
import { parseLines } from '../utils/input';
import { range } from '../utils/looping';

type BeaconScanner = Coords3d;
type Scanner = {
  id: number;
  beaconScanners: BeaconScanner[];
};
type Rotation = [keyof Coords3d, keyof Coords3d, keyof Coords3d];
type Flip = [-1 | 1, -1 | 1, -1 | 1];
export type Difference = {
  relativeScannerPosition: Coords3d;
  rotation: Rotation;
  flip: Flip;
};
export type ScannerAbsolute = Scanner & {
  absolutePosition: Coords3d;
  rotation: Rotation;
  flip: Flip;
};
type ScannersAbsolute = Record<number, ScannerAbsolute>;

const OVERLAP_REQUIREMENT = 12;
const rotations: Rotation[] = [
  ['x', 'y', 'z'],
  ['x', 'z', 'y'],
  ['y', 'x', 'z'],
  ['y', 'z', 'x'],
  ['z', 'x', 'y'],
  ['z', 'y', 'x'],
];

const flips: Flip[] = [
  [1, 1, 1],
  [1, 1, -1],
  [1, -1, 1],
  [1, -1, -1],
  [-1, 1, 1],
  [-1, 1, -1],
  [-1, -1, 1],
  [-1, -1, -1],
];

const convert: Record<number, keyof Coords3d> = {
  0: 'x',
  1: 'y',
  2: 'z',
};

export const parseScanners = (input: string[]): Scanner[] =>
  input.map((scannerBlock) => {
    const scannerLines = parseLines(scannerBlock);
    const idLine = scannerLines.shift() as string;
    const id = +idLine?.split(' ')[2];
    const beaconScanners = scannerLines.map((scanner) => {
      const coords = scanner.split(',');
      return { x: +coords[0], y: +coords[1], z: +coords[2] };
    });
    return { id, beaconScanners };
  });

export const getPotentialScannerDifferences = (
  beaconA: BeaconScanner,
  beaconB: BeaconScanner,
): Difference[] => {
  const differences: Difference[] = [];
  rotations.forEach((rotation) => {
    flips.forEach((flip) => {
      const relativeB = {
        x: beaconA.x - beaconB[rotation[0]] * flip[0],
        y: beaconA.y - beaconB[rotation[1]] * flip[1],
        z: beaconA.z - beaconB[rotation[2]] * flip[2],
      };
      differences.push({ relativeScannerPosition: relativeB, rotation, flip });
    });
  });
  return differences;
};

export const isBeaconSameDifference = (
  beaconA: BeaconScanner,
  beaconB: BeaconScanner,
  difference: Difference,
) => {
  const { relativeScannerPosition, rotation, flip } = difference;
  const relativeB = {
    x: beaconA.x - beaconB[rotation[0]] * flip[0],
    y: beaconA.y - beaconB[rotation[1]] * flip[1],
    z: beaconA.z - beaconB[rotation[2]] * flip[2],
  };
  return (
    relativeB.x === relativeScannerPosition.x &&
    relativeB.y === relativeScannerPosition.y &&
    relativeB.z === relativeScannerPosition.z
  );
};

export const getRelativeDifferenceOfScanners = (
  scannerA: Scanner,
  scannerB: Scanner,
): Difference | undefined => {
  const diffs: Record<string, number> = {};
  let answer: Difference | undefined;
  scannerA.beaconScanners.some((beaconA) => {
    return scannerB.beaconScanners.some((beaconB) => {
      const differences = getPotentialScannerDifferences(beaconA, beaconB);
      return differences.some((difference) => {
        const { relativeScannerPosition } = difference;
        const diffKey = `${relativeScannerPosition.x},${relativeScannerPosition.y},${relativeScannerPosition.z}`;
        if (diffs[diffKey]) {
          diffs[diffKey]++;
          if (diffs[diffKey] === OVERLAP_REQUIREMENT) {
            answer = difference;
            return true;
          }
        } else diffs[diffKey] = 1;
      });
    });
  });

  return answer;
};

const getIndexAndFlipOfCoord = (
  scannerA: ScannerAbsolute,
  difference: Difference,
  coord: keyof Coords3d,
): [number, 1 | -1] => {
  const xIndexAtEnd = difference.rotation.findIndex((r) => r === coord);
  const xAfter = convert[xIndexAtEnd];
  const xIndexAtStart = scannerA.rotation.findIndex((r) => r === xAfter);
  const xFlip = scannerA.flip[xIndexAtStart] * difference.flip[xIndexAtEnd];
  return [xIndexAtStart, xFlip as 1 | -1];
};

export const getAbsolutePositionsOfScanner = (
  scannerA: ScannerAbsolute,
  scannerB: Scanner,
  attempts: Set<string> = new Set(),
): ScannerAbsolute | undefined => {
  const attemptKey =
    scannerA.id < scannerB.id
      ? `${scannerA.id},${scannerB.id}`
      : `${scannerB.id},${scannerA.id}`;
  if (attempts.has(attemptKey)) return undefined;

  const difference = getRelativeDifferenceOfScanners(scannerA, scannerB);
  if (difference) {
    const absolutePosition = {
      x:
        scannerA.absolutePosition.x +
        difference.relativeScannerPosition[scannerA.rotation[0]] *
          scannerA.flip[0],
      y:
        scannerA.absolutePosition.y +
        difference.relativeScannerPosition[scannerA.rotation[1]] *
          scannerA.flip[1],
      z:
        scannerA.absolutePosition.z +
        difference.relativeScannerPosition[scannerA.rotation[2]] *
          scannerA.flip[2],
    };
    const flip: Flip = [1, 1, 1];
    const rotation: Rotation = ['x', 'y', 'z'];

    const [xindex, xflip] = getIndexAndFlipOfCoord(scannerA, difference, 'x');
    flip[xindex] = xflip;
    rotation[xindex] = 'x';

    const [yindex, yflip] = getIndexAndFlipOfCoord(scannerA, difference, 'y');
    flip[yindex] = yflip;
    rotation[yindex] = 'y';

    const [zindex, zflip] = getIndexAndFlipOfCoord(scannerA, difference, 'z');
    flip[zindex] = zflip;
    rotation[zindex] = 'z';
    return { ...scannerB, absolutePosition, flip, rotation };
  } else {
    attempts.add(attemptKey);
  }
};

export const getAbsolutePositionOfAllScanners = (scanners: Scanner[]) => {
  const absoluteScanners: ScannersAbsolute = {
    0: {
      ...scanners[0],
      absolutePosition: { x: 0, y: 0, z: 0 },
      rotation: ['x', 'y', 'z'],
      flip: [1, 1, 1],
    },
  };
  const attempts = new Set<string>();

  while (scanners.length !== Object.keys(absoluteScanners).length) {
    const missingScanners = range(scanners.length).filter(
      (index) => !absoluteScanners[index],
    );
    missingScanners.forEach((missingScannerIndex) => {
      const missingScanner = scanners[missingScannerIndex];
      Object.values(absoluteScanners).some((absoluteScanner) => {
        const absolute = getAbsolutePositionsOfScanner(
          absoluteScanner,
          missingScanner,
          attempts,
        );
        if (absolute) {
          absoluteScanners[missingScannerIndex] = absolute;
          return true;
        }
      });
    });
  }

  return absoluteScanners;
};

export const convertBeaconToAbsolute = (
  absoluteScanner: ScannerAbsolute,
  beacon: BeaconScanner,
) => {
  return {
    x:
      absoluteScanner.absolutePosition.x +
      beacon[absoluteScanner.rotation[0]] * absoluteScanner.flip[0],
    y:
      absoluteScanner.absolutePosition.y +
      beacon[absoluteScanner.rotation[1]] * absoluteScanner.flip[1],
    z:
      absoluteScanner.absolutePosition.z +
      beacon[absoluteScanner.rotation[2]] * absoluteScanner.flip[2],
  };
};

export const getNumBeacons = (absoluteScanners: ScannersAbsolute) => {
  const allAbsoluteBeacons = new Set<string>();
  Object.values(absoluteScanners).forEach((absoluteScanner) => {
    absoluteScanner.beaconScanners.forEach((beaconScanner) => {
      const absoluteBeacon = convertBeaconToAbsolute(
        absoluteScanner,
        beaconScanner,
      );
      const beaconString = `${absoluteBeacon.x},${absoluteBeacon.y},${absoluteBeacon.z}`;
      allAbsoluteBeacons.add(beaconString);
    });
  });
  return allAbsoluteBeacons.size;
};

export const day19 = (input: string[]) => {
  const scanners = parseScanners(input);
  const absoluteScanners = getAbsolutePositionOfAllScanners(scanners);
  return getNumBeacons(absoluteScanners);
};

export const day19part2 = (input: string[]) => {
  const scanners = parseScanners(input);
  const absoluteScanners = getAbsolutePositionOfAllScanners(scanners);
  let max = 0;
  Object.values(absoluteScanners).forEach((absA) => {
    Object.values(absoluteScanners).forEach((absB) => {
      const manDist =
        Math.abs(absA.absolutePosition.x - absB.absolutePosition.x) +
        Math.abs(absA.absolutePosition.y - absB.absolutePosition.y) +
        Math.abs(absA.absolutePosition.z - absB.absolutePosition.z);
      if (manDist > max) max = manDist;
    });
  });
  return max;
};
