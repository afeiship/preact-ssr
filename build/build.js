(function () {

  'use strict';

  const path = require('path');
  const gulp = require('gulp');
  const rollup = require('rollup').rollup;
  const buble = require('rollup-plugin-buble');
  const commonjs = require('rollup-plugin-commonjs');
  const json = require('rollup-plugin-json');
  const replace = require('rollup-plugin-replace');
  const uglify = require('rollup-plugin-uglify');
  const nodeResolve = require('rollup-plugin-node-resolve');
  const optimizeJs = require('rollup-plugin-optimize-js');
  const fs = require('fs-extra-promise');
  const sass = require('node-sass').render;
  const {dependencies} = require('../package');

  gulp.task('server', function () {
    return rollup({
      entry: 'src/server/index.js',
      external: Object.keys(dependencies).concat(['fs']),
      plugins: [
        replace({'__CLIENT__': false}),
        json(),
        commonjs({extensions: ['.js', '.json']}),
        buble({jsx: 'h', objectAssign: 'Object.assign'})
      ]
    }).then((bundle) => bundle.write({
      sourceMap: true,
      format: 'cjs',
      dest: 'dist/server.js'
    }));
  });

  gulp.task('client', function () {
    return rollup({
      entry: 'src/app/entry.js',
      context: 'window',
      plugins: [
        nodeResolve({jsnext: true, browser: true}),
        commonjs(),
        replace({'__CLIENT__': true, 'process.env.NODE_ENV': JSON.stringify('production')}),
        buble({jsx: 'h', objectAssign: 'Object.assign'}),
        uglify(require('../uglify')),
        optimizeJs()
      ]
    }).then((bundle) => bundle.write({
      sourceMap: true,
      format: 'iife',
      dest: `dist/public/bundle.js`
    }));
  });


  // tasks
  //   .set('clean', clean)
  //   .set('client', client)
  //   .set('css', css)
  //   .set('copy', copy)
  //   .set('rev', rev)
  //   .set('server', server)
  //   .set('build', () => run('clean')
  //     .then(() => Promise.all([run('client'), run('css'), run('copy'), run('server')]))
  //     .then(() => run('rev'))
  //   )


  gulp.task('build', [
    'clean',
    'client',
    'styles',
    'static',
  ], function () {
    gulp.start([
      'rev',
      'server'
    ])
  });


}());