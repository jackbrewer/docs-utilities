import * as esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';

const isDevelopment = process.argv[2] === '--dev';

let ctx = await esbuild.context({
  entryPoints: ['src/content.ts', 'src/popup.ts'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  target: ['esnext'],
  allowOverwrite: true,
  minify: !isDevelopment,
  // Allow importing CSS files as text
  // TODO: minification: https://stackoverflow.com/questions/69088135/esbuild-how-to-use-loader-css-text-in-combination-with-minify-tr
  loader: { '.css': 'text' },
  plugins: [
    copy({
      resolveFrom: 'cwd',
      assets: [
        {
          from: ['src/assets/*'],
          to: ['dist/'],
          watch: true,
        },
      ],
    }),
  ],
});

await ctx.watch();
