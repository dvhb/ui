import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import copy from 'rollup-plugin-copy';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  external: ['react', 'react-dom', 'react-day-picker/DayPickerInput'],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    postcss({
      modules: true,
      extract: true,
      minimize: true,
      sourceMap: true,
    }),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.(tsx|ts)'],
    }),
    commonjs({
      namedExports: {
        'node_modules/react-day-picker/build/index.js': ['DateUtils'],
        'node_modules/react-day-picker/moment/index.js': ['parseDate', 'formatDate'],
        'node_modules/react-dom/index.js': ['createPortal', 'findDOMNode'],
        'node_modules/react-grid-system/build/index.js': ['Row', 'Col'],
      },
    }),
    copy({
      targets: [{ src: 'src/**/*.scss', dest: 'dist' }],
      flatten: false,
      verbose: true,
    }),
  ],
};
