import { Coords, genNewGrid, GridInfo, runFnOnGrid } from '../utils/grid';
import { range } from '../utils/looping';

enum Pod {
  AMBER = 'A',
  BRONZE = 'B',
  COPPER = 'C',
  DESERT = 'D',
}
enum GridItem {
  EMPTY = '.',
  WALL = '#',
  AIR = ' ',
}
type MoveOption = {
  steps: number;
  startLocation: Coords;
  endLocation: Coords;
  cost: number;
};

type RoomMap = GridInfo<GridItem | Pod>;

const roomCols: Record<Pod, number> = {
  A: 3,
  B: 5,
  C: 7,
  D: 9,
};
const moveCosts: Record<Pod, number> = {
  A: 1,
  B: 10,
  C: 100,
  D: 1000,
};
const pods: Pod[] = [Pod.AMBER, Pod.BRONZE, Pod.COPPER, Pod.DESERT];
const HALLWAY = 1;
const ROOM_TOP = 2;
const HALLWAY_START_Y = 1;
const HALLWAY_END_Y = 11;

const getPositions = (roomMap: RoomMap): Coords[] => {
  const positions: Coords[] = [];
  range(HALLWAY_START_Y, HALLWAY_END_Y + 1).forEach((y) =>
    positions.push({ x: HALLWAY, y }),
  );
  Object.values(roomCols).forEach((y) => {
    range(ROOM_TOP, getRoomBottom(roomMap) + 1).forEach((x) => {
      positions.push({ x, y });
    });
  });
  return positions;
};
const getRoomBottom = (roomMap: RoomMap) => roomMap.numRows - 2;

const parseRoomMap = (input: string[]): RoomMap => {
  const emptyGrid = genNewGrid({
    numRows: input.length,
    numCols: input[0].length,
    defaultValue: GridItem.EMPTY,
  });
  return runFnOnGrid({
    gridInfo: emptyGrid,
    fnToRun: ({ coords: { x, y } }) => {
      const value = (input[x][y] as GridItem) ?? GridItem.AIR;
      return value;
    },
  });
};

const getIsHallway = (coords: Coords): boolean =>
  coords.x === HALLWAY &&
  coords.y >= HALLWAY_START_Y &&
  coords.y <= HALLWAY_END_Y;

// OK but refactor
const getRoom = (coords: Coords): Pod | undefined => {
  if (coords.x === HALLWAY) return undefined;
  const room = pods.find((pod) => coords.y === roomCols[pod]);
  return room;
};

const getIsRoomLevelFree = (roomMap: RoomMap, room: Pod, level: number) =>
  roomMap.grid[level][roomCols[room]] === GridItem.EMPTY;

const getRoomLevelLocation = (roomMap: RoomMap, room: Pod) => {
  const roomCol = roomCols[room];
  const roomBottom = getRoomBottom(roomMap);
  return range(roomBottom, ROOM_TOP - 1).find((level) => {
    const isLevelFree = getIsRoomLevelFree(roomMap, room, level);
    const isAboveFree = range(level - 1, ROOM_TOP - 1).every((aboveLevel) =>
      getIsRoomLevelFree(roomMap, room, aboveLevel),
    );
    const isBelowOk =
      level === roomBottom ||
      range(level + 1, roomBottom + 1).every(
        (belowLevel) => roomMap.grid[belowLevel][roomCol] === room,
      );
    return isLevelFree && isAboveFree && isBelowOk;
  });
};

const getIsInOwnRoom = (roomMap: RoomMap, coords: Coords) => {
  const { x, y } = coords;
  const pod = roomMap.grid[x][y] as Pod;
  return getRoom(coords) === pod;
};

