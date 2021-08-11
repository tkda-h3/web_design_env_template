const autoprefixer = require('autoprefixer');
const cssdeclsort = require('css-declaration-sorter');
const gulp = require('gulp');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const config = require('../config');


gulp.task('scss', function () {
    return gulp.src(config.src.scss + '/**/*.scss')
        .pipe(replace(/url\((\.\.\/)+(.*?)\)/g, 'url(./$2)')) // background-image, font などのプロパティの相対パス修正
        .pipe(sourcemaps.init())
        .pipe(plumber(notify.onError('Error: \n<%= error.message %>')))
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(postcss([
            autoprefixer(),
            cssdeclsort({ order: 'smacss' }),
        ]))
        .pipe(gulp.dest(config.static.dist + '/'))
});

gulp.task('scss:wp', function () {
    return gulp.src(config.src.scss + '/**/*.scss')
        .pipe(replace(/url\((\.\.\/)+(.*?)\)/g, 'url(./$2)'))
        .pipe(sourcemaps.init())
        .pipe(plumber(notify.onError('Error: \n<%= error.message %>')))
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(postcss([
            autoprefixer(),
            cssdeclsort({ order: 'smacss' }),
        ]))
        .pipe(gulp.dest(config.wp.dist + '/'))
});

