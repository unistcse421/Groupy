/**
 * Created by Taehyun on 2016-05-04.
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
        'semantic-ui'           : '../dist/semantic.min'
    },
    shim: {
        'angular'       	: {exports: 'angular'},
        'angular-route' 	: {deps: ['angular']},
        'semantic-ui'       : {deps: ['jquery']}
    }
});

require([
    'angular', 'app', 'semantic-ui', 'css!semantic-ui', 'css!css/style'
], function(angular) {
    angular.bootstrap(document, ['app']);
});