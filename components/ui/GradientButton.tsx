// components/ui/GradientButton.tsx
import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  outline?: boolean;
};

export default function GradientButton({
  children,
  outline = false,
  className = '',
  ...rest
}: Props) {
  const base = 'px-6 py-3 rounded-full font-medium transition';
  const solid =
    'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-[var(--color-text-main)] hover:from-[var(--color-accent)] hover:to-[var(--color-primary)]';
  const ghost =
    'bg-transparent text-white border border-white/50 hover:bg-white/10';

  return (
    <button
      {...rest}
      className={`${base} ${outline ? ghost : solid} ${className}`}
    >
      {children}
    </button>
  );
}
