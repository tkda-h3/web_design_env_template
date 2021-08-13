const gulp = require('gulp');

const config = require('../config');


gulp.task('css:wp:declare', function(){
    return gulp.src(config.src.css + '/style.css')
    .pipe(gulp.dest(config.wp.dist + '/'));
});
