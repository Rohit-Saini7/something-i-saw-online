'use client';

import React, { useEffect, useState } from 'react';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { GRID_SIZE, HISTORY_LIMIT } from './common/constants';
import { countNeighbors } from './common/utils';
import { GridCell } from './common/ui/GridCell';
import { ControlsBase } from './common/ui/ControlsBase';

type AppState = {
  grid: boolean[];
  history: boolean[][];
  currentIndex: number;
};

const emptyGrid = () => Array(GRID_SIZE).fill(false);

const initialState: AppState = {
  grid: emptyGrid(),
  history: [emptyGrid()],
  currentIndex: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    toggleCell: (state, action: PayloadAction<number>) => {
      state.grid[action.payload] = !state.grid[action.payload];
      recordHistory(state);
    },
    setCell: (
      state,
      action: PayloadAction<{ index: number; value: boolean }>
    ) => {
      const { index, value } = action.payload;
      if (state.grid[index] !== value) {
        state.grid[index] = value;
        recordHistory(state);
      }
    },
    evolve: (state) => {
      const currentGrid = state.grid;
      const newGrid = currentGrid.map((alive, i) => {
        const neighbors = countNeighbors(currentGrid, i);
        if (alive && (neighbors === 2 || neighbors === 3)) return true;
        if (!alive && neighbors === 3) return true;
        return false;
      });

      if (JSON.stringify(currentGrid) !== JSON.stringify(newGrid)) {
        state.grid = newGrid;
        recordHistory(state);
      }
    },
    pastePreset: (state, action: PayloadAction<number[]>) => {
      const newGrid = Array(GRID_SIZE).fill(false);
      action.payload.forEach((idx) => {
        if (idx >= 0 && idx < GRID_SIZE) newGrid[idx] = true;
      });
      state.grid = newGrid;
      recordHistory(state);
    },
    jumpToTime: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      if (idx >= 0 && idx < state.history.length) {
        state.currentIndex = idx;
        state.grid = state.history[idx];
      }
    },
    resetGrid: (state) => {
      const e = emptyGrid();
      state.grid = e;
      state.history = [e];
      state.currentIndex = 0;
    },
    recordHistory: (state) => {
      state.history = state.history.slice(0, state.currentIndex + 1);

      if (state.history.length >= HISTORY_LIMIT) {
        state.history.shift();
      }

      state.history.push([...state.grid]);
      state.currentIndex = state.history.length - 1;
    },
  },
});

function recordHistory(
  state: AppState & { history?: boolean[][]; currentIndex?: number }
) {
  state.history = state.history!.slice(0, (state.currentIndex ?? 0) + 1);
  if (state.history.length >= HISTORY_LIMIT) state.history.shift();
  state.history.push([...state.grid]);
  state.currentIndex = state.history.length - 1;
}

gameSlice.caseReducers.recordHistory = recordHistory;

const { toggleCell, setCell, evolve, pastePreset, jumpToTime, resetGrid } =
  gameSlice.actions;

const store = configureStore({
  reducer: (state, action) => gameSlice.reducer(state, action),
  middleware: (gdm) => gdm({ serializableCheck: false }),
});

type RootState = ReturnType<typeof store.getState>;

const ReduxToolkitLabContent: React.FC = () => {
  const grid = useSelector((s: RootState) => s.grid);
  const history = useSelector((s: RootState) => s.history);
  const currentIndex = useSelector((s: RootState) => s.currentIndex);
  const dispatch = useDispatch();

  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      switch (e.code) {
        case 'ArrowLeft':
          e.preventDefault();
          dispatch(jumpToTime(Math.max(0, store.getState().currentIndex - 1)));
          break;
        case 'ArrowRight':
          e.preventDefault();
          const st = store.getState();
          dispatch(
            jumpToTime(Math.min(st.history.length - 1, st.currentIndex + 1))
          );
          break;
        case 'KeyR':
          e.preventDefault();
          dispatch(resetGrid());
          break;
        case 'KeyS':
          e.preventDefault();
          dispatch(evolve());
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dispatch]);

  const onScrub = (n: number) => dispatch(jumpToTime(n));
  const onReset = () => dispatch(resetGrid());
  const onStep = () => dispatch(evolve());
  const onJump = (n: number) => dispatch(jumpToTime(n));
  const onPreset = (pattern: number[]) => dispatch(pastePreset(pattern));

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
          {grid.map((active: boolean, i: number) => (
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

export default function ReduxToolkitTimeTravelLab() {
  return (
    <Provider store={store}>
      <ReduxToolkitLabContent />
    </Provider>
  );
}
