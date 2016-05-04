/**
 * Created by Taehyun on 2016-05-04.
 */

/**
 * Import Libraries
 */
var
    gulp            = require('gulp'),
    pump            = require('pump'),
    watch           = require('gulp-watch'),

    uglifyJs        = require('uglify-js'),
    minifier        = require('gulp-uglify/minifier'),
    htmlMin         = require('gulp-htmlmin'),
    cleanCSS        = require('gulp-clean-css'),
    gulpSass        = require('gulp-sass');


/**
 * Path Variables
 */
const
    BASE_SRC_DIR    = 'public/src',
    BASE_DEST_DIR   = 'public/dest',

    JS_BASE         = "/js",
    CSS_BASE        = "/css",
    HTML_BASE       = "/html",
    LIB_BASE        = "/lib",

    JS_DIR          = JS_BASE + "/**/*.js",
    SASS_DIR        = CSS_BASE + "/**/*.sass",
    CSS_DIR         = CSS_BASE + "/**/*.css",
    HTML_DIR        = HTML_BASE + "/**/*.html",
    LIB_DIR         = LIB_BASE + "/**/*.js",

    JS_SRC          = BASE_SRC_DIR + JS_DIR,        JS_DEST     = BASE_DEST_DIR + JS_BASE,
    CSS_SRC         = BASE_SRC_DIR + CSS_DIR,       CSS_DEST    = BASE_DEST_DIR + CSS_BASE,
    SASS_SRC        = BASE_SRC_DIR + SASS_DIR,      SASS_DEST   = BASE_DEST_DIR + CSS_BASE,
    HTML_SRC        = BASE_SRC_DIR + HTML_DIR,      HTML_DEST   = BASE_DEST_DIR + HTML_BASE,
    LIB_SRC         = BASE_SRC_DIR + LIB_DIR,       LIB_DEST    = BASE_DEST_DIR + LIB_BASE;


/**
 * Task Names
 */
const
    BUILD       = "build",

    WATCH       = "watch",
    WATCH_JS    = "watch-js",
    WATCH_CSS   = "watch-css",
    WATCH_SASS  = "watch-sass",
    WATCH_HTML  = "watch-html",
    WATCH_LIB   = "watch-lib",

    MINIFY_JS   = "minify-js",
    MINIFY_CSS  = "minify-css",
    MINIFY_SASS = "minify-sass",
    MINIFY_HTML = "minify-html",

    MOVE_LIB    = "move-lib";

/**
 * Build Scripts
 */
gulp.task(BUILD, [MINIFY_JS, MINIFY_CSS, MINIFY_SASS, MINIFY_HTML, MOVE_LIB]);


/**
 * Watch Scripts
 */
gulp.task(WATCH, [WATCH_JS, WATCH_CSS, WATCH_SASS, WATCH_HTML, WATCH_LIB]);


const WATCH_OPTION = {
    debounceDelay: 100
};
function watcherHandler(e) {
    console.log("File " + e.path.replace(process.cwd(), "") + " was " + e.type + ", running tasks...");
}

gulp.task(WATCH_JS, function() {
    gulp.watch(JS_SRC, WATCH_OPTION, [MINIFY_JS]).on('change', watcherHandler);
});

gulp.task(WATCH_SASS, function() {
    gulp.watch(SASS_SRC, WATCH_OPTION, [MINIFY_SASS]).on('change', watcherHandler);
});

gulp.task(WATCH_CSS, function() {
    gulp.watch(CSS_SRC, WATCH_OPTION, [MINIFY_CSS]).on('change', watcherHandler);
});

gulp.task(WATCH_HTML, function() {
    gulp.watch(HTML_SRC, WATCH_OPTION, [MINIFY_HTML]).on('change', watcherHandler);
});

gulp.task(WATCH_LIB, function() {
    gulp.watch(LIB_SRC, WATCH_OPTION, [MOVE_LIB]).on('change', watcherHandler);
});

/**
 * Minify Sources
 */
gulp.task(MINIFY_JS, function(cb) {
    pump([
        gulp.src(JS_SRC),
        minifier({mangle: true, compress: true, preserveComments: 'all'}, uglifyJs),
        gulp.dest(JS_DEST)
    ], cb);
});

gulp.task(MINIFY_CSS, function(cb) {
    pump([
        gulp.src(CSS_SRC),
        cleanCSS(),
        gulp.dest(CSS_DEST)
    ], cb);
});

gulp.task(MINIFY_SASS, function(cb) {
    pump([
        gulp.src(SASS_SRC),
        gulpSass().on('error', gulpSass.logError),
        cleanCSS(),
        gulp.dest(SASS_DEST)
    ], cb)
});

gulp.task(MINIFY_HTML, function(cb) {
    pump([
        gulp.src(HTML_SRC),
        htmlMin({collapseWhitespace: true}),
        gulp.dest(HTML_DEST)
    ], cb);
});

gulp.task(MOVE_LIB, function(cb) {
    pump([
        gulp.src(LIB_SRC),
        gulp.dest(LIB_DEST)
    ], cb);
});