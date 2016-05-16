routes.$inject = ['$routeProvider'];

function routes($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'html/index.html',
            controller: require('./ctrl/IndexCtrl')
        })
        .when('/group/:id', {
            templateUrl: 'html/GroupMessages.html',
            controller: require('./ctrl/GroupMessagesCtrl')
        })
        .otherwise('/');
}

module.exports = routes;