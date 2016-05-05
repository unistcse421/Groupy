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
    gulpSass        = require('gulp-sass'),
    runSequence     = require('gulp-run-sequence'),

    semanticBuild   = require('./semantic/tasks/build');    // Build Script for Semantic-UI


/**
 * Path Variables
 */
const
    BASE_SRC_DIR        = 'public/src',
    BASE_DIST_DIR       = 'public/dist',
    BASE_SEMANTIC_DIR   = 'semantic/dist',

    JS_BASE             = "/js",
    CSS_BASE            = "/css",
    HTML_BASE           = "/html",
    LIB_BASE            = "/lib",
    BOWER_BASE          = "bower_components",

    REQUIRE_CSS_BASE    = "/require-css",
    ANGULAR_BASE        = "/angular",
    ANGULAR_ROUTE_BASE  = "/angular-route",
    JQUERY_BASE         = "/jquery",

    JS_SRC              = BASE_SRC_DIR + JS_BASE + "/**/*.js",      JS_DIST     = BASE_DIST_DIR + JS_BASE,
    CSS_SRC             = BASE_SRC_DIR + CSS_BASE + "/**/*.sass",   CSS_DIST    = BASE_DIST_DIR + CSS_BASE,
    SASS_SRC            = BASE_SRC_DIR + CSS_BASE + "/**/*.css",    SASS_DIST   = BASE_DIST_DIR + CSS_BASE,
    HTML_SRC            = BASE_SRC_DIR + HTML_BASE + "/**/*.html",  HTML_DIST   = BASE_DIST_DIR + HTML_BASE,
    LIB_SRC             = BASE_SRC_DIR + LIB_BASE + "/**/*.js",     LIB_DIST    = BASE_DIST_DIR + LIB_BASE,

    BOWER_REQUIRE_CSS_SRC   = BOWER_BASE + REQUIRE_CSS_BASE + "/*.js",          BOWER_REQUIRE_CSS_DIST  = BASE_DIST_DIR,
    ANGULAR_SRC             = BOWER_BASE + ANGULAR_BASE + "/*.min.*",           ANGULAR_DIST            = LIB_DIST + ANGULAR_BASE,
    ANGULAR_ROUTE_SRC       = BOWER_BASE + ANGULAR_ROUTE_BASE + "/*.min.*",
    JQUERY_SRC              = BOWER_BASE + JQUERY_BASE + "/dist/jquery.min.*",

    SEMANTIC_CONFIG_SRC = "theme.config",
    SEMANTIC_JS_SRC     = BASE_SEMANTIC_DIR + "/*.min.js",
    SEMANTIC_CSS_SRC    = BASE_SEMANTIC_DIR + "/*.min.css",
    SEMANTIC_THEME_SRC  = BASE_SEMANTIC_DIR + "/themes/**/*",

    SEMANTIC_CONFIG_DIST    = "semantic/src/",
    SEMANTIC_PACKAGE_DIST   = BASE_DIST_DIR + "/dist",  SEMANTIC_THEME_DIST  = SEMANTIC_PACKAGE_DIST + "/themes";


/**
 * Task Names
 */
const
    BUILD               = "build",
    BUILD_SRC           = "build-src",
    BUILD_SEMANTIC_UI   = "build-semantic",
    BUILD_SEMANTIC_SRC  = "build-semantic-src",

    WATCH               = "watch",
    WATCH_JS            = "watch-js",
    WATCH_CSS           = "watch-css",
    WATCH_SASS          = "watch-sass",
    WATCH_HTML          = "watch-html",
    WATCH_LIB           = "watch-lib",

    MINIFY_JS           = "minify-js",
    MINIFY_CSS          = "minify-css",
    MINIFY_SASS         = "minify-sass",
    MINIFY_HTML         = "minify-html",

    MOVE_LIB                = "move-lib",
    MOVE_BOWER_COMPONENTS   = "move-bower-components",
    MOVE_REQUIRE_CSS        = "move-require-css",
    MOVE_ANGULAR            = "move-angular",
    MOVE_ANGULAR_ROUTE      = "move-angular-route",
    MOVE_JQUERY             = "move-jquery",

    MOVE_SEMANTIC_CONFIG    = "move-semantic-config",
    MOVE_SEMANTIC_STYLE     = "move-semantic-style",
    MOVE_SEMANTIC_JS        = "move-semantic-js",
    MOVE_SEMANTIC_THEME     = "move-semantic-theme";



