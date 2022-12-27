const testString = `#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`;
const input = `#############
#...........#
###D#A#C#C###
  #D#A#B#B#
  #########`;

const parseRooms = (input: string) => input.split('\n');

export const testData = parseRooms(testString);
export const data = parseRooms(input);
