'use client';

import { useEffect, useState } from 'react';

import { getHealth } from '@/lib/api/generated';
import type { Health } from '@/lib/api/model';
import { mswReady } from '@/mocks/ready';

type State =
  | { status: 'loading' }
  | { status: 'ok'; data: Health }
  | { status: 'error'; message: string };

export function HealthClient() {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    let active = true;

    void (async () => {
      await mswReady;
      if (!active) return;

      const response = await getHealth();
      if (!active) return;

      if (response.status === 200) {
        setState({ status: 'ok', data: response.data });
      } else {
        setState({
          status: 'error',
          message: `HTTP ${response.status}`,
        });
      }
    })().catch((error: unknown) => {
      if (!active) return;
      setState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Erreur inconnue',
      });
    });

    return () => {
      active = false;
    };
  }, []);

  if (state.status === 'loading') {
    return <p role="status">Chargement de l’état de l’API…</p>;
  }

  if (state.status === 'error') {
    return <p role="alert">Erreur : {state.message}</p>;
  }

  return (
    <p role="status">
      API : {state.data.status} ({state.data.service} {state.data.version})
    </p>
  );
}
