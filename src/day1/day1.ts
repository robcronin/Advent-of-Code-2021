const compareDepths = (input: number[], gap: number) =>
  input.reduce((increases, depth, index) => {
    if (index >= gap) {
      const gappedLastDepth = input[index - gap];
      if (depth > gappedLastDepth) return increases + 1;
    }
    return increases;
  }, 0);

export const day1 = (input: number[]) => compareDepths(input, 1);
export const day1part2 = (input: number[]) => compareDepths(input, 3);
