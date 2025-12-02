'use client';

import LabNavbar from '@lab-components/lab-navbar';

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-background min-h-screen w-full relative'>
      <LabNavbar />

      <main className='relative h-full w-full'>{children}</main>
    </div>
  );
}
