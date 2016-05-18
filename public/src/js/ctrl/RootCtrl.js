/**
 * Created by kimxogus on 2016-05-05.
 */

import '../service/GroupService'
import '../service/FacebookService'

let app = global.app;

RootCtrl.$inject = ['$scope', 'groupService', 'facebookService'];

function RootCtrl($scope, groupService, facebookService) {
    groupService.getGroups()
        .then((groups)=>{
            $scope.groups = groups;
        });

    $("#fb-root").on('facebook:init', ()=>{
        facebookService.getLoginStatus()
            .then((status)=>{
                console.log(status);
            })
            .catch((err)=>{
                console.error(err);
            });
    });
}

app.controller('rootCtrl', RootCtrl);

module.exports = RootCtrl;