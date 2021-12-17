import { range } from '../utils/looping';

type TargetArea = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

type ValidYStep = {
  numSteps: number;
  startingVelocity: number;
  isValidXExist?: boolean;
  numValidXs?: number;
};

type ValidStep = ValidYStep & {
  isValidXExist: boolean;
  numValidXs: number;
};

export const parseTargetArea = (input: string): TargetArea => {
  const coordString = input.slice(15);
  const [xs, ys] = coordString.split(', y=');
  const [minX, maxX] = xs.split('..');
  const [minY, maxY] = ys.split('..');
  return {
    minX: +minX,
    maxX: +maxX,
    minY: +minY,
    maxY: +maxY,
  };
};

export const getValidYSteps = ({
  min,
  max,
  velocity,
}: {
  min: number;
  max: number;
  velocity: number;
}): ValidYStep[] => {
  let curVelocity = velocity;
  let position = 0;
  let steps = 0;
  let validSteps: ValidYStep[] = [];
  while (position >= min) {
    position += curVelocity;
    curVelocity--;
    steps++;
    if (position >= min && position <= max) {
      validSteps.push({ numSteps: steps, startingVelocity: velocity });
    }
  }
  return validSteps;
};

export const getValidSteps = ({
  validYSteps,
  maxX,
  minX,
  validX,
}: {
  validYSteps: ValidYStep[];
  maxX: number;
  minX: number;
  validX: Set<number>;
}): ValidStep[] =>
  validYSteps
    .map((yStep) => {
      const { numSteps } = yStep;
      let numValidXs = 0;
      range(maxX + 1).forEach((xVel) => {
        let posX = 0;
        let vel = xVel;
        range(numSteps).forEach(() => {
          posX += vel;
          if (vel > 0) vel--;
        });
        if (posX >= minX && posX <= maxX && !validX.has(xVel)) {
          numValidXs++;
          validX.add(xVel);
        }
      });
      return { ...yStep, isValidXExist: numValidXs > 0, numValidXs };
    })
    .filter((yStep) => !!yStep.isValidXExist);

export const findAllCombosAndMaxHeight = (targetArea: TargetArea) => {
  const { minX, maxX, minY, maxY } = targetArea;
  return range(Math.abs(minY) * 2).reduce(
    ({ maxHeight, numCombos }, iniyVel) => {
      const yVel = iniyVel - Math.abs(minY);
      const validYSteps = getValidYSteps({
        min: minY,
        max: maxY,
        velocity: yVel,
      });
      const validX = new Set<number>();
      const validSteps: ValidStep[] = getValidSteps({
        validYSteps,
        maxX,
        minX,
        validX,
      });
      const localNumCombos = validSteps.reduce(
        (sum, step) => sum + step.numValidXs,
        0,
      );
      const localMaxHeight = (yVel * (yVel + 1)) / 2;

      return {
        maxHeight: localMaxHeight > maxHeight ? localMaxHeight : maxHeight,
        numCombos: numCombos + localNumCombos,
      };
    },
    { maxHeight: 0, numCombos: 0 },
  );
};

export const day17 = (targetArea: TargetArea) =>
  findAllCombosAndMaxHeight(targetArea).maxHeight;

export const day17part2 = (targetArea: TargetArea) =>
  findAllCombosAndMaxHeight(targetArea).numCombos;
