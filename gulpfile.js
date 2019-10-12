var gulp = require('gulp');
var run = require('gulp-run-command').default;
var tar = require('gulp-tar');
var path = require('path');
var tap = require('gulp-tap');
var gzip = require('gulp-gzip');
var chmod = require('gulp-chmod');

gulp.task('clean', gulp.series(run('rm -rf dist')));

gulp.task('build', gulp.series(['clean'], 
  run('build --tasks linux-x86,linux-x64 --mirror https://dl.nwjs.io/ .')));

gulp.task('chmod', gulp.series(['build'], function () {
  gulp.src('dist/*/todoist')
  .pipe(tap(function(file, t) {
    // gulp.src('dist/' + path.basename(file.path) + '/**/*')
    gulp.src(file.path)
      .pipe(chmod(0o777))
      .pipe(gulp.dest(path.dirname(file.path)))
  }))
    // .pipe(chmod(0o755))
    // .pipe(gulp.dest('dist'))
}));

gulp.task('tar', gulp.series(['chmod'], function () {
  gulp.src('dist/*')
    .pipe(tap(function(file, t) {
      gulp.src('dist/' + path.basename(file.path) + '/**/*')
        .pipe(tar(path.basename(file.path) + '.tar'))
        .pipe(gzip())
        .pipe(gulp.dest('tar'));
    }))
}));

gulp.task('package', gulp.series(['tar']));

gulp.task('start:x86', gulp.series(run('run --x86 --mirror https://dl.nwjs.io/ .')));

gulp.task('start:x64', gulp.series(run('run --x64 --mirror https://dl.nwjs.io/ .')));

gulp.task('start', gulp.series(['start:x64']));