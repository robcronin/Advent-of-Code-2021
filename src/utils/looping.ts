export const range = (x: number, y?: number): number[] => {
  const start = y ? x : 0;
  const end = y ? y : x;
  return [...Array(end - start).keys()].map((x) => x + start);
};
