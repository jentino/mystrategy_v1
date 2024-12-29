import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { useDragging } from '../hooks/useDragging';
import { EditableContent } from './EditableContent';
import type { Position, Size } from '../types';

interface DraggableDivProps {
  onDelete: () => void;
  initialPosition: Position;
  containerRef: React.RefObject<HTMLElement>;
}

export function DraggableDiv({ onDelete, initialPosition, containerRef }: DraggableDivProps) {
  const [size, setSize] = useState<Size>({ width: 200, height: 150 });
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<{ startWidth: number; startHeight: number }>({ startWidth: 0, startHeight: 0 });
  const dragStartRef = useRef<Position>({ x: 0, y: 0 });

  const { position, startDragging } = useDragging(initialPosition, size, containerRef);

  const startResizing = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    resizeRef.current = { startWidth: size.width, startHeight: size.height };
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      const maxWidth = container.width - position.x;
      const maxHeight = container.height - position.y;

      const newWidth = resizeRef.current.startWidth + (e.clientX - dragStartRef.current.x);
      const newHeight = resizeRef.current.startHeight + (e.clientY - dragStartRef.current.y);

      setSize({
        width: Math.max(100, Math.min(maxWidth, newWidth)),
        height: Math.max(100, Math.min(maxHeight, newHeight)),
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, containerRef, position]);

  return (
    <div
      className="absolute bg-white rounded-lg shadow-lg overflow-hidden"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
    >
      <div
        className="bg-gray-100 px-4 py-2 cursor-move flex justify-between items-center"
        onMouseDown={startDragging}
      >
        <span className="text-sm font-medium text-gray-700">Drag me</span>
        <button
          onClick={onDelete}
          className="text-gray-500 hover:text-red-500 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      <div className="p-4">
        <EditableContent initialContent="Click to edit this content" />
      </div>
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
        onMouseDown={startResizing}
      >
        <div className="absolute bottom-1 right-1 w-2 h-2 bg-gray-400 rounded-sm" />
      </div>
    </div>
  );
}