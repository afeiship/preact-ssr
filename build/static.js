(function () {

  'use strict';

  const gulp = require('gulp');
  const argv = require('yargs').argv;
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
  });

  gulp.task('static', function () {
    return gulp.src('src/app/static/**/*')
      .pipe(gulp.dest('dist/public/static'))
  });


}());