const gulp = require('gulp');
const replace = require('gulp-replace');

const config = require('../config.js');

gulp.task('js', () => {
    return gulp.src(config.src.js + '/**/*.js')
        .pipe(replace(/\$\( *function *\( *\)/g, 'jQuery(function($)'))
        .pipe(gulp.dest(config.static.dist + '/js/'));
});

gulp.task('js:wp', () => {
    return gulp.src(config.src.js + '/**/*.js')
        .pipe(replace(/\$\( *function *\( *\)/g, 'jQuery(function($)'))
        .pipe(gulp.dest(config.wp.dist + '/js/'));
});
