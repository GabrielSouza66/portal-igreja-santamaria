import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Painel Administrativo — IPB Santa Maria',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F6F8F6] text-[#17231C]">
      {children}
    </div>
  );
}

