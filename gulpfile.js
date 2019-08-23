'use strict';

const   gulp             = require('gulp'),
        sass             = require('gulp-sass'),
        autoprefixer     = require('gulp-autoprefixer'),
        sourcemaps       = require('gulp-sourcemaps'),
        cssmin           = require('gulp-cssmin'),
        rename           = require('gulp-rename'),
        del              = require('del'),
        taskTime         = require('gulp-total-task-time'),
        stripCssComments = require('gulp-strip-css-comments'),
        cssbeautify      = require('gulp-cssbeautify'),
        htmlmin          = require('gulp-htmlmin'),
        jsmin            = require('gulp-uglify'),
        babel            = require('gulp-babel'),
        webpack          = require('webpack-stream');

/* Record total task time */
taskTime.init();


/* install all relevant node_modules files */
gulp.task('install', () => {
    // .js
    gulp.src([
        'node_modules/pixi.js/dist/pixi.js',
        'node_modules/pixi.js/dist/pixi.min.js',
        'node_modules/normalize.css/normalize.css',
    ]).pipe(gulp.dest('vendor/'))
});

/* Compile SCSS, Autoprefix, Stripcomments, Beautify, Minify. */
gulp.task('scss-dist', () => {
    return gulp.src('scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(stripCssComments({
            preserve: false
        }))
        .pipe(cssbeautify())
        .pipe(gulp.dest('css/'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css/'));
});

/* Watch files, clean and rebuild SCSS on change */
gulp.task('watchscss', () => {
    gulp.watch('scss/**/*', ['scss-dist']);
});

/* Delete the build directory */
gulp.task('clean', () => {
    return del(['dist']);
});

/* Run all important tasks and copy the files into the dist directory */
gulp.task('build', ['clean', 'install', 'scss-dist'], () => {
    // minify and copy html
    gulp.src(['./*.html'])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
    // minify and copy js
    gulp.src(['js/**/*'])
        .pipe(webpack(require('./.webpack.config.js')))
        .pipe(gulp.dest('dist/js'));
    // just copying
    gulp.src([
        'assets/**/*',
        '!assets/**/*.psd',
        '.htaccess',
        'browserconfig.xml',
        'favicon.ico',
        'humans.txt',
        '*.png',
        'robots.txt',
        'site.webmanifest',
        '!**/*/*.map',
        'vendor/**/*.js',
        'css/**/*.css'
    ], {base:'.'})
        .pipe(gulp.dest('dist'))
});

/* Watch task */
gulp.task('watch', ['build', 'watchscss']);

/* Default task */
gulp.task('default', ['build']);
