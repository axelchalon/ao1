var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var del = require('del');

// BrowserSync
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('scss', function () {
	gulp.src('src/scss/app.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest('dist/css/'))
		.pipe(browserSync.stream());
});

gulp.task('nunjucks', function () {
	nunjucksRender.nunjucks.configure(['src/templates/']);
	return gulp.src('src/templates/*.html')
		.pipe(del('dist/*.html'))
		.pipe(plumber())
		.pipe(nunjucksRender())
		.pipe(gulp.dest('dist/'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('watch', function ()  {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	});

	gulp.watch("src/templates/*.html", ['nunjucks']);
	gulp.watch("src/scss/**/*.scss", ['scss']);
});