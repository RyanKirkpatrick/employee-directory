var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function() {
  // place code for your default task here

gulp.src('public/css/*.css')
    .pipe(minifyCss())
    .pipe(concatCss('style.min.css'))
    .pipe(gulp.dest('public/css'))

});