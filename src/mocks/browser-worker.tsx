'use client';

import { useEffect } from 'react';

import { worker } from './browser';
import { markMswReady } from './ready';

let startPromise: Promise<void> | undefined;

function startWorker() {
  startPromise ??= worker
    .start({
      onUnhandledFrame: 'bypass',
      serviceWorker: { url: '/mockServiceWorker.js' },
    })
    .then(() => undefined)
    .catch((error: unknown) => {
      console.error('Failed to start MSW', error);
    })
    .finally(() => {
      markMswReady();
    });

  return startPromise;
}

/**
 * Client-only module loaded through `next/dynamic` with `ssr: false`.
 * Keeping MSW out of the server/SSR graph also keeps it out of production.
 */
export default function BrowserWorker() {
  useEffect(() => {
    void startWorker();
  }, []);

  return null;
}
