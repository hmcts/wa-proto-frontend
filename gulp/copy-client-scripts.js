const gulp = require('gulp');

gulp.task('copy-client-scripts', async () => {
  return await gulp.src([
    'src/main/client/**/*.js',
  ])
    .pipe(gulp.dest('src/main/public/'));
});
