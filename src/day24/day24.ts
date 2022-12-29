/*
  I wrote the code to run the system first but it wasn't really needed in the end
  Worked out on a spreadsheet how the system ran based on the input
    There are 14 blocks of similar instructions
    x,y get reset for each block - only z carries over
    w gets inputted each time
    The "eq x w" determines whether z gets multiplies by 26 or not
    Only possible to match "eq x w" 7 times - as otherwise the number for w is over 9(not allowed)
      If no match get multiplied by 26
      Only 7 "div z 26"
        Meaning if we want z to be 0 we need to match all the possible matches
    These matches were worked out on a spreadsheet 😅:
        6 + w4 == w5;
        w3 - 6 == w6;
        w7 - 2 == w8;
        w9 - 1 == w10;
        w11 == w12;
        w2 + 8 == w13;
        w1 + 4 == w14;
*/

enum Operation {
  INP = 'inp',
  ADD = 'add',
  MUL = 'mul',
  DIV = 'div',
  MOD = 'mod',
  EQL = 'eql',
}
enum Register {
  w = 'w',
  x = 'x',
  y = 'y',
  z = 'z',
}
type Instruction = {
  operation: Operation;
  a: Register;
  b?: number | Register;
};
type Block = Instruction[];
type State = Record<Register, number>;

type OperationFn = (a: Register, b: Register | number, state: State) => State;

const getValue = (a: Register | number, state: State) =>
  typeof a === 'number' ? a : state[a];

const runOperation: Record<Operation, OperationFn> = {
  [Operation.INP]: (a, b, state) => ({ ...state, [a]: getValue(b, state) }),
  [Operation.ADD]: (a, b, state) => ({
    ...state,
    [a]: getValue(a, state) + getValue(b, state),
  }),
  [Operation.MUL]: (a, b, state) => ({
    ...state,
    [a]: getValue(a, state) * getValue(b, state),
  }),
  [Operation.DIV]: (a, b, state) => ({
    ...state,
    [a]: Math.floor(getValue(a, state) / getValue(b, state)),
  }),
  [Operation.MOD]: (a, b, state) => ({
    ...state,
    [a]: getValue(a, state) % getValue(b, state),
  }),
  [Operation.EQL]: (a, b, state) => ({
    ...state,
    [a]: getValue(a, state) === getValue(b, state) ? 1 : 0,
  }),
};

const getInitialState = (): State => ({ w: 0, x: 0, y: 0, z: 0 });

const parseInstructions = (input: string[]): Instruction[] =>
  input.map((line) => {
    const [operation, a, b] = line.split(' ');
    return {
      operation: operation as Operation,
      a: a as Register,
      b: Number.isNaN(+b) ? (b as Register) : +b,
    };
  });

const runInstructions = (
  instructions: Instruction[],
  input: number[],
  startingState: State = getInitialState(),
) =>
  instructions.reduce((state, instruction) => {
    const { a, b, operation } = instruction;
    let passInB = operation === Operation.INP ? input.shift() : b;
    if (passInB === undefined) throw new Error('Input is empty');
    return runOperation[operation](a, passInB, state);
  }, startingState);

const getIsModelNumberValid = (
  instructions: Instruction[],
  modelNumber: number,
) => {
  const endState = runInstructions(
    instructions,
    [...modelNumber.toString()].map(Number),
  );
  return endState.z === 0;
};

const splitInstructionBlocks = (instructions: Instruction[]): Block[] =>
  instructions.reduce((blocks: Block[], instruction) => {
    if (instruction.operation === Operation.INP) {
      return [...blocks, [instruction]];
    }
    blocks[blocks.length - 1].push(instruction);
    return blocks;
  }, []);

const generateAllValidModelNumbers = () => {
  const allowed = {
    1: [1, 2, 3, 4, 5],
    2: 1,
    3: [7, 8, 9],
    4: [1, 2, 3],
    7: [3, 4, 5, 6, 7, 8, 9],
    9: [2, 3, 4, 5, 6, 7, 8, 9],
    11: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  };
  const numbers: number[] = [];
  const n2 = 1;
  const n13 = 9;
  allowed[1].forEach((n1) => {
    const n14 = n1 + 4;
    allowed[3].forEach((n3) => {
      const n6 = n3 - 6;
      allowed[4].forEach((n4) => {
        const n5 = n4 + 6;
        allowed[7].forEach((n7) => {
          const n8 = n7 - 2;
          allowed[9].forEach((n9) => {
            const n10 = n9 - 1;
            allowed[11].forEach((n11) => {
              const n12 = n11;
              const nString = `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}${n13}${n14}`;
              numbers.push(+nString);
            });
          });
        });
      });
    });
  });
  return numbers;
};

export const day24 = (input: string[]) => {
  const instructions = parseInstructions(input);
  const validModelNumbers = generateAllValidModelNumbers();

  const modelNumber = Math.max(...validModelNumbers);
  if (getIsModelNumberValid(instructions, modelNumber)) {
    return modelNumber;
  }
};

export const day24part2 = (input: string[]) => {
  const instructions = parseInstructions(input);
  const validModelNumbers = generateAllValidModelNumbers();

  const modelNumber = Math.min(...validModelNumbers);
  if (getIsModelNumberValid(instructions, modelNumber)) {
    return modelNumber;
  }
};
