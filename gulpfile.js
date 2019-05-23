const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

gulp.task('style', () => {
	return gulp
		.src('./sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('style'), () => {
	gulp.watch('sass/**/*.scss', gulp.parallel('style'));

	browserSync.init({
		server: './'
	});
});
