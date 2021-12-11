type Opens = '(' | '[' | '{' | '<';
type Closes = ')' | ']' | '}' | '>';

const CORRUPT_SCORES: Record<Closes, number> = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};
const INCOMPLETE_SCORES: Record<Closes, number> = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};
const OPEN_CLOSE_MAP: Record<Opens, Closes> = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

export const getCorruptScoreAndUnclosedOpens = (
  line: string,
): { corruptScore: number; unclosedOpens: Opens[] } => {
  const unclosedOpens: Opens[] = [];
  const corruptScore = [...line].reduce((corruptScore, char) => {
    if (corruptScore > 0) return corruptScore;
    if (Object.keys(OPEN_CLOSE_MAP).includes(char)) {
      unclosedOpens.push(char as Opens);
    } else {
      const lastOpen = unclosedOpens.pop();
      if (!lastOpen || char !== OPEN_CLOSE_MAP[lastOpen])
        return CORRUPT_SCORES[char as Closes];
    }
    return corruptScore;
  }, 0);

  return { corruptScore, unclosedOpens };
};

export const getIncompleteScore = (line: string): number => {
  const { unclosedOpens, corruptScore } = getCorruptScoreAndUnclosedOpens(line);
  if (corruptScore === 0) {
    const reverseOpens = unclosedOpens.reverse();
    return reverseOpens.reduce((lineSum, char) => {
      return lineSum * 5 + INCOMPLETE_SCORES[OPEN_CLOSE_MAP[char]];
    }, 0);
  }
  return -1;
};

export const day10 = (input: string[]) =>
  input.reduce(
    (sum, line) => sum + getCorruptScoreAndUnclosedOpens(line).corruptScore,
    0,
  );

export const day10part2 = (input: string[]) => {
  const lineScores = input.map(getIncompleteScore);
  const filteredLineScores = lineScores.filter((lineScore) => lineScore !== -1);
  const sortedScores = filteredLineScores.sort((a, b) => a - b);
  return sortedScores[Math.floor(sortedScores.length / 2)];
};
