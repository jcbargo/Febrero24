// Import Gulp and Plumber
var gulp = require('gulp');

// fonts movement tast
var rename = require('gulp-rename');
gulp.task('fonts',function() {
    gulp.src([
        './src/css/font-icons/icomoon.eot',
        './src/css/font-icons/icomoon.svg',
        './src/css/font-icons/icomoon.ttf',
        './src/css/font-icons/icomoon.woff'
  ],  {base: './src/'})
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('./dist/fonts'));
});

// SASS compilation task
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
gulp.task('sass', function () {
    gulp.src('./src/css/*.scss')
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
    gulp.watch("./src/css/**", ['sass']);
    gulp.watch("./src/html/**", ['html']);
});

// Default task
gulp.task('default', ['fonts', 'sass', 'html', 'watch', 'serve']);
