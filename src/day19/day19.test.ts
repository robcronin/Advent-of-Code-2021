import { logAnswer } from '../utils/logging';
import { range } from '../utils/looping';
import {
  convertBeaconToAbsolute,
  day19,
  day19part2,
  Difference,
  getAbsolutePositionOfAllScanners,
  getAbsolutePositionsOfScanner,
  getNumBeacons,
  getPotentialScannerDifferences,
  getRelativeDifferenceOfScanners,
  isBeaconSameDifference,
  parseScanners,
} from './day19';
import { data, testData } from './day19.data';

const testScanners = parseScanners(testData);
const absoluteScanners = getAbsolutePositionOfAllScanners(testScanners);

describe('getPotentialScannerDifferences', () => {
  it('should return the 48 potential differences', () => {
    expect(
      getPotentialScannerDifferences(
        { x: -618, y: -824, z: -621 },
        { x: 686, y: 422, z: 578 },
      ),
    ).toEqual([
      {
        flip: [1, 1, 1],
        relativeScannerPosition: { x: -1304, y: -1246, z: -1199 },
        rotation: ['x', 'y', 'z'],
      },
      {
        flip: [1, 1, -1],
        relativeScannerPosition: { x: -1304, y: -1246, z: -43 },
        rotation: ['x', 'y', 'z'],
      },
      {
        flip: [1, -1, 1],
        relativeScannerPosition: { x: -1304, y: -402, z: -1199 },
        rotation: ['x', 'y', 'z'],
      },
      {
        flip: [1, -1, -1],
        relativeScannerPosition: { x: -1304, y: -402, z: -43 },
        rotation: ['x', 'y', 'z'],
      },
      {
        flip: [-1, 1, 1],
        relativeScannerPosition: { x: 68, y: -1246, z: -1199 },
        rotation: ['x', 'y', 'z'],
      },
      {
        flip: [-1, 1, -1],
        relativeScannerPosition: { x: 68, y: -1246, z: -43 },
        rotation: ['x', 'y', 'z'],
      },
      {
        flip: [-1, -1, 1],
        relativeScannerPosition: { x: 68, y: -402, z: -1199 },
        rotation: ['x', 'y', 'z'],
      },
      {
        flip: [-1, -1, -1],
        relativeScannerPosition: { x: 68, y: -402, z: -43 },
        rotation: ['x', 'y', 'z'],
      },
      {
        flip: [1, 1, 1],
        relativeScannerPosition: { x: -1304, y: -1402, z: -1043 },
        rotation: ['x', 'z', 'y'],
      },
      {
        flip: [1, 1, -1],
        relativeScannerPosition: { x: -1304, y: -1402, z: -199 },
        rotation: ['x', 'z', 'y'],
      },
      {
        flip: [1, -1, 1],
        relativeScannerPosition: { x: -1304, y: -246, z: -1043 },
        rotation: ['x', 'z', 'y'],
      },
      {
        flip: [1, -1, -1],
        relativeScannerPosition: { x: -1304, y: -246, z: -199 },
        rotation: ['x', 'z', 'y'],
      },
      {
        flip: [-1, 1, 1],
        relativeScannerPosition: { x: 68, y: -1402, z: -1043 },
        rotation: ['x', 'z', 'y'],
      },
      {
        flip: [-1, 1, -1],
        relativeScannerPosition: { x: 68, y: -1402, z: -199 },
        rotation: ['x', 'z', 'y'],
      },
      {
        flip: [-1, -1, 1],
        relativeScannerPosition: { x: 68, y: -246, z: -1043 },
        rotation: ['x', 'z', 'y'],
      },
      {
        flip: [-1, -1, -1],
        relativeScannerPosition: { x: 68, y: -246, z: -199 },
        rotation: ['x', 'z', 'y'],
      },
      {
        flip: [1, 1, 1],
        relativeScannerPosition: { x: -1040, y: -1510, z: -1199 },
        rotation: ['y', 'x', 'z'],
      },
      {
        flip: [1, 1, -1],
        relativeScannerPosition: { x: -1040, y: -1510, z: -43 },
        rotation: ['y', 'x', 'z'],
      },
      {
        flip: [1, -1, 1],
        relativeScannerPosition: { x: -1040, y: -138, z: -1199 },
        rotation: ['y', 'x', 'z'],
      },
      {
        flip: [1, -1, -1],
        relativeScannerPosition: { x: -1040, y: -138, z: -43 },
        rotation: ['y', 'x', 'z'],
      },
      {
        flip: [-1, 1, 1],
        relativeScannerPosition: { x: -196, y: -1510, z: -1199 },
        rotation: ['y', 'x', 'z'],
      },
      {
        flip: [-1, 1, -1],
        relativeScannerPosition: { x: -196, y: -1510, z: -43 },
        rotation: ['y', 'x', 'z'],
      },
      {
        flip: [-1, -1, 1],
        relativeScannerPosition: { x: -196, y: -138, z: -1199 },
        rotation: ['y', 'x', 'z'],
      },
      {
        flip: [-1, -1, -1],
        relativeScannerPosition: { x: -196, y: -138, z: -43 },
        rotation: ['y', 'x', 'z'],
      },
      {
        flip: [1, 1, 1],
        relativeScannerPosition: { x: -1040, y: -1402, z: -1307 },
        rotation: ['y', 'z', 'x'],
      },
      {
        flip: [1, 1, -1],
        relativeScannerPosition: { x: -1040, y: -1402, z: 65 },
        rotation: ['y', 'z', 'x'],
      },
      {
        flip: [1, -1, 1],
        relativeScannerPosition: { x: -1040, y: -246, z: -1307 },
        rotation: ['y', 'z', 'x'],
      },
      {
        flip: [1, -1, -1],
        relativeScannerPosition: { x: -1040, y: -246, z: 65 },
        rotation: ['y', 'z', 'x'],
      },
      {
        flip: [-1, 1, 1],
        relativeScannerPosition: { x: -196, y: -1402, z: -1307 },
        rotation: ['y', 'z', 'x'],
      },
      {
        flip: [-1, 1, -1],
        relativeScannerPosition: { x: -196, y: -1402, z: 65 },
        rotation: ['y', 'z', 'x'],
      },
      {
        flip: [-1, -1, 1],
        relativeScannerPosition: { x: -196, y: -246, z: -1307 },
        rotation: ['y', 'z', 'x'],
      },
      {
        flip: [-1, -1, -1],
        relativeScannerPosition: { x: -196, y: -246, z: 65 },
        rotation: ['y', 'z', 'x'],
      },
      {
        flip: [1, 1, 1],
        relativeScannerPosition: { x: -1196, y: -1510, z: -1043 },
        rotation: ['z', 'x', 'y'],
      },
      {
        flip: [1, 1, -1],
        relativeScannerPosition: { x: -1196, y: -1510, z: -199 },
        rotation: ['z', 'x', 'y'],
      },
      {
        flip: [1, -1, 1],
        relativeScannerPosition: { x: -1196, y: -138, z: -1043 },
        rotation: ['z', 'x', 'y'],
      },
      {
        flip: [1, -1, -1],
        relativeScannerPosition: { x: -1196, y: -138, z: -199 },
        rotation: ['z', 'x', 'y'],
      },
      {
        flip: [-1, 1, 1],
        relativeScannerPosition: { x: -40, y: -1510, z: -1043 },
        rotation: ['z', 'x', 'y'],
      },
      {
        flip: [-1, 1, -1],
        relativeScannerPosition: { x: -40, y: -1510, z: -199 },
        rotation: ['z', 'x', 'y'],
      },
      {
        flip: [-1, -1, 1],
        relativeScannerPosition: { x: -40, y: -138, z: -1043 },
        rotation: ['z', 'x', 'y'],
      },
      {
        flip: [-1, -1, -1],
        relativeScannerPosition: { x: -40, y: -138, z: -199 },
        rotation: ['z', 'x', 'y'],
      },
      {
        flip: [1, 1, 1],
        relativeScannerPosition: { x: -1196, y: -1246, z: -1307 },
        rotation: ['z', 'y', 'x'],
      },
      {
        flip: [1, 1, -1],
        relativeScannerPosition: { x: -1196, y: -1246, z: 65 },
        rotation: ['z', 'y', 'x'],
      },
      {
        flip: [1, -1, 1],
        relativeScannerPosition: { x: -1196, y: -402, z: -1307 },
        rotation: ['z', 'y', 'x'],
      },
      {
        flip: [1, -1, -1],
        relativeScannerPosition: { x: -1196, y: -402, z: 65 },
        rotation: ['z', 'y', 'x'],
      },
      {
        flip: [-1, 1, 1],
        relativeScannerPosition: { x: -40, y: -1246, z: -1307 },
        rotation: ['z', 'y', 'x'],
      },
      {
        flip: [-1, 1, -1],
        relativeScannerPosition: { x: -40, y: -1246, z: 65 },
        rotation: ['z', 'y', 'x'],
      },
      {
        flip: [-1, -1, 1],
        relativeScannerPosition: { x: -40, y: -402, z: -1307 },
        rotation: ['z', 'y', 'x'],
      },
      {
        flip: [-1, -1, -1],
        relativeScannerPosition: { x: -40, y: -402, z: 65 },
        rotation: ['z', 'y', 'x'],
      },
    ]);
  });
});

