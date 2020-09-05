const del = require('del');
const gulp = require('gulp');

gulp.task('clean', (done) => {
  return del(['/src/main/public'], done);
});
