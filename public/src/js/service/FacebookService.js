/**
 * Created by kimxogus on 2016-05-05.
 */

'use strict';
define(['app'], function(app) {
    app.service('FacebookService', ['$http', '$q',
        function($http, $q) {
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
        }]);
});