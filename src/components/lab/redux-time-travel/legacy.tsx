'use client';

import React, { useState } from 'react';
import { legacy_createStore as createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {
  EVOLVE,
  JUMP_TO_TIME,
  PASTE_PRESET,
  RESET_GRID,
  SET_CELL,
  TOGGLE_CELL,
} from './common/constants';

import { GRID_SIZE, HISTORY_LIMIT } from './common/constants';
import countNeighbors from './common/utils';
import ControlsBase from './common/ui/ControlsBase';
import { rootReducerActionType } from './types';
import GridCell from './common/ui/GridCell';

type AppState = {
  grid: boolean[];
  history: boolean[][];
  currentIndex: number;
  isPlaying?: boolean;
};

const emptyGrid = () => Array(GRID_SIZE).fill(false);

const initialState: AppState = {
  grid: emptyGrid(),
  history: [emptyGrid()],
  currentIndex: 0,
  isPlaying: false,
};

function rootReducer(
  state: AppState = initialState,
  action: rootReducerActionType
): AppState {
  const pushHistory = (newGrid: boolean[]) => {
    const past = state.history.slice(0, state.currentIndex + 1);
    if (past.length >= HISTORY_LIMIT) past.shift();
    past.push(newGrid);
    return {
      ...state,
      grid: newGrid,
      history: past,
      currentIndex: past.length - 1,
    };
  };

  switch (action.type) {
    case TOGGLE_CELL: {
      const newGrid = [...state.grid];
      newGrid[action.payload] = !newGrid[action.payload];
      return pushHistory(newGrid);
    }

    case SET_CELL: {
      const { index, value } = action.payload;
      if (state.grid[index] === value) return state;
      const newGrid = [...state.grid];
      newGrid[index] = value;
      return pushHistory(newGrid);
    }

    case EVOLVE: {
      const currentGrid = state.grid;
      const newGrid = currentGrid.map((alive, i) => {
        const neighbors = countNeighbors(currentGrid, i);
        if (alive && (neighbors === 2 || neighbors === 3)) return true;
        if (!alive && neighbors === 3) return true;
        return false;
      });

      if (JSON.stringify(currentGrid) === JSON.stringify(newGrid)) {
        return { ...state, isPlaying: false };
      }
      return pushHistory(newGrid);
    }

    case PASTE_PRESET: {
      const newGrid = Array(GRID_SIZE).fill(false);
      action.payload.forEach((idx: number) => {
        if (idx >= 0 && idx < GRID_SIZE) newGrid[idx] = true;
      });
      return pushHistory(newGrid);
    }

    case JUMP_TO_TIME: {
      const targetIndex = action.payload;
      if (targetIndex < 0 || targetIndex >= state.history.length) return state;
      return {
        ...state,
        currentIndex: targetIndex,
        grid: state.history[targetIndex],
      };
    }

    case RESET_GRID: {
      const e = emptyGrid();
      return {
        ...state,
        grid: e,
        history: [e],
        currentIndex: 0,
        isPlaying: false,
      };
    }

    default:
      return state;
  }
}

const store = createStore(rootReducer);

const ReduxLabContent: React.FC = () => {
  const grid = useSelector((s: AppState) => s.grid);
  const history = useSelector((s: AppState) => s.history);
  const currentIndex = useSelector((s: AppState) => s.currentIndex);
  const dispatch = useDispatch();

  const [isDrawing, setIsDrawing] = useState(false);

  const toggleCell = (index: number) => ({ type: TOGGLE_CELL, payload: index });
  const setCell = (payload: { index: number; value: boolean }) => ({
    type: SET_CELL,
    payload,
  });
  const onReset = () => dispatch({ type: RESET_GRID });
  const onStep = () => dispatch({ type: EVOLVE });
  const onJump = (n: number) => dispatch({ type: JUMP_TO_TIME, payload: n });
  const onPreset = (pattern: number[]) =>
    dispatch({ type: PASTE_PRESET, payload: pattern });
  const onScrub = (n: number) => onJump(n);

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.hasAttribute('data-index')) {
      const index = Number(element.getAttribute('data-index'));
      dispatch(setCell({ index, value: true }));
    }
  };

  return (
    <div
      className='relative h-screen w-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 flex flex-col items-center justify-center overflow-hidden font-mono'
      onMouseDown={() => setIsDrawing(true)}
      onMouseUp={() => setIsDrawing(false)}
      onMouseLeave={() => setIsDrawing(false)}
    >
      <div
        className='absolute inset-0 
      bg-[linear-gradient(rgba(94,110,133,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(94,110,133,0.07)_1px,transparent_1px)] 
      dark:bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] 
      bg-size-[40px_40px] pointer-events-none'
      />

      <div className='relative mb-24'>
        <div
          className='grid grid-cols-10 gap-1 w-[300px] md:w-[400px] select-none touch-none'
          onTouchStart={() => setIsDrawing(true)}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => setIsDrawing(false)}
        >
          {grid.map((active, i) => (
            <GridCell
              key={i}
              index={i}
              active={active}
              isDrawing={isDrawing}
              setCell={setCell}
              toggleCell={toggleCell}
            />
          ))}
        </div>

        <div className='absolute -left-6 -top-6 w-3 h-3 border-l-2 border-t-2 border-slate-500 dark:border-emerald-500/30' />
        <div className='absolute -right-6 -top-6 w-3 h-3 border-r-2 border-t-2 border-slate-500 dark:border-emerald-500/30' />
        <div className='absolute -left-6 -bottom-6 w-3 h-3 border-l-2 border-b-2 border-slate-500 dark:border-emerald-500/30' />
        <div className='absolute -right-6 -bottom-6 w-3 h-3 border-r-2 border-b-2 border-slate-500 dark:border-emerald-500/30' />
      </div>

      <ControlsBase
        history={history}
        currentIndex={currentIndex}
        grid={grid}
        onScrub={onScrub}
        onReset={onReset}
        onStep={onStep}
        onJump={onJump}
        onPreset={onPreset}
      />
    </div>
  );
};

export default function ReduxTimeTravelLab() {
  return (
    <Provider store={store}>
      <ReduxLabContent />
    </Provider>
  );
}
