const gulp = require('gulp');
const config = require('../config.js');

gulp.task('img', () => {
    return gulp.src(config.src.img + '/**')
        .pipe(gulp.dest(config.static.dist + '/img/'));
});
gulp.task('img:wp', () => {
    return gulp.src(config.src.img + '/**')
        .pipe(gulp.dest(config.wp.dist + '/img/'));
});
