const gulp = require('gulp');
var del = require('del');
const config = require('../config');

gulp.task('clean:static', function () {
    return del([config.static.dist + '/**']);
});

gulp.task('clean:wp', function () {
    return del([config.wp.dist + '/**']);
});
