/**
 * Created by kimxogus on 2016-05-06.
 */
import Group from '../object/Group';

let app = global.app;


GroupService.$inject = ['$rootScope', '$http', '$q'];

function GroupService($rootScope, $http, $q) {
    var _this = this;
    _this.currentGroup = null;
    _this.groups = {};

    _this.getGroups = function() {
        var deferred = $q.defer();
        $http.get("group/")
            .success(function(data) {
                var group;
                deferred.resolve(data.map(function(e){
                    group = new Group(e);
                    _this.groups[e.id] = group;
                    return group;
                }));
            })
            .error(function(err) {
                console.error(err);
                deferred.reject(err);
            });
        return deferred.promise;
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

    function checkGroups() {
        var deferred = $q.defer();
        if(Object.keys(_this.groups).length == 0) {
            deferred.reject();
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    }

    _this.setCurrentGroup = function(newGroupId) {
        return checkGroups()
            .catch(()=>_this.getGroups())
            .then(()=>{
                var deferred = $q.defer();
                var group = _this.groups[newGroupId];
                if(group) {
                    _this.currentGroup = group;
                    deferred.resolve(group);
                } else {
                    deferred.reject("The group does not exists");
                }
                return deferred.promise;
            });
    };
}

app.service('groupService', GroupService);

module.exports = GroupService;