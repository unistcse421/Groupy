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

    var fields = {
        post: 'from,comments.limit(10).order(chronological){from,message,created_time,comments.limit(5){like_count,from,message,created_time,attachment},like_count},full_picture'
    };
    _this.getPostInfo = function(id) {
        var deferred = $q.defer();

        FB.api('/' + id,
            'GET',
            { fields: fields.post},
            function(res) {
                if(res.error) {
                    deferred.reject(res.error);
                } else {
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }
}

app.service('facebookService', FacebookService);

module.exports = FacebookService;