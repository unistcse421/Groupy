/**
 * Created by kimxogus on 2016-05-04.
 */

requirejs.config({
    map: {
        '*': {
            css: '../css'
        }
    },
    baseUrl: 'js',
    paths: {
        'jquery'                : '../lib/jquery.min',
        'angular'               : '../lib/angular/angular.min',
        'angular-route'         : '../lib/angular/angular-route.min',
        'angular-sanitize'      : '../lib/angular/angular-sanitize.min',
        'semantic-ui'           : '../dist/semantic.min'
    },
    shim: {
        'angular'       	: {exports: 'angular'},
        'angular-route' 	: {deps: ['angular']},
        'angular-sanitize' 	: {deps: ['angular']},
        'semantic-ui'       : {deps: ['jquery']}
    }
});

require([
    'angular', 'jquery', 'app', 'semantic-ui', 'routes', 'ctrl/RootCtrl',   // JS
    'css!semantic-ui', 'css!css/style'                                      // CSS
], function(angular, $) {
    angular.bootstrap(document, ['app']);

    $("#content-wrapper").css({
        "padding-left": $("#sidebar").width()
    });
});