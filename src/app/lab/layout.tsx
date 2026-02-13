'use client';

import LabNavbar from '@lab-components/lab-navbar';

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative min-h-screen w-full'>
      <LabNavbar />
      {children}
    </div>
  );
}
