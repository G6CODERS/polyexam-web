import type { NextConfig } from 'next';

const mswEnabled =
  process.env.NODE_ENV === 'development' ||
  process.env.NEXT_PUBLIC_MSW_ENABLED === 'true';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
    resolveAlias: mswEnabled
      ? undefined
      : {
          '@/mocks/provider': './src/mocks/provider-disabled.tsx',
        },
  },
};

export default nextConfig;
