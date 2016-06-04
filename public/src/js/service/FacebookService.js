/**
 * Created by kimxogus on 2016-05-05.
 */

let app = global.app;


FacebookService.$inject = ['$q'];

function FacebookService($q) {

    const LIMIT = 30;

    let _this = this;
    _this.loginStatus = null;

    _this.isFacebookOn = function() {
        return _this.loginStatus === 'connected';
    };

    _this.getLoginStatus = function() {
        let deferred = $q.defer();

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
        let deferred = $q.defer();

        FB.login(function(res) {
            _this.loginStatus = res.status;
            if(res.status === 'connected') {
                deferred.resolve(res.status);
            } else {
                deferred.reject(res.status);
            }
        });

        return deferred.promise;
    };

    _this.watchLoginChange = function(onLogin, onLogout) {
        FB.Event.subscribe('auth.authResponseChange', function(res){
            _this.loginStatus = res.status;
            if (res.status === 'connected') {
                onLogin(res.status);
            } else {
                onLogout(res.status);
            }
        });
    };

    let fields = {
        post: 'from,attachments.limit(10){media,url,subattachments}'
    };
    _this.getPostInfo = function(id) {
        let deferred = $q.defer();

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
    };

    _this.getLikes = function(id){
        var deferred = $q.defer();
        FB.api('/' + id + '/likes',
            'GET',
            { limit: LIMIT },
            function(res) {
                if(res.error) {
                    deferred.reject(res.error);
                } else {
                    deferred.resolve(res);
                }
            }
        );
        return deferred.promise;
    };

    _this.getComments = function(id){
        var deferred = $q.defer();
        FB.api('/' + id + '/comments',
            'GET',
            { limit: LIMIT },
            function(res){
                if(res.error) {
                    deferred.reject(res.error);
                } else {
                    deferred.resolve(res);
                }
            }
        );
        return deferred.promise;
    };
}

app.service('facebookService', FacebookService);

module.exports = FacebookService;