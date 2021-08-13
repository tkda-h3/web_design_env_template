const autoprefixer = require('autoprefixer');
const cssdeclsort = require('css-declaration-sorter');
const del = require('del');
const gulp = require('gulp');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');

const config = require('../config');


gulp.task('scss', function () {
    return gulp.src(config.src.scss + '/**/*.scss')
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(plumber(notify.onError('Error: \n<%= error.message %>')))
        .pipe(sassGlob())
        .pipe(gulpif(
            isProd, 
            sass({ outputStyle: 'compressed' }),
            sass({ outputStyle: 'expanded' })))
        .pipe(replace(/url\((\.\.\/)+(.*?)\)/g, 'url(../$2)'))
        .pipe(postcss([
            autoprefixer(),
            cssdeclsort({ order: 'smacss' }),
        ]))
        .pipe(gulpif(!isProd, sourcemaps.write()))
        .pipe(gulp.dest(config.static.dist + '/css'))
    ;
});

gulp.task('scss:wp', function () {
    return gulp.src(config.src.scss + '/**/*.scss')
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(plumber(notify.onError('Error: \n<%= error.message %>')))
        .pipe(sassGlob())
        .pipe(gulpif(
            isProd, 
            sass({ outputStyle: 'compressed' }),
            sass({ outputStyle: 'expanded' })))
        .pipe(replace(/url\((\.\.\/)+(.*?)\)/g, 'url(../$2)'))
        .pipe(postcss([
            autoprefixer(),
            cssdeclsort({ order: 'smacss' }),
        ]))
        .pipe(gulpif(!isProd, sourcemaps.write()))        
        .pipe(gulp.dest(config.wp.dist + '/css'))
    ;
});

