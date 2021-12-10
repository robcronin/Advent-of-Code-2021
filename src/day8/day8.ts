import { parseInput, parseLines } from '../utils/input';

type ClockDigits = string[];
type ClockInfo = {
  clockDigits: ClockDigits;
  clockOutput: string[];
};

type NumberCodes = Record<number, string>;
type Decode = Record<string, number>;

export const parseSingleClockInfo = (input: string): ClockInfo => {
  const [stringClockDigits, stringClockOutput] = input.split(' | ');
  const clockDigits = parseInput(stringClockDigits) as string[];
  const clockOutput = parseInput(stringClockOutput) as string[];
  return { clockDigits, clockOutput };
};

export const parseClockInfo = (input: string): ClockInfo[] => {
  const parsed = parseLines(input);
  return parsed.map(parseSingleClockInfo);
};

const findUniqueLength = ({
  clockDigits,
  length,
}: {
  clockDigits: ClockDigits;
  length: number;
}): string => {
  const numberCode = clockDigits.find((digit) => digit.length === length);
  if (!numberCode) throw new Error('Unique length not found');
  return numberCode;
};

const findNumberWithin = ({
  options,
  numberWithin,
  notWithin,
}: {
  options: string[];
  numberWithin: string;
  notWithin?: boolean;
}): string => {
  const numberCode = options.filter((option) => {
    const isWithin = [...numberWithin].every((oneDigit) =>
      option.includes(oneDigit),
    );
    return notWithin ? !isWithin : isWithin;
  });
  if (numberCode.length !== 1) throw new Error('Bad match found within number');
  return numberCode[0];
};

export const determineOutputSum = (clockInfo: ClockInfo): number => {
  const { clockDigits, clockOutput } = clockInfo;
  const numberCodes: NumberCodes = {
    1: findUniqueLength({ clockDigits, length: 2 }),
    4: findUniqueLength({ clockDigits, length: 4 }),
    7: findUniqueLength({ clockDigits, length: 3 }),
    8: findUniqueLength({ clockDigits, length: 7 }),
  };
  const sixes = clockDigits.filter((num) => num.length === 6);
  const fives = clockDigits.filter((num) => num.length === 5);

  numberCodes[6] = findNumberWithin({
    numberWithin: numberCodes[1],
    options: sixes,
    notWithin: true,
  });
  numberCodes[9] = findNumberWithin({
    numberWithin: numberCodes[4],
    options: sixes,
  });
  numberCodes[0] = sixes.filter(
    (six) => six !== numberCodes[9] && six !== numberCodes[6],
  )[0];

  numberCodes[3] = findNumberWithin({
    numberWithin: numberCodes[7],
    options: fives,
  });
  const new5s = fives.filter((five) => five !== numberCodes[3]);

  numberCodes[5] = new5s.filter((six) =>
    [...six].every((oneDigit) => {
      return numberCodes[9].includes(oneDigit);
    }),
  )[0];

  numberCodes[2] = new5s.filter((six) => six !== numberCodes[5])[0];

  const decode: Decode = Object.keys(numberCodes).reduce(
    (acc: Decode, num: string) => ({
      ...acc,
      [[...numberCodes[+num]].sort().join('')]: +num,
    }),

    {},
  );

  const outputnumberCodes = clockOutput.map((output) => {
    const sorted = [...output].sort().join('');
    return decode[sorted];
  });
  return +outputnumberCodes.join('');
};

export const day8 = (clockInfo: ClockInfo[]) => {
  const uniqueLengths = [2, 4, 3, 7];
  return clockInfo.reduce((sum, singleClockInfo) => {
    const numUnique = singleClockInfo.clockOutput.reduce(
      (uniques, output) =>
        uniqueLengths.includes(output.length) ? uniques + 1 : uniques,
      0,
    );
    return sum + numUnique;
  }, 0);
};

export const day8part2 = (clockInfo: ClockInfo[]) => {
  return clockInfo.reduce((sum, singleClockInfo) => {
    return sum + determineOutputSum(singleClockInfo);
  }, 0);
};
