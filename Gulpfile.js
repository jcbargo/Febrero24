// Import Gulp and Plumber
var gulp = require('gulp');
var plumber = require('gulp-plumber'); // Plumber will make sure if Gulp is not crashing when CSS compilation prints errors.

// Images movement tast
gulp.task('images',function() {
    gulp.src([
      './src/images/*.svg',
  ],  {base: './src/'})
        .pipe(gulp.dest('./dist'));
});

// SASS compilation task
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
gulp.task('sass', function () {
    gulp.src('./src/sass/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(cssnano())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist'));
});

// HTML generation task
var fs = require("fs");
var inject = require('gulp-inject-string');
gulp.task('html', function () {
    var cssContent = fs.readFileSync("./dist/main.css", "utf8");
    gulp.src("./src/html/*.html")
        .pipe(inject.after('style amp-custom>', cssContent))
        .pipe(gulp.dest("./dist"))
        .pipe(reload({
            stream: true
        }));
});

// BrowserSync serve task
var browser = require('browser-sync');
var reload = browser.reload;
gulp.task('serve', function() {
    browser({
        port: 4500,
        open: false,
        ghostMode: false,
        server: {
            baseDir: './dist'
        }
    });
});

// Watch task
gulp.task('watch', function() {
    gulp.watch("./src/sass/**", ['sass']);
    gulp.watch("./dist/*.css", ['html']);
    gulp.watch("./src/html/*.html", ['html']);
});

// Default task
gulp.task('default', ['images', 'sass', 'html', 'watch', 'serve']);
