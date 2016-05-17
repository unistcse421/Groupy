import './ctrl/GroupMessageCtrl'
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
        .otherwise('/');
}

module.exports = routes;