const gulp = require('gulp');
const config = require('../config.js');

gulp.task('font', () => {
    return gulp.src(config.src.font + '/**')
        .pipe(gulp.dest(config.static.dist + '/font/'));
});

gulp.task('font:wp', () => {
    return gulp.src(config.src.font + '/**')
        .pipe(gulp.dest(config.wp.dist + '/font/'));
});
