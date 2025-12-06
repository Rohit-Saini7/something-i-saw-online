'use client';

import { GridCellProps } from '@lab-components/redux-time-travel/types';
import { useDispatch } from 'react-redux';
import { memo } from 'react';

function GridCellComponent({
  index,
  active,
  isDrawing,
  setCell,
  toggleCell,
}: GridCellProps) {
  const dispatch = useDispatch();

  const handleEnter = () => {
    if (isDrawing) {
      dispatch(setCell({ index, value: true }));
    }
  };

  const handleDown = () => {
    dispatch(toggleCell(index));
  };

  return (
    <div
      data-index={index}
      onMouseDown={handleDown}
      onMouseEnter={handleEnter}
      className={`
        aspect-square w-full rounded-sm border transition-all duration-150 cursor-crosshair border-slate-300 dark:border-slate-800
        ${
          active
            ? 'bg-emerald-500 border-emerald-500 scale-95 shadow-sm dark:shadow-[0_0_10px_#10b981] dark:border-emerald-400'
            : 'bg-slate-300 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800'
        }
      `}
    />
  );
}

const GridCell = memo(GridCellComponent, (prev, next) => {
  return prev.active === next.active && prev.isDrawing === next.isDrawing;
});

export default GridCell;
