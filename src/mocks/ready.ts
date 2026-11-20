let resolveReady: () => void = () => undefined;

/**
 * Resolves when the browser MSW worker has started (or failed to start).
 * Consumers that need mocked data should await this before fetching.
 */
export const mswReady = new Promise<void>((resolve) => {
  resolveReady = resolve;
});

export function markMswReady() {
  resolveReady();
}
