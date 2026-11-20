import { defineConfig } from 'orval';

export default defineConfig({
  polyexam: {
    input: {
      target: './contracts/public.openapi.yaml',
    },
    output: {
      mode: 'single',
      target: './src/lib/api/generated.ts',
      schemas: './src/lib/api/model',
      client: 'fetch',
      formatter: 'prettier',
      mock: {
        generators: [{ type: 'msw', useExamples: true }, { type: 'faker' }],
      },
      // Orval owns this directory, but the nested agent instructions are
      // hand-written and must survive regeneration.
      clean: ['!**/AGENTS.md'],
    },
  },
});
