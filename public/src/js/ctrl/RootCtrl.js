/**
 * Created by kimxogus on 2016-05-05.
 */

import '../service/GroupService';

let app = global.app;

RootCtrl.$inject = ['$scope', 'groupService'];

function RootCtrl($scope, groupService) {
    groupService.getGroups()
        .then(function(groups) {
            $scope.groups = groups;
        });
}

app.controller('rootCtrl', RootCtrl);

module.exports = RootCtrl;