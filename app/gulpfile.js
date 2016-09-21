var gulp = require('gulp'),
	// clean = require('gulp-clean'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssmin = require('gulp-clean-css'),
	usemin = require('gulp-usemin'),
	uglify = require('gulp-uglify'),
	htmlmin = require('gulp-htmlmin'),
  gulpSequence = require('gulp-sequence'); 

gulp.task('server', function() {
  connect.server({
    root: './',
    livereload: true
  });
});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['> 20%'],
      cascade: false
    }))
    .pipe(gulp.dest('./css/'));
});

gulp.task('usemin', function() {
  return gulp.src('./index.html')
    .pipe(usemin({
      css: [ cssmin() ],
      html: [ htmlmin() ],
      js: [ uglify() ]
      // inlinejs: [ uglify() ],
      // inlinecss: [ cssmin(), 'concat' ]
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('reload', function() {
  gulp.src('./**/*')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch( './sass/**/*.scss', ['sass']);
  // gulp.watch( './**/*', ['reload']);
});

gulp.task('default', gulpSequence( 'sass', 'server', 'reload', 'watch'));
gulp.task('build', gulpSequence( 'sass', 'usemin'));