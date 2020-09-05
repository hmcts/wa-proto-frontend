const gulp = require('gulp');
const requireDir = require('require-dir');

requireDir('./gulp', {
  recurse: true,
});

gulp.task('generate-assets',
  gulp.parallel(
    'copy-client-scripts',
  ),
);
