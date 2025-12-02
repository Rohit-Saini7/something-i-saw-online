import {
  EVOLVE,
  JUMP_TO_TIME,
  PASTE_PRESET,
  RESET_GRID,
  SET_CELL,
  TOGGLE_CELL,
} from './common/constants';

export interface GridCellProps {
  index: number;
  active: boolean;
  isDrawing: boolean;
  setCell: (payload: { index: number; value: boolean }) => {
    type: string;
    payload: { index: number; value: boolean };
  };
  toggleCell: (index: number) => { type: string; payload: number };
}

export type rootReducerActionType =
  | { type: typeof TOGGLE_CELL; payload: number }
  | { type: typeof SET_CELL; payload: { index: number; value: boolean } }
  | { type: typeof RESET_GRID }
  | { type: typeof JUMP_TO_TIME; payload: number }
  | { type: typeof EVOLVE }
  | { type: typeof PASTE_PRESET; payload: number[] };
