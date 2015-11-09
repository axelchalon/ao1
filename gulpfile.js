require('es6-promise').polyfill();

var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var del = require('del');
var concat = require('gulp-concat');




var postcss = require('gulp-postcss');
var processors = [
		require('postcss-mixins'),
		require('postcss-simple-vars'),
		require('postcss-nested'),
		require('cssnano'),
		require('autoprefixer-core')({ browsers: ['last 2 versions', '> 2%'] })
	];

// BrowserSync
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('scss', function () {
	gulp.src('src/scss/app.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(postcss(processors))
		.pipe(gulp.dest('dist/css/'))
		.pipe(browserSync.stream());

	gulp.src('src/scss/dashboard.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(postcss(processors))
		.pipe(gulp.dest('dist/css/'))
		.pipe(browserSync.stream());
});

gulp.task('js', function () {
	gulp.src('src/js/**/*.js')
	.pipe(plumber())
	.pipe(concat('app.js'))
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.stream());
});

gulp.task('nunjucks', function () {
	nunjucksRender.nunjucks.configure(['src/templates/']);
	del.sync('dist/*.html');
	return gulp.src('src/templates/*.html')
		.pipe(plumber())
		.pipe(nunjucksRender())
		.pipe(gulp.dest('dist/'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('watch', function ()  {
	// BrowserSync
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	});

	gulp.watch("src/templates/**/*.html", ['nunjucks']);
	gulp.watch("src/scss/**/*.scss", ['scss']);
	gulp.watch("src/js/**/*.js", ['js']);
});