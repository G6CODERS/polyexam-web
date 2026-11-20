'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const BrowserWorker = dynamic(() => import('./browser-worker'), {
  ssr: false,
});

/**
 * Starts MSW in development or when explicitly enabled for e2e builds.
 * Children render immediately; data fetches that need mocks await `mswReady`.
 * Production builds alias this module to a no-op provider.
 */
export function MSWProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <BrowserWorker />
      {children}
    </>
  );
}
