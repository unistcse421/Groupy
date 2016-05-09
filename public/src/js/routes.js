'use strict';

define(['app', 'routeResolver'], function(app, route){
    app.config(['$routeProvider', function($route){

        $route.when('/', route(
                '/html/index.html',
                ['ctrl/IndexCtrl']
            ))
            .when('/group/:id', route(
                '/html/GroupMessages.html',
                ['ctrl/GroupMessagesCtrl']
            ))
            .otherwise({
            redirectTo: '/'
        });
    }]);
});