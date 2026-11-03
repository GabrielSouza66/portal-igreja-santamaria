import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          contrast: 'var(--primary-contrast)',
          light: 'var(--primary-light)',
          hover: 'var(--primary-hover)',
          surface: 'var(--primary-surface)',
        },
        bg: {
          secondary: 'var(--background-secondary)',
        },
        text: {
          dark: 'var(--text-dark)',
          muted: 'var(--text-muted)',
          subtle: 'var(--text-subtle)',
        },
        border: {
          DEFAULT: 'var(--border-color)',
          dark: 'var(--border-dark)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['var(--font-heading)', 'var(--font-sans)', 'serif'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(13, 81, 49, 0.05), 0 1px 2px -1px rgba(13, 81, 49, 0.05)',
        'card-hover': '0 10px 25px -5px rgba(13, 81, 49, 0.1), 0 8px 10px -6px rgba(13, 81, 49, 0.06)',
        dropdown: '0 20px 25px -5px rgba(13, 81, 49, 0.1), 0 8px 10px -6px rgba(13, 81, 49, 0.06)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
