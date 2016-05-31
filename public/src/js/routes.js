import './ctrl/GroupMessageCtrl'
import './ctrl/GroupMessageViewCtrl'
import './ctrl/IndexCtrl'

routes.$inject = ['$routeProvider'];

function routes($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'html/index.html',
            controller: 'indexCtrl'
        })
        .when('/group/:id', {
            templateUrl: 'html/GroupMessages.html',
            controller: 'groupMessageCtrl'
        })
        .when('/message/:id', {
            templateUrl: 'html/GroupMessageView.html',
            controller: 'groupMessageViewCtrl'
        })
        .otherwise('/');
}

module.exports = routes;