/**
 * Build Scripts
 */
gulp.task(BUILD, [BUILD_SEMANTIC_UI, BUILD_SRC]);
gulp.task(BUILD_SRC, [MINIFY_JS, MINIFY_CSS, MINIFY_SASS, MINIFY_HTML, MOVE_LIB, MOVE_BOWER_COMPONENTS]);
gulp.task(BUILD_SEMANTIC_SRC, semanticBuild);
gulp.task(BUILD_SEMANTIC_UI, function(cb) {
    runSequence(MOVE_SEMANTIC_CONFIG, BUILD_SEMANTIC_SRC, [MOVE_SEMANTIC_JS, MOVE_SEMANTIC_STYLE, MOVE_SEMANTIC_THEME], cb);
});


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
 * Minifying Source Scripts
 */
gulp.task(MINIFY_JS, function(cb) {
    pump([
        gulp.src(JS_SRC),
        minifier({mangle: true, compress: true, preserveComments: 'all'}, uglifyJs),
        gulp.dest(JS_DIST)
    ], cb);
});

gulp.task(MINIFY_CSS, function(cb) {
    pump([
        gulp.src(CSS_SRC),
        cleanCSS(),
        gulp.dest(CSS_DIST)
    ], cb);
});

gulp.task(MINIFY_SASS, function(cb) {
    pump([
        gulp.src(SASS_SRC),
        gulpSass().on('error', gulpSass.logError),
        cleanCSS(),
        gulp.dest(SASS_DIST)
    ], cb)
});

gulp.task(MINIFY_HTML, function(cb) {
    pump([
        gulp.src(HTML_SRC),
        htmlMin({collapseWhitespace: true}),
        gulp.dest(HTML_DIST)
    ], cb);
});

gulp.task(MOVE_LIB, function(cb) {
    pump([
        gulp.src(LIB_SRC),
        gulp.dest(LIB_DIST)
    ], cb);
});


/**
 * Move Bower Components
 */
gulp.task(MOVE_BOWER_COMPONENTS, [MOVE_REQUIRE_CSS, MOVE_ANGULAR, MOVE_ANGULAR_ROUTE, MOVE_JQUERY]);

gulp.task(MOVE_REQUIRE_CSS, function(cb) {
    pump([
        gulp.src(BOWER_REQUIRE_CSS_SRC),
        minifier({mangle: true, compress: true, preserveComments: 'all'}, uglifyJs),
        gulp.dest(BOWER_REQUIRE_CSS_DIST)
    ], cb)
});

gulp.task(MOVE_ANGULAR, function(cb) {
    pump([
        gulp.src(ANGULAR_SRC),
        gulp.dest(ANGULAR_DIST)
    ], cb)
});

gulp.task(MOVE_ANGULAR_ROUTE, function(cb) {
    pump([
        gulp.src(ANGULAR_ROUTE_SRC),
        gulp.dest(ANGULAR_DIST)
    ], cb)
});

gulp.task(MOVE_JQUERY, function(cb) {
    pump([
        gulp.src(JQUERY_SRC),
        gulp.dest(LIB_DIST)
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

gulp.task(MOVE_SEMANTIC_JS, function(cb) {
    pump([
        gulp.src(SEMANTIC_JS_SRC),
        gulp.dest(SEMANTIC_PACKAGE_DIST)
    ], cb);
});

gulp.task(MOVE_SEMANTIC_STYLE, function(cb) {
    pump([
        gulp.src(SEMANTIC_CSS_SRC),
        gulp.dest(SEMANTIC_PACKAGE_DIST)
    ], cb);
});

gulp.task(MOVE_SEMANTIC_THEME, function(cb) {
    pump([
        gulp.src(SEMANTIC_THEME_SRC),
        gulp.dest(SEMANTIC_THEME_DIST)
    ], cb);
});