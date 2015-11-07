var gulp        = require('gulp');
// var nunjucksRender = require('gulp-nunjucks-render');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');

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
  // nunjucksRender.nunjucks.configure(['src/templates/']); 
  return gulp.src('src/templates/*.html')
    .pipe(plumber())
    // .pipe(nunjucksRender()) pas besoin d'injecter les variables pour l'instant (en vrai je pense qu'on n'en aura pas besoin, suffit de ajax des json, à voir)
    .pipe(gulp.dest('dist/templates'))
    .pipe(reload({stream: true}));
});

gulp.task('watch', function () {
  browserSync.init({ server: { baseDir: 'dist' } });

  gulp.watch("src/templates/*.html", ['nunjucks']);
  gulp.watch("src/scss/**/*.scss", ['scss']);
});