const getReachRoomMoveOptions = (
  roomMap: RoomMap,
  coords: Coords,
  startingSteps: number = 0,
): MoveOption[] => {
  const { x, y } = coords;
  const moveOptions: MoveOption[] = [];
  const pod = roomMap.grid[x][y] as Pod;

  const roomLevelTarget = getRoomLevelLocation(roomMap, pod);
  if (roomLevelTarget) {
    const roomCol = roomCols[pod];
    const hallwayRange: [number, number] =
      roomCol > y ? [y + 1, roomCol + 1] : [y - 1, roomCol - 1];
    const isHallwayFree = range(...hallwayRange).every(
      (y) => roomMap.grid[HALLWAY][y] === GridItem.EMPTY,
    );
    if (isHallwayFree) {
      const stepsToRoomEntrance = Math.abs(roomCol - y);
      const stepsIn = roomLevelTarget - 1;
      const steps = stepsToRoomEntrance + stepsIn + startingSteps;
      moveOptions.push({
        steps,
        startLocation: coords,
        endLocation: { x: roomLevelTarget, y: roomCol },
        cost: steps * moveCosts[pod],
      });
    }
  }
  return moveOptions;
};

const getStepsToLeaveRoom = (
  roomMap: RoomMap,
  coords: Coords,
): number | undefined => {
  const room = getRoom(coords);
  if (!room) throw new Error('Not in room');
  const { x, y } = coords;

  const isEmptySpot =
    roomMap.grid[HALLWAY][y - 1] === GridItem.EMPTY ||
    roomMap.grid[HALLWAY][y + 1] === GridItem.EMPTY;
  if (!isEmptySpot) return undefined;

  const isPathAboveFree = range(x - 1, ROOM_TOP - 1).every(
    (levelAbove) => roomMap.grid[levelAbove][y] === GridItem.EMPTY,
  );
  if (isPathAboveFree) return x - 1;
};

const getShouldLeaveRoom = (roomMap: RoomMap, coords: Coords) => {
  const { x, y } = coords;
  const roomBottom = getRoomBottom(roomMap);
  const pod = roomMap.grid[x][y] as Pod;
  const isInOwnRoom = getIsInOwnRoom(roomMap, coords);
  if (!isInOwnRoom) return true;
  if (isInOwnRoom && x === roomBottom) return false;
  const isBelowOk = range(x + 1, roomBottom + 1).every(
    (levelBelow) => roomMap.grid[levelBelow][y] === pod,
  );
  if (isInOwnRoom && isBelowOk) return false;
  return true;
};

const getLeaveRoomMoveOptions = (
  roomMap: RoomMap,
  coords: Coords,
): MoveOption[] => {
  const { x, y } = coords;
  const pod = roomMap.grid[x][y] as Pod;
  if (!pods.includes(pod) || !getRoom(coords)) {
    throw new Error('Not a pod or not in room');
  }

  const shouldLeaveRoom = getShouldLeaveRoom(roomMap, coords);
  if (!shouldLeaveRoom) return [];

  const stepsToLeave = getStepsToLeaveRoom(roomMap, coords);
  if (!stepsToLeave) return [];
  const moveOptions = getReachRoomMoveOptions(
    roomMap,
    { x: HALLWAY, y },
    stepsToLeave,
  );

  // Go left
  let position = y;
  let hitWall = false;
  while (position >= HALLWAY_START_Y && !hitWall) {
    if (roomMap.grid[HALLWAY][position] !== GridItem.EMPTY) {
      hitWall = true;
    } else {
      if (!Object.values(roomCols).includes(position)) {
        const steps = stepsToLeave + Math.abs(y - position);
        moveOptions.push({
          steps,
          startLocation: coords,
          endLocation: { x: HALLWAY, y: position },
          cost: moveCosts[pod] * steps,
        });
      }
      position--;
    }
  }

  // Go right
  position = y;
  hitWall = false;
  while (position <= HALLWAY_END_Y && !hitWall) {
    if (roomMap.grid[HALLWAY][position] !== GridItem.EMPTY) {
      hitWall = true;
    } else {
      if (!Object.values(roomCols).includes(position)) {
        const steps = stepsToLeave + Math.abs(y - position);
        moveOptions.push({
          steps,
          startLocation: coords,
          endLocation: { x: HALLWAY, y: position },
          cost: steps * moveCosts[pod],
        });
      }
      position++;
    }
  }

  return moveOptions;
};

