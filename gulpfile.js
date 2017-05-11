var gulp = require('gulp');
var surge = require('gulp-surge');
var imagemin = require('gulp-imagemin');

gulp.task('copy:html', function() {
	return gulp.src(['./demos/**/*'])
	.pipe(gulp.dest('./build'))
});

gulp.task('copy:assets', function() {
	return gulp.src(['./_assets/**'])
	.pipe(gulp.dest('./build/_assets'))
});

gulp.task('default', ['copy:html', 'copy:assets'], function() {
	return surge({
    project: './build',         // Path to your static build directory
    domain: 'performance-kit.surge.sh'  // Your domain or Surge subdomain
  });
});


gulp.task('imagemin', function() {
	return gulp.src('./_assets/images/**/*.jpg')
				.pipe(imagemin({
					optimizationLevel: 7
				}))
				.pipe(gulp.dest('./build/_assets/images'));
});
