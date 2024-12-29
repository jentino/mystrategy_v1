import React from 'react';

interface QuadrantSectionProps {
  title: string;
  description: string;
  bgColor: string;
  borderColor: string;
}

export function QuadrantSection({ title, description, bgColor, borderColor }: QuadrantSectionProps) {
  return (
    <div className={`${bgColor} border-2 ${borderColor} rounded-lg p-4 min-h-[300px]`}>
      <div className="text-center mb-2">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}