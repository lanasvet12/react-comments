var gulp = require('gulp');
var react = require('gulp-react');
var server = require('./server');

var jsxSrc = './public/js/*.jsx';
gulp.task('jsx', function () {
	return gulp.src(jsxSrc)
		.pipe(react())
		.pipe(gulp.dest('./public/build/'));
});

gulp.task('serve', function () {
	server.start();	
});

gulp.task('default', ['serve'], function () {
	gulp.watch(jsxSrc, ['jsx']);
});