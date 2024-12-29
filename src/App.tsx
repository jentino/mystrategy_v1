import React, { useRef } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DraggableDiv } from './components/DraggableDiv';
import { EisenhowerMatrix } from './components/EisenhowerMatrix';
import { useDivs } from './hooks/useDivs';
import { useSnapToGrid } from './hooks/useSnapToGrid';

export default function App() {
  const [canCreateDiv, setCanCreateDiv] = React.useState(false);
  const { divs, createDiv, deleteDiv } = useDivs();
  const mainRef = useRef<HTMLElement>(null);
  const { snapToQuadrant } = useSnapToGrid(mainRef);

  const handleToggleCursor = () => {
    setCanCreateDiv(true);
  };

  const handleMainClick = (e: React.MouseEvent) => {
    if (!canCreateDiv) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    createDiv(snapToQuadrant(position));
    setCanCreateDiv(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar onCreateDiv={handleToggleCursor} canCreateDiv={canCreateDiv} />
        <main
          ref={mainRef}
          className="flex-1 relative p-8"
          style={{ cursor: canCreateDiv ? 'crosshair' : 'default' }}
          onClick={handleMainClick}
        >
          <EisenhowerMatrix onSnapPosition={snapToQuadrant} />
          {divs.map(div => (
            <DraggableDiv
              key={div.id}
              initialPosition={div.position}
              onDelete={() => deleteDiv(div.id)}
              containerRef={mainRef}
            />
          ))}
        </main>
      </div>
    </div>
  );
}