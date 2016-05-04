'use strict';

define(['app', 'routeResolver'], function(app, route){
    app.config(['$routeProvider', function($route){
        $route.when('/', route(
            '/views/index.html',
            ['ctrl/IndexCtrl']
        ));
        $route.when('/:group', route(
            '/views/GroupFeed.html',
            ['ctrl/GroupFeedCtrl']
        ));
        $route.otherwise({
            redirectTo: '/'
        });
    }]);
});