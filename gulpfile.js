var gulp = require('gulp')
var $ = require('gulp-load-plugins')()


exports.default = function() {
  return gulp
  .src('data/images/*.{jpg,png}')
  .pipe(
    $.responsive(
      {
        '*.jpg': {
          width: 1200
        },
        '*.png': {
          width: 1200
        },
        '*': {
          width: 100,
          rename: { suffix: '-thumbnail' }
        }
      },
      {
        quality: 70,
        progressive: true,
        compressionLevel: 6,
        withMetadata: false,
        errorOnEnlargement: false
      }
    )
  )
  .pipe(gulp.dest('data/images/optimized'))
}