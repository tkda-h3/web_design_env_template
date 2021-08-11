const gulp = require('gulp');
const ejs = require('gulp-ejs');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

const config = require('../config.js'); // config.jsの読み込み

gulp.task('php', () => {
    return gulp.src([
        config.src.php + '/**/*.php',
    ])
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err.messageFormatted);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest(config.wp.dist + '/'));
});
