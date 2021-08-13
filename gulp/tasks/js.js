const gulp = require('gulp');
const gulpif = require('gulp-if');
const replace = require('gulp-replace');
var uglify = require('gulp-uglify');

const config = require('../config.js');
const options = require('minimist')(process.argv.slice(2), {string: 'env'});
const isProd = (options.env === 'prod');


gulp.task('js', () => {
    return gulp.src(config.src.js + '/**/*.js')
        .pipe(replace(/\$\( *function *\( *\)/g, 'jQuery(function($)'))
        .pipe(gulpif(isProd, uglify()))
        .pipe(gulp.dest(config.static.dist + '/js/'));
});

gulp.task('js:wp', () => {
    return gulp.src(config.src.js + '/**/*.js')
        .pipe(replace(/\$\( *function *\( *\)/g, 'jQuery(function($)'))
        .pipe(gulpif(isProd, uglify()))
        .pipe(gulp.dest(config.wp.dist + '/js/'));
});
