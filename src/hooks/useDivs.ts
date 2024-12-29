import { useState } from 'react';
import type { DivInstance, Position } from '../types';

export function useDivs() {
  const [divs, setDivs] = useState<DivInstance[]>([]);

  const createDiv = (position: Position) => {
    setDivs([...divs, { id: crypto.randomUUID(), position }]);
  };

  const deleteDiv = (id: string) => {
    setDivs(divs.filter(div => div.id !== id));
  };

  return {
    divs,
    createDiv,
    deleteDiv,
  };
}