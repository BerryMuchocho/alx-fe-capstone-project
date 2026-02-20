import React from 'react';

function ProgressBar({ current = 0, total = 1 }) {
  const percent = Math.min(100, Math.round((current / total) * 100));

  return (
    <div className="w-full">
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
