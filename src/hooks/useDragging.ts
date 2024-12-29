import { useState, useRef, useEffect } from 'react';
import type { Position, Size } from '../types';

interface Bounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export function useDragging(
  initialPosition: Position,
  size: Size,
  containerRef: React.RefObject<HTMLElement>
) {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      const bounds: Bounds = {
        left: 0,
        top: 0,
        right: container.width - size.width,
        bottom: container.height - size.height,
      };

      const deltaX = e.clientX - dragRef.current.x;
      const deltaY = e.clientY - dragRef.current.y;

      setPosition(prev => ({
        x: Math.max(bounds.left, Math.min(bounds.right, prev.x + deltaX)),
        y: Math.max(bounds.top, Math.min(bounds.bottom, prev.y + deltaY)),
      }));

      dragRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, size, containerRef]);

  const startDragging = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current = { x: e.clientX, y: e.clientY };
  };

  return { position, startDragging };
}