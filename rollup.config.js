import minifyHTML from 'rollup-plugin-minify-html-literals'
import resolve from '@rollup/plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import commonjs from 'rollup-plugin-commonjs'
import replace from '@rollup/plugin-replace'
import summary from 'rollup-plugin-summary'
import html from '@web/rollup-plugin-html'
import dev from 'rollup-plugin-dev'
import fg from 'fast-glob'

export default [
  {
    plugins: [
      dev({ port: process.env.PORT || 3000 }),
      livereload('build'),
      replace({
        'process.env.NODE_ENV': process.env.NODE_ENV,
        'process.env.LAYER0_PREFETCH_HEADER_VALUE': '"1"',
        'process.env.LAYER0_PREFETCH_CACHE_NAME': '"prefetch"',
      }),
      html({
        input: './src/index.html',
      }),
      resolve(),
      minifyHTML(),
      terser({
        ecma: 2020,
        module: true,
        warnings: true,
      }),
      summary(),
      commonjs({
        namedExports: {
          '@layer0/prefetch': ['Prefetcher'],
        },
      }),
      {
        name: 'watch-external',
        async buildStart() {
          const files = await fg('src/**/*')
          for (let file of files) {
            this.addWatchFile(file)
          }
        },
      },
    ],
    output: {
      dir: 'build',
      entryFileNames: '[name]-[hash].js',
    },
    preserveEntrySignatures: 'strict',
  },
  {
    input: './src/service-worker.js',
    plugins: [
      replace({
        'process.env.NODE_ENV': '"production"',
        'process.env.LAYER0_PREFETCH_HEADER_VALUE': '"1"',
        'process.env.LAYER0_PREFETCH_CACHE_NAME': '"prefetch"',
      }),
      resolve(),
      minifyHTML(),
      terser({
        ecma: 2020,
        module: true,
        warnings: true,
      }),
      summary(),
      commonjs({
        namedExports: {
          '@layer0/prefetch': ['Prefetcher'],
        },
      }),
    ],
    output: {
      dir: 'build',
    },
    preserveEntrySignatures: 'strict',
  },
]
