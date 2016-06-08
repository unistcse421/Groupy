/**
 * Created by kimxogus on 2016-05-05.
 */

let app = global.app;


IndexCtrl.$inject = ['$rootScope', '$routeParams'];

function IndexCtrl($rootScope, $routeParams) {
    let uuid = $routeParams.uuid;

    if(uuid) {
        $("#setting").attr('href', "/push/ios/" + uuid);
    }

    $rootScope.uuid = uuid;
}


app.controller('indexCtrl', IndexCtrl);

module.exports = IndexCtrl;
