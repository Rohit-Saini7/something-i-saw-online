'use client';

import { GridCellProps } from '@lab-components/redux-time-travel/types';
import { useDispatch } from 'react-redux';
import { memo } from 'react';
import { cn } from '@/lib/utils';

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
      className={cn(
        'aspect-square w-full cursor-crosshair rounded-sm border transition-all duration-150 border-border',
        active
          ? 'bg-primary border-primary scale-95 shadow-sm'
          : 'bg-muted hover:bg-accent'
      )}
    />
  );
}

const GridCell = memo(GridCellComponent, (prev, next) => {
  return prev.active === next.active && prev.isDrawing === next.isDrawing;
});

export default GridCell;
