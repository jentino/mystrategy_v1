import React from 'react';
import { PlusSquare, LayoutGrid } from 'lucide-react';

interface SidebarProps {
  onCreateDiv: () => void;
  canCreateDiv: boolean;
}

export function Sidebar({ onCreateDiv, canCreateDiv }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <LayoutGrid className="text-green-600" />
        <h2 className="font-semibold text-gray-800">Eisenhower Matrix</h2>
      </div>
      
      <button
        onClick={onCreateDiv}
        disabled={canCreateDiv}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          canCreateDiv 
            ? 'bg-emerald-500 text-white cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        <PlusSquare size={20} />
        <span>{canCreateDiv ? 'Click to Place Task' : 'Create New Task'}</span>
      </button>
    </div>
  );
}