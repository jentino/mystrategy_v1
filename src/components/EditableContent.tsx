import React, { useState } from 'react';

interface EditableContentProps {
  initialContent: string;
}

export function EditableContent({ initialContent }: EditableContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);

  return (
    <div className="relative">
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            autoFocus
          />
          <button
            onClick={() => setIsEditing(false)}
            className="absolute -top-2 -right-2 px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="p-2 rounded-md hover:bg-gray-50 cursor-pointer"
        >
          {content || 'Click to edit'}
        </div>
      )}
    </div>
  );
}