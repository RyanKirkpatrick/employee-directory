var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var bundle = require('gulp-bundle-assets');

gulp.task('bundleCSS', function() {
  gulp.src('public/css/*.css')
      .pipe(minifyCss())
      .pipe(concatCss('style.min.css'))
      .pipe(gulp.dest('public/css'))
});

gulp.task('bundle', function () {
	return gulp.src('./bundle.config.js')
		.pipe(bundle())
		.pipe(bundle.results('./'))
		.pipe(gulp.dest('./public/build-assets'));
});
