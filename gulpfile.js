const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        },
        browser: 'chrome'
    });
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src('src/sass/*.+(scss|sass)')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream()); 
});
gulp.task('css', function () {
    return gulp.src("src/css/**/*.css")
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream()); 
});

gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
    gulp.watch('src/*.html').on('change', gulp.parallel('html'));
    gulp.watch('src/icons/**/*').on('all', gulp.parallel('icons'));
    gulp.watch('src/img/**/*').on('all', gulp.parallel('img'));
    gulp.watch('src/js/**/*').on('all', gulp.parallel('js'));
    gulp.watch('src/css/**/*').on('all', gulp.parallel('css'));
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream()); 
});

gulp.task('js', function () {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream()); 
});

gulp.task('icons', function () {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest('dist/icons'))
        .pipe(browserSync.stream()); 
});

gulp.task('img', function () {
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream()); 
});

gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'js', 'icons', 'img', 'css', 'fonts'));