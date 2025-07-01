// components/ui/Button.tsx
import React from 'react';

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function Button({
  onClick,
  children,
  className = '',
}: ButtonProps) {
  return (
    <button
      type="button"  // << 반드시 추가!
      onClick={onClick}
      className="bg-[var(--color-btn)] text-[var(--color-text-main)] rounded-full px-6 py-2 font-semibold shadow-sm hover:bg-[var(--color-btn-hover)] transition-all"
    >
      {children}
    </button>
  );
}
