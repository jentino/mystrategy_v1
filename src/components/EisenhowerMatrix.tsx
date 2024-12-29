import React from 'react';
import { QuadrantSection } from './QuadrantSection';
import type { Position } from '../types';

interface EisenhowerMatrixProps {
  onSnapPosition: (position: Position) => Position;
}

export function EisenhowerMatrix({ onSnapPosition }: EisenhowerMatrixProps) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full h-full">
      <QuadrantSection
        title="Urgent & Important"
        description="Do First"
        bgColor="bg-red-50"
        borderColor="border-red-200"
      />
      <QuadrantSection
        title="Not Urgent & Important"
        description="Schedule"
        bgColor="bg-blue-50"
        borderColor="border-blue-200"
      />
      <QuadrantSection
        title="Urgent & Not Important"
        description="Delegate"
        bgColor="bg-yellow-50"
        borderColor="border-yellow-200"
      />
      <QuadrantSection
        title="Not Urgent & Not Important"
        description="Eliminate"
        bgColor="bg-gray-50"
        borderColor="border-gray-200"
      />
    </div>
  );
}