/**
 * Created by kimxogus on 2016-05-06.
 */

let app = global.app;

PushService.$inject = ['$rootScope', '$http', '$q'];

function PushService($rootScope, $http, $q) {
    let _this = this;

    _this.getDeviceInfo = function(uuid) {
        let deferred = $q.defer();

        $http.get("push/ios/" + uuid)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    };

    _this.getRegKeywords = function(uuid) {
        let deferred = $q.defer();

        $http.get("push/keyword/ios/" + uuid)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    };

    _this.setAlarm = function(uuid, keyword, group_id) {
        let deferred = $q.defer();

        $http.put("push/add/" + keyword + "/" + group_id + "/1/ios/" + uuid)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    _this.delAlarm = function(uuid, keyword, group_id) {
        let deferred = $q.defer();

        $http.put("push/del/" + keyword + "/" + group_id + "/1/ios/" + uuid)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    _this.update = function(uuid, flag) {
        let deferred = $q.defer();

        $http.put("push/update/" + flag + "/ios/" + uuid)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }
}

app.service('pushService', PushService);

module.exports = PushService;
