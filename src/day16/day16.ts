type Packet = {
  version: number;
  type: number;
  binaryLength: number;
  value: number;
  subPackets?: Packet[][];
};

const SUM_TYPE = 0;
const PRODUCT_TYPE = 1;
const MIN_TYPE = 2;
const MAX_TYPE = 3;
const LITERAL_TYPE = 4;
const GREATER_TYPE = 5;
const LESS_TYPE = 6;
const EQUAL_TYPE = 7;

const TOTAL_LENGTH_LENGTH = 0;
const NUM_SUBPACKETS_LENGTH = 1;

export const convertHexString = (hex: string): string =>
  [...hex].reduce(
    (output, char) => output + parseInt(char, 16).toString(2).padStart(4, '0'),
    '',
  );

const getValue = (type: number, subPackets: Packet[][]): number => {
  if (type === SUM_TYPE) {
    return subPackets.reduce((sum, sub) => sum + sub[0].value, 0);
  } else if (type === PRODUCT_TYPE) {
    return subPackets.reduce((product, sub) => product * sub[0].value, 1);
  } else if (type === MIN_TYPE) {
    return subPackets.reduce(
      (min, sub) => (min < sub[0].value ? min : sub[0].value),
      subPackets[0][0].value,
    );
  } else if (type === MAX_TYPE) {
    return subPackets.reduce(
      (max, sub) => (max > sub[0].value ? max : sub[0].value),
      subPackets[0][0].value,
    );
  } else if (type === GREATER_TYPE) {
    return subPackets[0][0].value > subPackets[1][0].value ? 1 : 0;
  } else if (type === LESS_TYPE) {
    return subPackets[0][0].value < subPackets[1][0].value ? 1 : 0;
  } else if (type === EQUAL_TYPE) {
    return subPackets[0][0].value === subPackets[1][0].value ? 1 : 0;
  }
  throw new Error('Unknown Packet type');
};

export const parsePacket = (binArray: string[]): Packet[] => {
  const version = parseInt(binArray.splice(0, 3).join(''), 2);
  const type = parseInt(binArray.splice(0, 3).join(''), 2);
  let binaryLength = 6;
  if (type === LITERAL_TYPE) {
    let cont = true;
    let binLiteral = '';
    while (cont) {
      const group = binArray.splice(0, 5);
      if (group.shift() === '0') cont = false;
      binLiteral += group.join('');
      binaryLength += 5;
    }
    const value = parseInt(binLiteral, 2);
    return [{ version, type, value, binaryLength }];
  } else {
    const lengthType = parseInt(binArray.splice(0, 1).join(''), 2);
    binaryLength += 1;
    if (lengthType === TOTAL_LENGTH_LENGTH) {
      const numBitsInSub = parseInt(binArray.splice(0, 15).join(''), 2);
      binaryLength += 15;
      let bitsUsed = 0;
      const subPackets = [];
      while (bitsUsed < numBitsInSub) {
        const subPacket = parsePacket(binArray);
        subPackets.push(subPacket);
        const subPacketsLength = subPacket.reduce(
          (sum, sub) => sum + sub.binaryLength,
          0,
        );
        binaryLength += subPacketsLength;
        bitsUsed += subPacketsLength;
      }
      const value = getValue(type, subPackets);

      return [{ version, type, subPackets, binaryLength, value }];
    } else if (lengthType === NUM_SUBPACKETS_LENGTH) {
      const totalSubPackets = parseInt(binArray.splice(0, 11).join(''), 2);
      binaryLength += 11;
      let numSubPackets = 0;
      const subPackets = [];
      while (numSubPackets < totalSubPackets) {
        const subPacket = parsePacket(binArray);
        subPackets.push(subPacket);
        const subPacketsLength = subPacket.reduce(
          (sum, sub) => sum + sub.binaryLength,
          0,
        );
        binaryLength += subPacketsLength;
        numSubPackets++;
      }
      const value = getValue(type, subPackets);

      return [{ version, type, subPackets, binaryLength, value }];
    } else {
      throw new Error('Unknown length type id');
    }
  }
};

export const parsePacketFromHex = (hex: string): Packet[] => {
  const binaryString = convertHexString(hex);
  return parsePacket([...binaryString]);
};

const getSubPacketVersionSum = (packet: Packet[][]): number => {
  const subSum = packet.reduce(
    (totalSum, subPackets) =>
      totalSum +
      (subPackets?.reduce(
        (subSum, sub) =>
          subSum +
          sub.version +
          (sub.subPackets ? getSubPacketVersionSum(sub.subPackets) : 0),
        0,
      ) || 0),
    0,
  );
  return subSum;
};

export const getVersionSumFromHex = (hex: string): number => {
  const packets = parsePacketFromHex(hex);
  return getSubPacketVersionSum([packets]);
};

export const getOuterPacketValue = (hex: string) => {
  const packets = parsePacketFromHex(hex);
  return packets[0].value;
};

export const day16 = getVersionSumFromHex;
export const day16part2 = getOuterPacketValue;
