(function () {

  'use strict';

  var gulp = require('gulp');
  var argv = require('yargs').argv;
  var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
  });

  gulp.task('rev', function () {
    return gulp.src('./dist/public/**/*.*')
      .pipe($.rev())
      .pipe(gulp.dest('dist/public'))
      .pipe($.rev.manifest())
      .pipe(gulp.dest('dist/public'))
  });


}());