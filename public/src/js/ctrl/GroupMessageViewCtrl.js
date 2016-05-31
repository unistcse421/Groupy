/**
 * Created by l34p on 2016-05-31.
 */

import '../service/GroupService';
import '../service/MessageService';

let app = global.app;


GroupMessageViewCtrl.$inject = ['$scope', '$routeParams', 'groupService', 'messageService'];

function GroupMessageViewCtrl($scope, $routeParams, GroupService, messageService) {

    let message;

    messageService.setCurrentMessage($routeParams.id)
        .then((res)=>{
	    message = res[0];
            $scope.message = message;
        })
        .catch((err)=>{
            console.error(err);
        });
}


app.controller('groupMessageViewCtrl', GroupMessageViewCtrl);

module.exports = GroupMessageViewCtrl;
