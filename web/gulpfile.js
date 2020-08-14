/**
 * @file
 */

var gulp = require('gulp'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  eslint = require('gulp-eslint'),
  sassLint = require('gulp-sass-lint'),
  sassGlob = require('gulp-sass-glob');

gulp.task('sass', function () {
  gulp.src('./themes/indra/scss/**/*.scss')
    .pipe(sassLint({
      options: {
        configFile: '../.sass-lint.yml'
      }
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./themes/indra/css'));
});

gulp.task('eslint', function () {
  gulp.src(['./js/*.js'])
    .pipe(eslint())
    .pipe(eslint.formatEach('compact', process.stderr));
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('./themes/indra/scss/**/*.scss', ['sass']);
  gulp.watch('./themes/indra/js/**/*.js', ['eslint']);
  gulp.watch(['./themes/indra/css/style.css', './**/*.html.twig', './themes/indra/js/*.js'], function (files) {
    livereload.changed(files)
  });
});

gulp.task('default', ['sass']);
