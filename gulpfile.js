const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('moveAssets', () =>
	gulp.src('./app/assets/**/*')
		.pipe(gulp.dest('./dist/public/assets')));

gulp.task('build:cpServer', () =>
	gulp.src('./app/**/*.{js,ejs,json}')
		.pipe(gulp.dest('./dist/server-build')));

gulp.task('build', () => runSequence('moveAssets', 'build:cpServer'));
