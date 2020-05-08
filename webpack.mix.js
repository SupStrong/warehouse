let mix = require('laravel-mix');
var rd = require('rd');
const path = {
    js: {
        enter: 'src/layuiadmin/modules/',
        output: './dist/layuiadmin/modules/'
    }
}

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

let fileArr = []

// copy文件
getFiles('js');
// getFiles('css')

mix.copyDirectory('./src/layuiadmin/json/', './dist/layuiadmin/json')
mix.copyDirectory('./src/layuiadmin/layui/', './dist/layuiadmin/layui')
mix.copyDirectory('./src/layuiadmin/tpl/', './dist/layuiadmin/tpl')
mix.copyDirectory('./src/layuiadmin/style/', './dist/layuiadmin/style')
mix.copyDirectory('./src/layuiadmin/json/', './dist/layuiadmin/json')
mix.copy('./src/layuiadmin/config.js', './dist/layuiadmin/config.js')

function getFiles(type) {
    fileArr = []
    let obj = {
        css: /\.css$/,
        js: /\.js$/,
    }
    rd.eachFileFilterSync(path[type].enter, obj[type], function(f, s) {
        var f = f.split("flyadmin")[1].replace(/\\/ig, "/").substr(1);
        // if (type == "css") { 
        //     mix.sass(f, path[type].output + f.split("/style")[1],{strictMath: true})
        //         .options({
        //             processCssUrls: false,
        //             postCss: [
        //                 require('postcss-css-variables')()
        //             ]
        //         })
        // }
        if (type == "js") {
            mix.js(f, path[type].output+ f.split("/modules")[1]);
        }
    });
}

if (mix.inProduction()) {
    mix.version()
} else {
    mix.sourceMaps()
}

//隐藏右下角提醒
mix.disableNotifications();