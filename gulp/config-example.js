module.exports = {
    src: {
        scss: './src/scss',
        css: './src/css',
        ejs: './src/ejs',
        js: './src/js',
        font: './src/font',
        img: './src/img',
        php: './src/php',
    },
    static: {
        dist: './static',
    },
    wp: {
        dist: './wp',
    },
    browserSync: {
        wp: {
            notify: false,
            ghostMode: false,
            proxy: '<ローカル環境のWPトップページURL>',
        }
    }
};