describe('isBeaconSameDifference', () => {
  const difference: Difference = {
    relativeScannerPosition: { x: 68, y: -1246, z: -43 },
    rotation: ['x', 'y', 'z'],
    flip: [-1, 1, -1],
  };
  const beaconA = { x: -537, y: -823, z: -458 };
  const beaconB = { x: 605, y: 423, z: 415 };
  const beaconC = { x: 515, y: 917, z: -361 };
  it('should return true for same difference', () => {
    expect(isBeaconSameDifference(beaconA, beaconB, difference)).toBe(true);
  });
  it('should return false for different difference', () => {
    expect(isBeaconSameDifference(beaconA, beaconC, difference)).toBe(false);
  });
});

describe('getRelativeDifferenceOfScanners', () => {
  it('should find the relative difference of scanner 0 and 1', () => {
    expect(
      getRelativeDifferenceOfScanners(testScanners[0], testScanners[1]),
    ).toEqual({
      flip: [-1, 1, -1],
      relativeScannerPosition: { x: 68, y: -1246, z: -43 },
      rotation: ['x', 'y', 'z'],
    });
  });
  it('should find the relative difference of scanner 1 and 4', () => {
    expect(
      getRelativeDifferenceOfScanners(testScanners[1], testScanners[4]),
    ).toEqual({
      flip: [1, -1, -1],
      relativeScannerPosition: { x: 88, y: 113, z: -1104 },
      rotation: ['y', 'z', 'x'],
    });
  });
  it('should find the relative difference of scanner 2 and 4', () => {
    expect(
      getRelativeDifferenceOfScanners(testScanners[2], testScanners[4]),
    ).toEqual({
      flip: [1, 1, -1],
      relativeScannerPosition: { x: 1125, y: -168, z: 72 },
      rotation: ['y', 'x', 'z'],
    });
  });
});

