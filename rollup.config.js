import babel from 'rollup-plugin-babel';
// import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'liang-barsky.js',
  dest: 'liang-barsky.min.js',
  format: 'iife',
  sourceMap: 'inline',
  moduleName: 'window',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    // eslint({
    //   exclude: [
    //     'glpk.min.js',
    //     'lalolib.js'
    //     ],
    // }),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ],
};