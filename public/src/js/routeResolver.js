'use strict';

define([], function(){
    function resolver(ctrl) {
        return ['$q', '$rootScope',
            function ($q, $rootScope) {
                var deferred = $q.defer();
                require(ctrl, function () {
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            }];
    }
    
    return function (view, ctrl){
        return {
            templateUrl: view,
            resolve: {
                resolver: resolver(ctrl)
            }
        }
    }
});