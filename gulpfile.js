const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
TOP LEVEL FUNCTIONS:
- gulp.task - define tasks
- gulp.src - point to files to use
- gulp.dest - point to folder to output
- gulp.watch - watch files and folders for changes
*/

// logs message (run: gulp message)
gulp.task('message', () => {
  return console.log('Gulp is running...');
});

// copy all HTML files
// auto creates 'dist' folder
gulp.task('copyHTML', () => {
  gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

// optimize images
gulp.task('imageMin', () => {
  gulp
    .src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

// Compile Sass
gulp.task('sass', () => {
  gulp
    .src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

// Scripts
gulp.task('scripts', () => {
  gulp
    .src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// sets the default tasks (run: gulp)
gulp.task(
  'default',
  gulp.parallel(['message', 'copyHTML', 'imageMin', 'sass', 'scripts'])
);

// watch (run: gulp watch)
// will 'watch' the specified files and run the corresponding tasks when changes are detected
gulp.task('watch', function() {
  gulp.watch('src/js/*.js', gulp.series('scripts'));
  gulp.watch('src/images/*', gulp.series('imageMin'));
  gulp.watch('src/sass/*.scss', gulp.series('sass'));
  gulp.watch('src/*.html', gulp.series('copyHTML'));
});
