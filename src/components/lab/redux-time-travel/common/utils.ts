export default function countNeighbors(grid: boolean[], index: number): number {
  const size = Math.sqrt(grid.length);
  const row = Math.floor(index / size);
  const col = index % size;
  let count = 0;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (x === 0 && y === 0) continue;
      const r = row + x;
      const c = col + y;
      if (r >= 0 && r < size && c >= 0 && c < size) {
        if (grid[r * size + c]) count++;
      }
    }
  }
  return count;
}