describe('getAbsolutePositionsOfScanner', () => {
  it('should find the absolute position of scanner 1', () => {
    expect(
      getAbsolutePositionsOfScanner(absoluteScanners[0], testScanners[1]),
    ).toEqual({
      ...testScanners[1],
      absolutePosition: { x: 68, y: -1246, z: -43 },
      flip: [-1, 1, -1],
      rotation: ['x', 'y', 'z'],
    });
  });
  it('should find the absolute position of scanner 4', () => {
    expect(
      getAbsolutePositionsOfScanner(absoluteScanners[1], testScanners[4]),
    ).toEqual({
      ...testScanners[4],
      absolutePosition: { x: -20, y: -1133, z: 1061 },
      flip: [-1, -1, 1],
      rotation: ['y', 'z', 'x'],
    });
  });
  it('should find the absolute position of scanner 2', () => {
    expect(
      getAbsolutePositionsOfScanner(absoluteScanners[4], testScanners[2]),
    ).toEqual({
      ...testScanners[2],
      absolutePosition: { x: 1105, y: -1205, z: 1229 },
      rotation: ['x', 'z', 'y'],
      flip: [-1, 1, 1],
    });
  });
});

describe('getAbsolutePositionOfAllScanners', () => {
  it('should find the absolute position of scanner 1', () => {
    const absolutePositions = getAbsolutePositionOfAllScanners(testScanners);
    const absoluteOnly = range(0, 5).reduce(
      (acc, scannerIndex) => ({
        ...acc,
        [scannerIndex]: absolutePositions[scannerIndex].absolutePosition,
      }),
      {},
    );
    expect(absoluteOnly).toEqual({
      '0': { x: 0, y: 0, z: 0 },
      '1': { x: 68, y: -1246, z: -43 },
      '2': { x: 1105, y: -1205, z: 1229 },
      '3': { x: -92, y: -2380, z: -20 },
      '4': { x: -20, y: -1133, z: 1061 },
    });
  });
});

describe('convertBeaconToAbsolute', () => {
  it('should convert a beacon to absolute position', () => {
    expect(
      convertBeaconToAbsolute(absoluteScanners[1], { x: 686, y: 422, z: 578 }),
    ).toEqual({ x: -618, y: -824, z: -621 });
  });
});

describe('getNumBeacons', () => {
  it('should get right number for no rotation', () => {
    expect(
      getNumBeacons({ 0: absoluteScanners[0], 1: absoluteScanners[1] }),
    ).toBe(38);
  });
  it('should get right number for multiple scanners', () => {
    expect(getNumBeacons(absoluteScanners)).toBe(79);
  });
});

describe('day 19', () => {
  it('test cases', () => {
    expect(day19(testData)).toBe(79);
  });

  it('answer', () => {
    const answer = day19(data);
    logAnswer(answer, 19, 1);
    expect(answer).toBe(465);
  });
});

describe('day 19 part 2', () => {
  it('test cases', () => {
    expect(day19part2(testData)).toBe(3621);
  });

  it.skip('answer', () => {
    const answer = day19part2(data);
    logAnswer(answer, 19, 2);
    expect(answer).toBe(12149);
  });
});
