var gulp = require('gulp');
var reactify = require('reactify');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
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

gulp.task('build', function (){
    var watcher = watchify(browserify({
        entries: ['./public/js/index.jsx'],
        debug: true,
        extensions: ['.jsx'],
        transform: [reactify],
        cache: {},
        packageCache: {},
        fullPaths: true
    }));
    return watcher.on('update', function () {
        watcher
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./public/build/'));
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/build/'));
});

gulp.task('default', ['serve', 'build'], function () {
	
});