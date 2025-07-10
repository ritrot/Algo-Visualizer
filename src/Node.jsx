import React from 'react';

const Node = ({ node, onClick }) => {
  const { isStart, isEnd, isVisited, isPath, isWall } = node;

  let bg = '#1e293b'; // Default background
  let shadow = 'none';

  if (isWall) {
    bg = '#7c3aed'; // 🧱 Wall: purple-600
    shadow = '0 0 6px rgba(124, 58, 237, 0.7)';
  } else if (isStart) {
    bg = '#14b8a6'; // Start: teal-500
    shadow = '0 0 6px rgba(20, 184, 166, 0.7)';
  } else if (isEnd) {
    bg = '#f43f5e'; // End: rose-500
    shadow = '0 0 6px rgba(244, 63, 94, 0.7)';
  } else if (isPath) {
    bg = '#facc15'; // Path: yellow-400
    shadow = '0 0 12px rgba(234, 179, 8, 0.9)';
  } else if (isVisited) {
    bg = '#3b82f6'; // Visited: blue-500
    shadow = '0 0 4px rgba(59, 130, 246, 0.6)';
  }

  return (
    <div
      onClick={onClick}
      style={{
        width: 20,
        height: 20,
        margin: 1,
        borderRadius: 3,
        backgroundColor: bg,
        boxShadow: shadow,
        border: '1px solid #334155', // Outline
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
      }}
    />
  );
};

export default Node;
