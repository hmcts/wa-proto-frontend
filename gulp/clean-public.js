const del = require('del');
const gulp = require('gulp');

gulp.task('clean-public', async () => {
  const deletedPaths = await del([
    'src/main/public/',
  ]);
  console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
});
