export const GRID_SIZE = 100;
export const HISTORY_LIMIT = 50;

export const PRESETS = {
  glider: [1, 12, 20, 21, 22],
  exploder: [54, 55, 63, 65, 66, 74, 75],
  RS: [
    20, 21, 22, 23, 26, 27, 28, 29, 30,
    33, 36, 40, 42, 43, 46, 47, 50, 51,
    58, 59, 60, 62, 69, 70, 73, 76, 77, 78, 79,
  ],
};

export const TOGGLE_CELL = 'TOGGLE_CELL';
export const SET_CELL = 'SET_CELL';
export const RESET_GRID = 'RESET_GRID';
export const JUMP_TO_TIME = 'JUMP_TO_TIME';
export const EVOLVE = 'EVOLVE';
export const PASTE_PRESET = 'PASTE_PRESET';