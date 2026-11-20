import type { ReactNode } from 'react';

/**
 * Production replacement for MSWProvider. Turbopack aliases
 * `@/mocks/provider` to this module when MSW is disabled so MSW and Faker
 * never enter the production bundle.
 */
export function MSWProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
