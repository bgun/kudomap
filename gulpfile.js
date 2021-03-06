'use strict';

var gulp       = require('gulp');
var babel      = require('gulp-babel');
//var babelify   = require('babelify');
var browserify = require('browserify');
var gls        = require('gulp-live-server');
var less       = require('gulp-less');
var source     = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var todo       = require('gulp-todo');

var livereload = gls.new('./server.js');

gulp.task('browserify', ['babel'], function() {
  browserify({
    entries: './build/client.js',
    debug: true
  }).bundle()
    .pipe(source('client-bundle.js'))
    .pipe(gulp.dest('./build/public'));
});

gulp.task('babel', function() {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build'));
});

gulp.task('less', function() {
  gulp.src('less/base.less')
    .pipe(less())
    .pipe(gulp.dest('./build/public'));
});

gulp.task('serve', ['compile'], function() {
  gulp.watch('less/*.less',  ['less']);
  gulp.watch('src/**/*.js',  ['compile']);
  gulp.watch('build/public/*', function(ev) {
    livereload.notify(ev);
  });
  livereload.start();
});

gulp.task('todo', function() {
  gulp.src(['./server.js','./src/**/*.js'])
    .pipe(todo())
    .pipe(gulp.dest('./'));
});

// transform JS and bundle for the client
gulp.task('compile', ['babel',  'browserify']);
// bundle everything
gulp.task('build',   ['compile','less']);
// start dev server
gulp.task('default', ['build',  'serve']);