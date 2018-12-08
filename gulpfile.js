var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var autoperfixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src('./app/styles/scss/**/*.scss')
    .pipe(autoperfixer())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

// 监视 Sass 文件的改动，如果发生变更，运行 'sass' 任务，并且重载文件
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
    open: true
  });

  gulp.watch('app/styles/scss/*.scss', ['sass'], reload);
  gulp.watch(['*.html', 'app/css/**/*.css', 'app/scripts/**/*.js'], {cwd: 'app'}, reload);
});

gulp.task('default', ['serve']);