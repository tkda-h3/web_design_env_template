const gulp = require('gulp');
const ejs = require('gulp-ejs');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

const config = require('../config.js'); // config.jsの読み込み

gulp.task('ejs', () => {
    return gulp.src([
        config.src.ejs + '/**/*.ejs', 
        '!' + config.src.ejs + '/**/_*.ejs', // アンダースコア1つ以上で無視
    ])
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err.messageFormatted);
                this.emit('end');
            }
        }))
        .pipe(ejs())
        .pipe(replace(/src="(\.\.\/)*img/g, 'src="./img')) // 画像の相対パスの変更
        .pipe(rename({ extname: '' }))
        .pipe(gulp.dest(config.static.dist + '/'));
});


// ejsからphpファイル
// 共通ファイルの展開をしない
gulp.task('ejs:php:init', () => {
    return gulp.src([
        config.src.ejs + '/**/*.ejs', 
        '!' + config.src.ejs + '/**/__*.ejs', // アンダースコア2つ以上で無視
    ])
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err.messageFormatted);
                this.emit('end');
            }
        }))
        .pipe(replace(/src="(\.\.\/)*img/g, 'src="<?php echo get_template_directory_uri(); ?>/img'))
        .pipe(replace(/<%- +include\( *'part\/__load_css\.html\.ejs' *\) +%>/g, '<?php wp_head(); ?>')) // cssの直書きを修正
        .pipe(replace(/<%- +include\( *'part\/__load_js\.html\.ejs' *\) +%>/g, '<?php wp_footer(); ?>')) // jsの直書きを修正
        .pipe(replace(/<%- +include\( *'_header\.html\.ejs' *\) +%>/g, '<?php get_header(); ?>')) // get_header();
        .pipe(replace(/<%- +include\( *'_footer\.html\.ejs' *\) +%>/g, '<?php get_footer(); ?>')) // get_footer();
        .pipe(replace(/<%- +include\( *'_sidebar\.html\.ejs' *\) +%>/g, '<?php get_sidebar(); ?>')) // get_sidebar();
        .pipe(replace(/<%- +include\( *'(.*)\/_([^_].*)\.html\.ejs' *\) +%>/g, '<?php get_template_part(\'$1/$2\'); ?>')) // prefixがアンダースコア1つのファイル
        .pipe(replace(/<%- +include\( *'_([^_].*)\.html\.ejs' *\) +%>/g, '<?php get_template_part(\'$1\'); ?>'))
        .pipe(rename(function(path){
            path.basename = path.basename.replace(/^_/g, '');
        }))
        .pipe(rename({ extname: '' })) // .ejs 削除
        .pipe(rename({ extname: '.php' })) // .html to .php
        .pipe(gulp.dest(config.src.php + '/', {overwrite: false}));        
});