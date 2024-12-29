import React from 'react';
import { Target } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center gap-2">
        <Target className="h-7 w-7 text-white" />
        <h1 className="text-2xl font-bold text-white">MyStrategy</h1>
      </div>
    </header>
  );
}