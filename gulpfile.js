var gulp = require('gulp');
var del = require('del')
var gutil = require('gulp-util');

var concat = require('gulp-concat');
var haml = require('gulp-haml');
var gulpCopy = require('gulp-copy');
var source = require('vinyl-source-stream');

// var coffee = require('gulp-coffee');

var babel = require('gulp-babel');
var browserify = require('browserify');
var babelify = require('babelify');


gulp.task('clean', function() {
    return del(['./build']);
});

// gulp.task('scripts', ['clean'], function() {
//   return gulp.src('./app/scripts/**/*.jsx')
//     .pipe(concat('app.jsx'))
//     .pipe(gulp.dest('./app'));
// });

// gulp.task('coffee', ['scripts'], function() {
//   return gulp.src('./app/app.coffee')
//     .pipe(coffee({bare: true}).on('error', gutil.log))
//     .pipe(gulp.dest('./build'));
// });

gulp.task('babel', ['clean'], function() {
  return browserify({entries: './app/scripts/index.jsx', extensions: ['.jsx'], debug: true})
    .transform('babelify', {presets: ['react', 'es2015']})
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('templates', ['clean'], function() {
  return gulp.src('./app/index.haml')
    .pipe(haml({
      compiler: 'visionmedia'
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('styles', ['clean'], function() {
  return gulp.src('./app/styles/app.css')
    .pipe(gulpCopy(
      './build', { prefix: 1 }
    ));
});

gulp.task('build', ['clean', 'babel', 'templates', 'styles']);
