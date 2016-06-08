/**
 * Created by kimxogus on 2016-05-05.
 */

import '../service/GroupService'
import '../service/FacebookService'

let app = global.app;

RootCtrl.$inject = ['$rootScope', '$window', 'groupService', 'facebookService'];

function RootCtrl($rootScope, $window, groupService, facebookService) {
    $rootScope.groups = [];
    $rootScope.facebookOn = false;
    
    groupService.getGroups()
        .then((groups)=>{
            $rootScope.groups = groups;
        });

    $rootScope.showSetting = function() {
        return $rootScope.isIOS() && angular.isDefined($rootScope.uuid);
    };

    $("#fb-root").on('facebook:init', ()=>{
        facebookService.getLoginStatus()
            .then((status)=>{
                $rootScope.facebookOn = facebookService.isFacebookOn();
            })
            .catch((status)=>{
                $rootScope.facebookOn = facebookService.isFacebookOn();
            });

        facebookService.watchLoginChange(
            ()=>{
                $rootScope.facebookOn = facebookService.isFacebookOn();
            },
            ()=>{
                $rootScope.facebookOn = facebookService.isFacebookOn();
            }
        );
    });

    $rootScope.isIOS = function() {
        return $("html").hasClass('ios');
    };

    $rootScope.goBack = function() {
        $window.history.back();
    };

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
