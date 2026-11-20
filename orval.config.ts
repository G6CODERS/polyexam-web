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
      clean: true,
    },
  },
});
