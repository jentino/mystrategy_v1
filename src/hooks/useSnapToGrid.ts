import type { Position } from '../types';

const SNAP_THRESHOLD = 50; // pixels

export function useSnapToGrid(containerRef: React.RefObject<HTMLElement>) {
  const snapToQuadrant = (position: Position): Position => {
    if (!containerRef.current) return position;

    const container = containerRef.current.getBoundingClientRect();
    const midX = container.width / 2;
    const midY = container.height / 2;

    const snappedX = position.x < midX ? 20 : midX + 20;
    const snappedY = position.y < midY ? 20 : midY + 20;

    // Only snap if we're close to the quadrant boundaries
    const shouldSnapX = Math.abs(position.x - snappedX) < SNAP_THRESHOLD;
    const shouldSnapY = Math.abs(position.y - snappedY) < SNAP_THRESHOLD;

    return {
      x: shouldSnapX ? snappedX : position.x,
      y: shouldSnapY ? snappedY : position.y,
    };
  };

  return { snapToQuadrant };
}