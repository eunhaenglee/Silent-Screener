// components/ui/GlassCard.tsx
import React, { ReactNode } from 'react';

type Props = { children: ReactNode };

export default function GlassCard({ children }: Props) {
  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-8 w-full max-w-xl border-0">
      {children}
    </div>
  );
}
