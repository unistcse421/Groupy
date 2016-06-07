/**
 * Created by kimxogus on 2016-05-05.
 */

let app = global.app;


IndexCtrl.$inject = ['$scope', '$routeParams'];

function IndexCtrl($scope, $routeParams) {
    let uuid = $routeParams.uuid;

    if(uuid) {
        $("#setting").attr('href', "/push/ios/" + uuid);
    }
}


app.controller('indexCtrl', IndexCtrl);

module.exports = IndexCtrl;
