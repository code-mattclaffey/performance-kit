var gulp = require('gulp');
var surge = require('gulp-surge');

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
