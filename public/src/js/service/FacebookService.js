/**
 * Created by kimxogus on 2016-05-05.
 */

let app = global.app;


FacebookService.$inject = ['$http', '$q'];

function FacebookService($http, $q) {
    var _this = this;
    _this.loginStatus = null;

    _this.getLoginStatus = function() {
        var deferred = $q.defer();

        FB.getLoginStatus(function(res) {
            if(res.status === 'connected') {
                _this.loginStatus = res.status;
                deferred.resolve(res.status);
            } else {
                _this.loginStatus = res.status;
                deferred.reject(res.status);
            }
        });

        return deferred.promise;
    };

    _this.login = function() {
        var deferred = $q.defer();

        FB.login(function(res) {
            if(res.status === 'connected') {
                _this.loginStatus = res.status;
                deferred.resolve(res.status);
            } else {
                _this.loginStatus = res.status;
                deferred.reject(res.status);
            }
        });

        return deferred.promise;
    };

    _this.getPostInfo = function(id) {
        var deferred = $q.defer();

    }
}

app.service('facebookService', FacebookService);

module.exports = FacebookService;