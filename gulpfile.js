'use strict';

var gulp = require('gulp');
var csslint = require('gulp-csslint');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var prefix = require('gulp-autoprefixer');
var karma = require('gulp-karma');
var shell = require('gulp-shell');

gulp.task('jshint', function() {
  return gulp.src(['gulpFile.js', 'app/js/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('csslint', function() {
  return gulp.src(['app/css/**/*.css'])
    .pipe(prefix('last 3 version', '> 1%',
        {
            cascade: true
        }
    ))
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.reporter());
});

gulp.task('connect', function() {
  connect.server({
    root: 'src',
    port: 8080,
    livereload: true
  });
});

gulp.task('connect-karma', function() {
  connect.server({
    root: 'app',
    port: 8000
  });
});

gulp.task('connect-ptor', function() {
  connect.server({
    root: 'app',
    port: 8000
  });
});

gulp.task('reload', function () {
  return gulp.src(['app/**/*.html', '!app/lib/**'])
    .pipe(connect.reload());
});

gulp.task('karma-end2end', function() {
  // Be sure to return the stream
  return gulp.src('')
    .pipe(karma({
      configFile: 'config/karma-e2e.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('watch', function () {
   gulp.watch([
        'app/css/*.css',
       ], ['csslint', 'reload']);

    gulp.watch([
        'gulpFile.js',
        'app/js/**/*.js'
    ], ['jshint', 'reload']);

    gulp.watch([
        'app/**/*.html',
        '!app/lib/**'
    ], ['reload']);
});

gulp.task('karma-unit', function() {
  // Be sure to return the stream
  return gulp.src('dummyPath')
    .pipe(karma({
      configFile: 'config/karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});
gulp.task('ptor-end2end', shell.task([
  './node_modules/protractor/bin/protractor config/protractor-conf.js'
]));

gulp.task('lint', ['jshint', 'csslint']);
gulp.task('default', ['lint', 'connect', 'watch']);
gulp.task('karma', ['connect-karma', 'karma-end2end']);
gulp.task('protractor', ['connect-ptor', 'ptor-end2end']);
gulp.task('build', shell.task([
  'jspm bundle-sfx app dist/app.min.js --minify --inject --skip-source-maps',
  'serve dist/ --port 8080'
]));
