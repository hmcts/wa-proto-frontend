const gulp = require('gulp');

gulp.task('restore-webpack-originals', async () => {
  return await gulp.src([
    'src/main/views/webpack/originals/**/*.njk',
  ])
    .pipe(gulp.dest('src/main/views/webpack/'));
});
