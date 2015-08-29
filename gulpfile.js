var gulp = require('gulp');
var react = require('gulp-react');

var jsxSrc = './public/js/*.js';
gulp.task('jsx', function () {
	return gulp.src(jsxSrc)
		.pipe(react())
		.pipe(gulp.dest('./public/build/'));
});

gulp.task('default', function () {
	gulp.watch(jsxSrc, ['jsx']);
});