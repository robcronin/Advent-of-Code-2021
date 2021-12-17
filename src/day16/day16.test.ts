import { logAnswer } from '../utils/logging';
import {
  convertHexString,
  day16,
  day16part2,
  getOuterPacketValue,
  getVersionSumFromHex,
  parsePacket,
  parsePacketFromHex,
} from './day16';
import { input } from './day16.data';

const testData = 'A0016C880162017C3686B18A3D4780';
const data = input;

describe('day 16', () => {
  it('test cases', () => {
    expect(day16(testData)).toBe(31);
  });

  it('answer', () => {
    const answer = day16(data);
    logAnswer(answer, 16, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(996);
  });
});

describe('day 16 part 2', () => {
  it('test cases', () => {
    expect(day16part2(testData)).toBe(54);
  });

  it('answer', () => {
    const answer = day16part2(data);
    logAnswer(answer, 16, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(96257984154);
  });
});

describe('convertHexString', () => {
  it('should convert a hex string to a binary string', () => {
    expect(convertHexString('D2FE28')).toBe('110100101111111000101000');
  });
});

describe('parsePacket', () => {
  it('parse the packet with literal type', () => {
    const binary = '110100101111111000101000';
    expect(parsePacket([...binary])).toEqual([
      { value: 2021, type: 4, version: 6, binaryLength: 21 },
    ]);
  });
  it('parse the packet with operator of length type 0', () => {
    const binary = '00111000000000000110111101000101001010010001001000000000';
    expect(parsePacket([...binary])).toEqual([
      {
        binaryLength: 49,
        subPackets: [
          [{ binaryLength: 11, value: 10, type: 4, version: 6 }],
          [{ binaryLength: 16, value: 20, type: 4, version: 2 }],
        ],
        type: 6,
        value: 1,
        version: 1,
      },
    ]);
  });
  it('parse the packet with operator of length type 1', () => {
    const binary = '11101110000000001101010000001100100000100011000001100000';
    expect(parsePacket([...binary])).toEqual([
      {
        binaryLength: 51,
        subPackets: [
          [{ binaryLength: 11, value: 1, type: 4, version: 2 }],
          [{ binaryLength: 11, value: 2, type: 4, version: 4 }],
          [{ binaryLength: 11, value: 3, type: 4, version: 1 }],
        ],
        type: 3,
        value: 3,
        version: 7,
      },
    ]);
  });
});

describe('parsePacketFromHex', () => {
  it('should parse packets from 8A004A801A8002F478', () => {
    expect(parsePacketFromHex('8A004A801A8002F478')).toEqual([
      {
        binaryLength: 69,
        subPackets: [
          [
            {
              binaryLength: 51,
              subPackets: [
                [
                  {
                    binaryLength: 33,
                    subPackets: [
                      [
                        {
                          binaryLength: 11,
                          value: 15,
                          type: 4,
                          version: 6,
                        },
                      ],
                    ],
                    type: 2,
                    value: 15,
                    version: 5,
                  },
                ],
              ],
              type: 2,
              value: 15,
              version: 1,
            },
          ],
        ],
        type: 2,
        value: 15,
        version: 4,
      },
    ]);
  });
});

describe('getVersionSumFromHex', () => {
  it('should get the version sum from a hex string', () => {
    expect(getVersionSumFromHex('8A004A801A8002F478')).toBe(16);
    expect(getVersionSumFromHex('620080001611562C8802118E34')).toBe(12);
    expect(getVersionSumFromHex('C0015000016115A2E0802F182340')).toBe(23);
    expect(getVersionSumFromHex('A0016C880162017C3686B18A3D4780')).toBe(31);
  });
});

describe('getOuterPacketValue', () => {
  it('should get outer packet value', () => {
    expect(getOuterPacketValue('C200B40A82')).toBe(3);
    expect(getOuterPacketValue('04005AC33890')).toBe(54);
    expect(getOuterPacketValue('880086C3E88112')).toBe(7);
    expect(getOuterPacketValue('CE00C43D881120')).toBe(9);
    expect(getOuterPacketValue('D8005AC2A8F0')).toBe(1);
    expect(getOuterPacketValue('F600BC2D8F')).toBe(0);
    expect(getOuterPacketValue('9C005AC2F8F0')).toBe(0);
    expect(getOuterPacketValue('9C0141080250320F1802104A08')).toBe(1);
  });
});