const getMoveOptions = (roomMap: RoomMap, coords: Coords): MoveOption[] => {
  const isHallway = getIsHallway(coords);
  if (isHallway) return getReachRoomMoveOptions(roomMap, coords);
  return getLeaveRoomMoveOptions(roomMap, coords);
};

const getAllMoveOptions = (
  roomMap: RoomMap,
  positions: Coords[],
): MoveOption[] =>
  positions.reduce((moveOptions: MoveOption[], position) => {
    if (getIsPod(roomMap, position)) {
      const extraOptions = getMoveOptions(roomMap, position);
      return [...moveOptions, ...extraOptions];
    }
    return moveOptions;
  }, []);

const isTargetCondition = (roomMap: RoomMap) => {
  const { grid } = roomMap;
  return pods.every((pod) =>
    range(ROOM_TOP, getRoomBottom(roomMap) + 1).every(
      (x) => grid[x][roomCols[pod]] === pod,
    ),
  );
};

const getMemoString = (roomMap: RoomMap, currentCost: number) => {
  let memoString = `${currentCost}:`;
  const { grid } = roomMap;
  range(HALLWAY_START_Y, HALLWAY_END_Y + 1).forEach(
    (y) => (memoString += grid[HALLWAY][y]),
  );
  Object.values(roomCols).forEach((y) => {
    range(ROOM_TOP, getRoomBottom(roomMap) + 1).forEach((x) => {
      memoString += grid[x][y];
    });
  });
  return memoString;
};

const getIsPod = (roomMap: RoomMap, coords: Coords) => {
  const value = roomMap.grid[coords.x][coords.y] as GridItem | Pod;
  // @ts-ignore
  return pods.includes(value);
};

const getMinCostToTarget = (
  roomMap: RoomMap,
  positions: Coords[],
  memo: Record<string, number> = { globalMin: Number.MAX_SAFE_INTEGER },
  currentCost: number = 0,
): number => {
  // memo
  const memoString = getMemoString(roomMap, currentCost);
  if (memo[memoString]) return memo[memoString];
  if (currentCost > memo.globalMin) return currentCost;
  if (isTargetCondition(roomMap)) return currentCost;

  const allMoveOptions = getAllMoveOptions(roomMap, positions);
  let min = Number.MAX_SAFE_INTEGER;
  allMoveOptions.forEach((moveOption) => {
    const {
      startLocation: { x: sx, y: sy },
      endLocation: { x: ex, y: ey },
      cost,
    } = moveOption;
    const { grid } = roomMap;
    const pod = grid[sx][sy];
    grid[ex][ey] = pod;
    grid[sx][sy] = GridItem.EMPTY;

    const costToTarget = getMinCostToTarget(
      roomMap,
      positions,
      memo,
      currentCost + cost,
    );
    if (costToTarget < min) min = costToTarget;
    if (costToTarget < memo.globalMin) memo.globalMin = costToTarget;
    grid[sx][sy] = pod;
    grid[ex][ey] = GridItem.EMPTY;
  });
  memo[memoString] = min;
  return min;
};

export const day23 = (input: string[]) => {
  const roomMap = parseRoomMap(input);
  const positions = getPositions(roomMap);
  return getMinCostToTarget(roomMap, positions);
};

export const day23part2 = (input: string[]) => {
  const addedLines = ['  #D#C#B#A#', '  #D#B#A#C#'];
  const unfoldedInput = [
    ...input.slice(0, 3),
    ...addedLines,
    ...input.slice(3),
  ];
  const roomMap = parseRoomMap(unfoldedInput);
  const positions = getPositions(roomMap);
  return getMinCostToTarget(roomMap, positions);
};
