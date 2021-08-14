const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const imageminGif = require('imagemin-gifsicle');
const imageminSvg = require('imagemin-svgo');

const config = require('../config.js');

gulp.task('img', () => {
    return (
        gulp.src(config.src.img + '/**')
            .pipe(imagemin([
                // pngの圧縮
                pngquant({
                    quality: [0.6, 0.8]
                }),
                // jpgの圧縮
                mozjpeg({
                    quality: 60,
                    progressive: true
                }),
                // gifの圧縮
                imageminGif({
                    interlaced: false,
                    optimizationLevel: 3,
                    colors: 180
                }),
                // SVGの圧縮
                imageminSvg()
            ]
            ))
            .pipe(gulp.dest(config.static.dist + '/img/'))
    );
});

gulp.task('img:wp', (done) => {
    gulp.src([config.src.img + '/**', '!' + config.src.img + '/screenshot.+(jpg|jpeg|png)'])
        .pipe(imagemin([
            // pngの圧縮
            pngquant({
                quality: [0.6, 0.8]
            }),
            // jpgの圧縮
            mozjpeg({
                quality: 60,
                progressive: true
            }),
            // gifの圧縮
            imageminGif({
                interlaced: false,
                optimizationLevel: 3,
                colors: 180
            }),
            // SVGの圧縮
            imageminSvg()
        ]
        ))
        .pipe(gulp.dest(config.wp.dist + '/img/'));

    // テーマ選択画面に表示される画像
    gulp.src(config.src.img + '/screenshot.+(jpg|jpeg|png)')
        .pipe(gulp.dest(config.wp.dist + '/'));

    done();
});
