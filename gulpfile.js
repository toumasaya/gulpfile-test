var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var del = require('del');
var sass = require('gulp-sass');
var pug = require('gulp-pug');

// =* Development tasks
// ======================================= //

// Browser Sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
});

// Pug
gulp.task('pug', function() {
  return gulp.src('app/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Sass
gulp.task('sass', function() {
  return gulp.src('app/sass/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Watchers
gulp.task('watch', ['browserSync', 'sass', 'pug'],function() {
  gulp.watch('app/sass/*.sass', ['sass']);
  gulp.watch('app/pug/*.pug', ['pug']);
});

// Clean dist
gulp.task('clean:dist', function() {
  return del.sync('dist');
});

// =* Build Sequence
// ======================================= //
gulp.task('build', function() {
  runSequence('clean:dist', ['sass', 'pug'])
});

gulp.task('default', function() {
  runSequence(['sass', 'pug', 'browserSync', 'watch'])
});
