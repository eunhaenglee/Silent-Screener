import React from 'react';
export default function TextArea({ value, onChange, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      {...props}
      className={
        'w-full bg-[var(--color-btn)] border-2 border-[var(--color-primary)] rounded-xl p-3 text-[var(--color-text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:shadow-lg transition-all ' +
        (props.className || '')
      }
    />
  );
}
  