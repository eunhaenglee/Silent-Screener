import React from 'react';
export function GhostIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={40}
      height={40}
      viewBox="0 0 48 48"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block' }}
    >
      <ellipse cx="24" cy="24" rx="20" ry="20" fill="#b9aaff" opacity="0.7"/>
      <ellipse cx="18" cy="22" rx="2" ry="3" fill="#fff"/>
      <ellipse cx="30" cy="22" rx="2" ry="3" fill="#fff"/>
      <ellipse cx="24" cy="32" rx="6" ry="2" fill="#fff" opacity="0.5"/>
    </svg>
  );
} 