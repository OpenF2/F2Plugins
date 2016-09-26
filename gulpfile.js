var gulp = require('gulp');

var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

var bases = {
 src: './src/',
 dist: 'dist'
};

var paths = {};

// Delete the dist directory
gulp.task('clean', function() {
 console.log('clean task');
 return gulp.src(bases.dist)
 .pipe(clean());
});

// Process scripts and concatenate them into one output file
gulp.task('build', ['clean', 'copy'], function() {
	console.log('scripts task');

 return gulp.src(['./dist/**/*.js'], {base: 'dist'})
 	.pipe(jshint())
  	.pipe(jshint.reporter('default'))
	.pipe(uglify())
	.pipe(rename({ suffix: '.min' }))
 	.pipe(gulp.dest('./dist')); 
});

// Copy all other files to dist directly
gulp.task('copy', ['clean'], function() {
console.log('copy task')
 // Copy files
 return gulp.src(['./src/**/*'], {base: 'src'})
 .pipe(gulp.dest('./dist'));

});

// A development task to run anytime a file changes
gulp.task('watch', function() {
 gulp.watch('src/**/*', ['build']);
});

// Define the default task as a sequence of the above tasks
gulp.task('default', ['clean', 'copy', 'build']);