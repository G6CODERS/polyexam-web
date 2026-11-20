export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center gap-8 px-6 py-16">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
          G6CODERS
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          PolyExam v2
        </h1>
        <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Client web étudiant pour les épreuves passées, corrections, tutoriels
          et abonnements à Polytech Douala.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm leading-6 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
        <p className="font-medium text-zinc-950 dark:text-zinc-50">
          État du socle
        </p>
        <p className="mt-2">
          Les rails de collaboration sont prêts. Les écrans produit,
          l’authentification et le catalogue ne sont volontairement pas encore
          construits. Le contrat d’API public se trouve dans{' '}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-900">
            contracts/public.openapi.yaml
          </code>
          .
        </p>
        <p className="mt-3">
          Le backend et le panneau d’administration sont privés dans{' '}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-900">
            G6CODERS/polyexam-api
          </code>
          .
        </p>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <a
          className="rounded-full bg-emerald-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-emerald-700"
          href="https://github.com/G6CODERS/polyexam-web/blob/main/CONTRIBUTING.md"
        >
          Contribuer
        </a>
        <a
          className="rounded-full border border-zinc-300 px-5 py-2.5 font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
          href="https://github.com/G6CODERS/polyexam-web/blob/main/docs/index.md"
        >
          Documentation
        </a>
      </div>
    </main>
  );
}
