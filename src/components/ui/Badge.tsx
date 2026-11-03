import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'success';
}

export function Badge({
  className,
  variant = 'secondary',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    primary: 'bg-[#0D5131] text-white',
    secondary: 'bg-[#E7F1EC] text-[#0D5131]',
    outline: 'border border-[#CAD6CF] text-[#4A5B51]',
    success: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
