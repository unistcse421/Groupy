/**
 * Created by kimxogus on 2016-05-04.
 */

/**
 * Import Libraries
 */
var
    gulp            = require('gulp'),
    pump            = require('pump'),
    watch           = require('gulp-watch'),

    webpack         = require('webpack-stream'),
    htmlMin         = require('gulp-htmlmin'),
    runSequence     = require('run-sequence'),
    clean           = require('gulp-clean'),

    semanticBuild   = require('./semantic/tasks/build');    // Build Script for Semantic-UI


/**
 * Path Variables
 */
const
    BASE_SRC_DIR        = 'public/src',
    BASE_DIST_DIR       = 'public/dist',

    JS_BASE             = "/js",
    CSS_BASE            = "/css",
    HTML_BASE           = "/html",

    JS_SRC              = BASE_SRC_DIR + JS_BASE + "/**/*.js",
    CSS_SRC             = BASE_SRC_DIR + CSS_BASE + "/**/*.css",
    SASS_SRC            = BASE_SRC_DIR + CSS_BASE + "/**/*.sass",
    HTML_SRC            = BASE_SRC_DIR + HTML_BASE + "/**/*.html",  HTML_DIST   = BASE_DIST_DIR + HTML_BASE,

    APP_SRC             = [JS_SRC, CSS_SRC, SASS_SRC],
    APP_DIST            = BASE_DIST_DIR + JS_BASE,

    SEMANTIC_CONFIG_SRC = "theme.config",
    SEMANTIC_CONFIG_DIST= "semantic/src/",

    WEBPACK_DIST_RES_SRC  = [BASE_DIST_DIR + JS_BASE + "/**/*", "!" + BASE_DIST_DIR + JS_BASE + "/**/*.js"],
    WEBPACK_DIST_RES_DEST = BASE_DIST_DIR;


/**
 * Task Names
 */
const
    CLEAN               = "clean",

    BUILD               = "build",
    BUILD_SRC           = "build-src",
    BUILD_SEMANTIC_UI   = "build-semantic",
    BUILD_SEMANTIC_SRC  = "build-semantic-src",

    WATCH               = "watch",
    WATCH_APP           = "watch-app",
    WATCH_HTML          = "watch-html",

    WEBPACK             = 'webpack',

    MINIFY_HTML         = "minify-html",

    MOVE_SEMANTIC_CONFIG    = "move-semantic-config",
    MOVE_WEBPACK_DIST_RES   = "move-webpack-dist-res";



/**
 * Build Scripts
 */
gulp.task(BUILD, function(cb) {
    runSequence(
        CLEAN,
        BUILD_SEMANTIC_UI,
        [MINIFY_HTML, WEBPACK],
        MOVE_WEBPACK_DIST_RES,
        cb);
});
gulp.task(BUILD_SRC, function(cb) {
    runSequence(
        CLEAN,
        [MINIFY_HTML, WEBPACK],
        MOVE_WEBPACK_DIST_RES,
        cb);
});
gulp.task(BUILD_SEMANTIC_SRC, semanticBuild);
gulp.task(BUILD_SEMANTIC_UI, function(cb) {
    runSequence(
        MOVE_SEMANTIC_CONFIG,
        BUILD_SEMANTIC_SRC,
        cb);
});


/**
 * Clean Scripts
 */
gulp.task(CLEAN, function(cb) {
    pump([
        gulp.src(BASE_DIST_DIR, {read: false}),
        clean({force: true})
    ], cb);
});

/**
 * Watch Scripts
 */
gulp.task(WATCH, [WATCH_APP, WATCH_HTML]);


const WATCH_OPTION = {
    debounceDelay: 100
};
function watcherHandler(e) {
    console.log("File " + e.path.replace(process.cwd(), "") + " was " + e.type + ", running tasks...");
}

gulp.task(WATCH_APP, function() {
    gulp.watch(APP_SRC, WATCH_OPTION, [WEBPACK]).on('change', watcherHandler);
});

gulp.task(WATCH_HTML, function() {
    gulp.watch(HTML_SRC, WATCH_OPTION, [MINIFY_HTML]).on('change', watcherHandler);
});



/**
 * Minifying Source Scripts
 */
gulp.task(WEBPACK, function(cb) {
    pump([
        gulp.src(APP_SRC),
        webpack(require('./webpack.config')),
        gulp.dest(APP_DIST)
    ], cb);
});

gulp.task(MOVE_WEBPACK_DIST_RES, function(cb) {
    pump([
        gulp.src(WEBPACK_DIST_RES_SRC),
        gulp.dest(WEBPACK_DIST_RES_DEST)
    ], cb);
});

gulp.task(MINIFY_HTML, function(cb) {
    pump([
        gulp.src(HTML_SRC),
        htmlMin({collapseWhitespace: true}),
        gulp.dest(HTML_DIST)
    ], cb);
});

/**
 * Building Semantic-UI Scripts
 */

gulp.task(MOVE_SEMANTIC_CONFIG, function(cb) {
    pump([
        gulp.src(SEMANTIC_CONFIG_SRC),
        gulp.dest(SEMANTIC_CONFIG_DIST)
    ], cb);
});