var gulp = require('gulp');
var connect = require('gulp-connect');
var mocha = require('gulp-mocha');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('serve', function() {
  return connect.server({
    root: 'dist',
    port : 5220,
    livereload: true
  });
});

gulp.task('script', function() {
	browserify({
		entries: ['./src/clooca.js']
	})
	.bundle()
	.pipe(source('clooca-editor-framework.js'))
	.pipe(buffer())
	.pipe(uglify())
	.pipe(gulp.dest("./dist/"))
});

gulp.task('watch',function(){
  gulp.watch(["src/**/*.js"],["script"]);
});

gulp.task('default',
  ['script',
  'serve',
  'watch']);
