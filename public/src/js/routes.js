import './ctrl/GroupMessageCtrl'
import './ctrl/GroupMessageViewCtrl'
import './ctrl/IndexCtrl'
import './ctrl/PushCtrl'

routes.$inject = ['$routeProvider'];

function routes($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'html/index.html',
            controller: 'indexCtrl'
        })
        .when('/ios/:uuid', {
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
        .when('/push/ios/:uuid', {
            templateUrl: 'html/push.html',
            controller: 'pushCtrl'
        })
        .otherwise('/');
}

module.exports = routes;
