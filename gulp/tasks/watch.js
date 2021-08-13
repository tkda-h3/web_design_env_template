const browserSync = require('browser-sync').create();
const gulp = require('gulp');

const config = require('../config');


gulp.task('reload', function(done){
    browserSync.reload();
    done();
});

gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: "./static/"
        }
    });

    gulp.watch(
        [config.src.scss + '/**/*.scss'],
        gulp.series(['scss', 'reload']),
    );

    gulp.watch(
        [config.src.js + '/**/*.js'],
        gulp.series(['js', 'reload']),
    );

    gulp.watch(
        [config.src.ejs + '/**/*.ejs'],
        gulp.series(['ejs', 'reload']),
    );

    gulp.watch(
        [config.src.font + '/**/*.font'],
        gulp.series(['font', 'reload']),
    );

    gulp.watch(
        [config.src.img + '/**'],
        gulp.series(['img', 'reload']),
    );
});

gulp.task('watch:wp', function () {
    browserSync.init(config.browserSync.wp);

    gulp.watch(
        [config.src.scss + '/**/*.scss'],
        gulp.series(['scss:wp', 'reload']),
    );

    gulp.watch(
        [config.src.css + '/style.css'],
        gulp.series(['css:wp:declare']),
    );

    gulp.watch(
        [config.src.js + '/**/*.js'],
        gulp.series(['js:wp', 'reload']),
    );

    gulp.watch(
        [config.src.php + '/**/*.php'],
        gulp.series(['php', 'reload']),
    );

    gulp.watch(
        [config.src.font + '/**/*.font'],
        gulp.series(['font:wp', 'reload']),
    );

    gulp.watch(
        [config.src.img + '/**'],
        gulp.series(['img:wp', 'reload']),
    );
});

