import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      href,
      external,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md select-none active:scale-[0.98]';

    const variants = {
      primary:
        'bg-[#0D5131] text-white hover:bg-[#19593B] shadow-sm hover:shadow',
      secondary:
        'bg-[#F6F8F6] text-[#0D5131] hover:bg-[#E7F1EC] border border-[#E2E9E4]',
      outline:
        'border border-[#0D5131] text-[#0D5131] bg-transparent hover:bg-[#F0F6F2]',
      ghost:
        'text-[#0D5131] hover:bg-[#F0F6F2] hover:text-[#19593B]',
      white:
        'bg-white text-[#0D5131] hover:bg-[#F6F8F6] shadow-sm font-semibold',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[36px]',
      md: 'text-sm px-4 py-2 gap-2 min-h-[42px]',
      lg: 'text-base px-6 py-3 gap-2.5 min-h-[48px]',
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            className={classes}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

