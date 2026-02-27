import React from 'react';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

import SmoothScrolling from '@components/SmoothScrolling';

export const metadata: Metadata = {
  title: 'Mikey Holland',
  description: 'London based Frontend Developer',
};

export default async function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GoogleAnalytics
        gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string}
      />
      <SmoothScrolling>{children}</SmoothScrolling>
    </>
  );
}
