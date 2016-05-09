/**
 * Created by kimxogus on 2016-05-05.
 */
'use strict';

define(['angular', 'angular-route'],function(angular) {
    var app = angular.module('app', ['ngRoute']);

    app.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function($controllerProvider, $compileProvider, $filterProvider, $provide) {
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
        }
    ]);
    
    app.run(['$rootScope', '$window',
        function($rootScope, $window) {
            $rootScope.fbsdkLoaded = false;
            $window.fbAsyncInit = function() {
                FB.init({
                    appId: '725048380929186',
                    version: 'v2.6',
                    status: true,
                    cookie: true,
                    xfbml: true
                });
                $rootScope.fbsdkLoaded = true;
                $("#fb-root").trigger("facebook:init");
            };
            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/ko_KR/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }]
    );

    return app;
});