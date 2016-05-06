/**
 * Created by Taehyun on 2016-05-06.
 */
'use strict';
define(['app', 'object/Group'], function(app, Group) {
    app.service('groupService', ['$rootScope', '$http', '$q',
        function($rootScope, $http, $q) {
            var _this = this;
            _this.currentGroup = null;
            _this.groups = [];

            _this.getGroups = function() {
                $http.get("group/")
                    .success(function(data) {
                        _this.groups = data.map(function(e){
                            return new Group(e);
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
                if(_this.currentGroup === newGroup || _this.currentGroup.id === newGroup) return;
                if(!angular.isString(newGroup)) {
                    if(!newGroup.id) return;
                    newGroup = newGroup.id;
                }

                var groups = _this.groups, group;
                for (var i = 0, len = groups.length; i < len; i++) {
                    group = groups[i];
                    if(group.id == newGroup) {
                        _this.currentGroup = group;
                        $rootScope.$emit("group:switchGroup", group);
                        return;
                    }
                }
            };
        }]
    )
});