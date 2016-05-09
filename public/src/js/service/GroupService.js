/**
 * Created by kimxogus on 2016-05-06.
 */
'use strict';
define(['app', 'object/Group'], function(app, Group) {
    app.service('groupService', ['$rootScope', '$http', '$q',
        function($rootScope, $http, $q) {
            var _this = this;
            _this.currentGroup = null;
            _this.groups = {};

            _this.getGroups = function() {
                $http.get("group/")
                    .success(function(data) {
                        data.forEach(function(e){
                            _this.groups[e.id] = new Group(e);
                        });
                    })
                    .error(function(err) {
                        console.error(err);
                    });
            };

            _this.getGroupInfo = function(group_id) {
                var deferred = $q.defer();
                $http.get("group/" + group_id)
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(err) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            };

            _this.setCurrentGroup = function(newGroup) {
                var deferred = $q.defer();
                if(_this.currentGroup === newGroup || _this.currentGroup.id === newGroup) {
                    deferred.reject("Invalid Input");
                    return deferred.promise;
                }
                if(!angular.isString(newGroup)) {
                    if(!newGroup.id) {
                        deferred.reject("Invalid Input");
                        return deferred.promise;
                    }
                    newGroup = newGroup.id;
                }

                var group = _this.groups[newGroup.id];
                if(group) {
                    _this.currentGroup = group;
                    deferred.resolve("Success", group);
                } else {
                    deferred.reject("The group does not exists");
                }
                return deferred.promise;
            };
        }]
    )
});