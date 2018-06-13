var gulp = require('gulp');
var concat = require('gulp-concat');
var header = require('gulp-header');
var connect = require("gulp-connect");
//var less = require("gulp-less");
var sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');
//var ejs = require("gulp-ejs");
var uglify = require('gulp-uglify');
var ext_replace = require('gulp-ext-replace');
var cssmin = require('gulp-cssmin');

var pkg = require("./package.json");

var banner =
    "/** \n\
* ProjectName V" + pkg.version + " \n\
* By mao\n\
* \n \
*/\n";

gulp.task('js', function (cb) {

    count = 0;
    var end = function () {
        count++;
        if (count >= 3) cb();
    };

    gulp.src([
        './assets/js/plugin.js'
    ])
        .pipe(concat({ path: 'plugin.js' }))
        .pipe(gulp.dest('./public/javascripts/'))
        .on("end", end);


    gulp.src([
        'assets/js/vendor/jquery.min.js',
        'assets/js/vendor/bootstrap.min.js',
        'assets/js/vendor/masonry.min.js',
        'assets/js/vendor/simplemde.min.js',
        'assets/js/vendor/analytics.js',

    ])
        .pipe(concat({ path: 'script.js' }))
        .pipe(header(banner))
        .pipe(gulp.dest('./public/javascripts/'))
        .on("end", end);


});

gulp.task('uglify', ["js"], function () {
    return gulp.src(['./public/javascripts/*.js', '!./public/javascripts/*.min.js'])
        .pipe(uglify({
            preserveComments: "license"
        }))
        .pipe(ext_replace('.min.js'))
        .pipe(gulp.dest('./public/javascripts'));
});


gulp.task('sass', function () {
    return gulp.src(['./assets/sass/base.scss','./assets/sass/main.scss'])
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(concat({ path: 'style.css' }))
        .pipe(header(banner))
        .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('cssmin', ["sass"], function () {
    gulp.src(['./public/stylesheets/*.css', '!./public/stylesheets/*.min.css'])
        .pipe(cssmin())
        .pipe(header(banner))
        .pipe(ext_replace('.min.css'))
        .pipe(gulp.dest('./public/stylesheets/'));
});


gulp.task('copy', function () {
    gulp.src(['node_modules/bootstrap-sass/assets/fonts/bootstrap/*.*'])
        .pipe(gulp.dest('public/fonts/bootstrap/'));

    // gulp.src(['./images/*.*'])
    //   .pipe(gulp.dest('./dist/images/'));

    // gulp.src(['./src/icons/*.*'])
    //     .pipe(gulp.dest('./public/images/icons/'));

    gulp.src(['node_modules/font-awesome/fonts/*.*'])
        .pipe(gulp.dest('public/fonts/font-awesome/'));
});

gulp.task('watch', function () {
    gulp.watch('assets/js/**/*.js', ['js']);
    // gulp.watch('src/less/**/*.less', ['less']);
    gulp.watch('assets/sass/**/*.sass', ['sass']);
    // gulp.watch('pages/*.html', ['ejs']);
    gulp.watch('pages/css/*.css', ['copy']);
});

gulp.task('server', function () {
    connect.server();
});
gulp.task("default", ['watch']);
gulp.task("build", ['uglify', 'cssmin', 'copy']);