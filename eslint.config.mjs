import next from 'eslint-config-next';

const config = [
  ...next,
  {
    rules: {
      // Images are pre-optimised WebP with explicit srcset/sizes (images.unoptimized = true).
      '@next/next/no-img-element': 'off',
    },
  },
  { ignores: ['.next/**', 'node_modules/**', 'public/**', 'source-assets/**', 'docs/**', 'scripts/**'] },
];

export default config;
