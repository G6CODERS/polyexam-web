import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { HealthClient } from './health-client';

export const metadata: Metadata = {
  title: 'État de l’API — PolyExam',
  description: 'Page de diagnostic local alimentée par MSW.',
};

export default function HealthPage() {
  const mswEnabled =
    process.env.NODE_ENV === 'development' ||
    process.env.NEXT_PUBLIC_MSW_ENABLED === 'true';

  if (!mswEnabled) notFound();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center gap-6 px-6 py-16">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
          Diagnostic
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">État de l’API</h1>
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Cette page est disponible en développement ou lorsque MSW est activé
          pour les tests e2e. Elle ne doit jamais être exposée en production.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm leading-6 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
        <HealthClient />
      </div>
    </main>
  );
}
