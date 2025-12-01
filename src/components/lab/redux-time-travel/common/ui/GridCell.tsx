'use client';

import { GridCellProps } from '@lab-components/redux-time-travel/types';
import { useDispatch } from 'react-redux';

export const GridCell = ({
  index,
  active,
  isDrawing,
  setCell,
  toggleCell,
}: GridCellProps) => {
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
        aspect-square w-full rounded-sm border border-slate-800 transition-all duration-150 cursor-crosshair
        ${
          active
            ? 'bg-emerald-500 shadow-[0_0_10px_#10b981] border-emerald-400 scale-95'
            : 'bg-slate-900 hover:bg-slate-800'
        }
      `}
    />
  );
};
