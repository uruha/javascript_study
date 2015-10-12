var gulp = require("gulp");

var build = require('browserify');
var babel = require('babelify');
var source = require('vinyl-source-stream');

var compass = require("gulp-compass");
var autoprefixer = require("gulp-autoprefixer");

var browser = require("browser-sync");

var plumber = require("gulp-plumber");
var notify = require('gulp-notify');
var handleError = require('./handleError.js');

gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('build', function() {
    var bundler = build('./src/dev.js', {debug: true});
      return bundler
        .transform(babel)
        .bundle()
        .on('error', handleError)
        .pipe(source('app.js'))
        .pipe(gulp.dest('./js'));
});


gulp.task('compass',function(){
    gulp.src('./scss/**/*.scss')
      .pipe(plumber())
        .pipe(compass({
            config_file : 'config.rb',
            comments : false,
            css : 'css',
            sass: 'scss'
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest("./css"))
        .pipe(browser.reload({stream:true}));
});

gulp.task('bs-reload', function () {
    browser.reload();
});

//defaultで実行するタスクを設定
gulp.task("default",['server'], function() {
    gulp.watch("./**/*.html",["bs-reload"]);
    gulp.watch("./src/**/*.js",['build']);
    gulp.watch('./js/**/*.js', ['bs-reload']);
    gulp.watch("./scss/**/*.scss",["compass"]);
});