var gulp = require('gulp');
var surge = require('gulp-surge');
var imagemin = require('gulp-imagemin');

gulp.task('copy:html', function() {
	return gulp.src(['./demos/**/*'])
	.pipe(gulp.dest('./build'))
});

gulp.task('copy:fonts', function() {
	return gulp.src(['./_assets/fonts/**'])
	.pipe(gulp.dest('./build/_assets/fonts'))
});

gulp.task('copy:images', function() {
	return gulp.src(['./_assets/images/**'])
	.pipe(gulp.dest('./build/_assets/images'))
});

gulp.task('copy:screenshots', function() {
	return gulp.src(['./_assets/screenshots/**'])
	.pipe(gulp.dest('./build/_assets/screenshots'))
});

gulp.task('copy:js', function() {
	return gulp.src(['./_assets/scripts/**'])
	.pipe(gulp.dest('./build/_assets/scripts'))
});

gulp.task('copy:css', function() {
	return gulp.src(['./_assets/css/**'])
	.pipe(gulp.dest('./build/_assets/css'))
});

gulp.task('imagemin', function() {
	return gulp.src('./_assets/images/**/*.jpg')
				.pipe(imagemin())
				.pipe(gulp.dest('./build/_assets/images-compressed'));
});

gulp.task('default', ['copy:html', 'copy:fonts', 'copy:images', 'copy:js', 'copy:css', 'copy:screenshots', 'imagemin'], function() {
	return surge({
    project: './build',         // Path to your static build directory
    domain: 'performance-kit.surge.sh'  // Your domain or Surge subdomain
  });
});

