var gulp = require('gulp');
var run = require('gulp-run-command').default;
var tar = require('gulp-tar');
var path = require('path');
var tap = require('gulp-tap');
var gzip = require('gulp-gzip');
var chmod = require('gulp-chmod');

gulp.task('clean', run('rm -rf dist'));

gulp.task('build', ['clean'], 
  run('build --tasks linux-x86,linux-x64 --mirror https://dl.nwjs.io/ .'));

gulp.task('chmod', ['build'], function () {
  gulp.src('dist/*/todoist')
  .pipe(tap(function(file, t) {
    // gulp.src('dist/' + path.basename(file.path) + '/**/*')
    gulp.src(file.path)
      .pipe(chmod(0o777))
      .pipe(gulp.dest(path.dirname(file.path)))
  }))
    // .pipe(chmod(0o755))
    // .pipe(gulp.dest('dist'))
});

gulp.task('tar', ['chmod'], function () {
  gulp.src('dist/*')
    .pipe(tap(function(file, t) {
      gulp.src('dist/' + path.basename(file.path) + '/**/*')
        .pipe(tar(path.basename(file.path) + '.tar'))
        .pipe(gzip())
        .pipe(gulp.dest('tar'));
    }))
});

gulp.task('package', ['tar']);

gulp.task('start:x86', run('run --x86 --mirror https://dl.nwjs.io/ .'));

gulp.task('start:x64', run('run --x64 --mirror https://dl.nwjs.io/ .'));

gulp.task('start', ['start:x64']);