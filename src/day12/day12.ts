import { parseLines } from '../utils/input';

export type Connections = Record<string, string[]>;
type CountConnectionsInput = {
  connections: Connections;
  startPoint?: string;
  smallVisits?: string[];
  hasDouble?: boolean;
  allowDoubleSmall?: boolean;
};
const START = 'start';
const END = 'end';

export const parseCaveMap = (input: string): Connections => {
  const parsed = parseLines(input);
  return parsed.reduce((connections: Connections, connection) => {
    const [caveOne, caveTwo] = connection.split('-');
    [
      [caveOne, caveTwo],
      [caveTwo, caveOne],
    ].forEach(([caveIn, caveOut]) => {
      if (caveOut !== START && caveIn !== END) {
        if (connections[caveIn]) {
          connections[caveIn].push(caveOut);
        } else {
          connections[caveIn] = [caveOut];
        }
      }
    });
    return connections;
  }, {});
};

export const getIsSmallCave = (cave: string): boolean =>
  cave !== START && cave !== END && cave === cave.toLowerCase();

export const countConnections = ({
  connections,
  startPoint = START,
  smallVisits = [],
  hasDouble = false,
  allowDoubleSmall = false,
}: CountConnectionsInput): number =>
  connections[startPoint].reduce((sum, cave) => {
    const isSmallCave = getIsSmallCave(cave);
    const doubleVist =
      allowDoubleSmall &&
      isSmallCave &&
      smallVisits.includes(cave) &&
      !hasDouble;

    if (cave === END) return sum + 1;
    if (
      !isSmallCave ||
      (isSmallCave && !smallVisits.includes(cave)) ||
      doubleVist
    ) {
      return (
        sum +
        countConnections({
          connections,
          startPoint: cave,
          smallVisits: [...smallVisits, cave],
          hasDouble: doubleVist ? true : hasDouble,
          allowDoubleSmall,
        })
      );
    }
    return sum;
  }, 0);

export const day12 = (connections: Connections) =>
  countConnections({ connections });

export const day12part2 = (connections: Connections) =>
  countConnections({ connections, allowDoubleSmall: true });
