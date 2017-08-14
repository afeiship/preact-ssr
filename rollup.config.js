const rollup = require('rollup').rollup;
const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const nodeResolve = require('rollup-plugin-node-resolve');
const optimizeJs = require('rollup-plugin-optimize-js');
const replace = require('rollup-plugin-replace');
const uglify = require('rollup-plugin-uglify');


export default {
  entry: './src/entry.js',
  context: 'window',
  plugins: [
    nodeResolve({jsnext: true, browser: true}),
    commonjs(),
    replace({'__CLIENT__': true, 'process.env.NODE_ENV': JSON.stringify('production')}),
    buble({jsx: 'h', objectAssign: 'Object.assign'}),
    uglify(require('./config/uglify')),
    optimizeJs()
  ]
};
