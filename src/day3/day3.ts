import { parseLines } from '../utils/input';

export const parseBinary = (input: string) => {
  const parsed = parseLines(input);
  const maxLength = parsed[0].length;
  return { data: parsed.map((binary) => parseInt(binary, 2)), maxLength };
};

const getNum1s = (input: number[], power: number) =>
  input.reduce((count, number) => {
    if ((number & power) > 0) return count + 1;
    return count;
  }, 0);

const getPowerList = (length: number) => {
  const powers = [];
  for (let i = 0; i < length; i++) {
    powers.push(2 ** i);
  }
  return powers;
};

const filterOnCriteria = (
  input: number[],
  powers: number[],
  oneCriteria: (num1s: number, filtered: number[]) => boolean,
) =>
  powers.reduce((filtered, power) => {
    if (filtered.length === 1) return filtered;
    const num1s = getNum1s(filtered, power);
    const mask = oneCriteria(num1s, filtered) ? power : 0;
    return filtered.filter((num) => (num & power) === mask);
  }, input)[0];

export const day3 = (input: number[], maxLength: number) => {
  const powers = getPowerList(maxLength);
  const gammaRate = powers.reduce((sum, power) => {
    const num1s = getNum1s(input, power);
    if (num1s > input.length / 2) return sum + power;
    return sum;
  }, 0);
  const epsilonRate = gammaRate ^ (2 ** maxLength - 1);

  return gammaRate * epsilonRate;
};

export const day3part2 = (input: number[], maxLength: number) => {
  const powers = getPowerList(maxLength).reverse();
  const oxygen = filterOnCriteria(
    input,
    powers,
    (num1s, filtered) => num1s >= filtered.length / 2,
  );
  const co2 = filterOnCriteria(
    input,
    powers,
    (num1s, filtered) => num1s < filtered.length / 2,
  );

  return oxygen * co2;
};
