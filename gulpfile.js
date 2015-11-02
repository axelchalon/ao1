var gulp        = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');

// BrowserSync
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('scss', function () {
  gulp.src('client/scss/app.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('app/css/'))
    .pipe(browserSync.stream());
});

gulp.task('nunjucks', function () { 
  nunjucksRender.nunjucks.configure(['client/templates/']); 
  return gulp.src('client/templates/*.html')
    .pipe(plumber())
    .pipe(nunjucksRender())
    .pipe(gulp.dest('app'))
    .pipe(reload({stream: true}));
});

gulp.task('watch', function () {
  browserSync.init({ server: { baseDir: '' } });

  gulp.watch("client/templates/*.html", ['nunjucks']);
  gulp.watch("client/scss/**/*.scss", ['scss']);
});