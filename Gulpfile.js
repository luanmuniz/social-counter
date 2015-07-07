'use strict';

var gulp = require('gulp'),
	jscs = require('gulp-jscs'),
	jshint = require('gulp-jshint'),
	duration = require('gulp-duration'),
	nodeunit = require('gulp-nodeunit');

gulp.task('test', function() {
	return gulp.src([ './lib/*.js', './index.js' ])
		.pipe(jscs({
			configPath: './.jscsrc'
		}))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(duration('Testing duration: '));
});

gulp.task('nodeunit', function () {
    return gulp.src(['tests/test-*.js'], { read: false })
    	.pipe(nodeunit());
});

gulp.task('test-full', ['test', 'nodeunit']);