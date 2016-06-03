/**
 * Created by kimxogus on 2016-05-05.
 */

import '../service/GroupService'
import '../service/FacebookService'

let app = global.app;

RootCtrl.$inject = ['$scope', '$window', 'groupService', 'facebookService'];

function RootCtrl($scope, $window, groupService, facebookService) {
    groupService.getGroups()
        .then((groups)=>{
            $scope.groups = groups;
        });

    $("#fb-root").on('facebook:init', ()=>{
        facebookService.getLoginStatus()
            .then((status)=>{
                $scope.facebookOn = facebookService.isFacebookOn();
            })
            .catch((status)=>{
                $scope.facebookOn = facebookService.isFacebookOn();
            });

        facebookService.watchLoginChange(
            ()=>{
                $scope.facebookOn = facebookService.isFacebookOn();
            },
            ()=>{
                $scope.facebookOn = facebookService.isFacebookOn();
            }
        );
    });

    // Window resize event handling
    angular.element($window).bind('resize', function() {
        let width = $window.innerWidth;
        if (width > 700) {
            $("#sidebar").addClass('visible');
            $("#mobile-sidebar").sidebar('hide');
        } else {
            $("#sidebar").removeClass('visible');
        }
    });
}

app.controller('rootCtrl', RootCtrl);

module.exports = RootCtrl;
