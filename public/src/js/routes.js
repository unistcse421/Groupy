'use strict';

define(['app', 'routeResolver'], function(app, route){
    app.config(['$routeProvider', function($route){

        $route.when('/', route(
            '/html/index.html',
            ['ctrl/IndexCtrl']
        ));

        $route.otherwise({
            redirectTo: '/'
        });
    }]);
});