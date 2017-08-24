(function () {

  'use strict';

  const gulp = require('gulp');
  const argv = require('yargs').argv;
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
  });

  gulp.task('styles', function () {
    return gulp.src('src/app/styles/style.scss')
      .pipe($.sass({outputStyle: 'compressed'}).on('error', $.sass.logError))
      .pipe(gulp.dest('dist/public'));
  });

}());