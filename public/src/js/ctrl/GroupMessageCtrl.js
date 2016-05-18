/**
 * Created by kimxogus on 2016-05-05.
 */

import '../service/GroupService';
import '../service/MessageService';

let app = global.app;


GroupMessageCtrl.$inject = ['$scope', '$routeParams', 'groupService', 'messageService'];

function GroupMessageCtrl($scope, $routeParams, GroupService, messageService) {
    let group;
    GroupService.setCurrentGroup($routeParams.id)
        .then((res)=>{
            group = res;
            $scope.groupName = group.name;
            getMessagesOfPage(1);
        })
        .catch((err)=>{
            console.error(err);
        });

    function getMessagesOfPage(page) {
        messageService.getMessagesByGroupIdAndPage(group.id, page)
            .then((messages)=>{
                $scope.messages = messages;
            })
            .catch((err)=>{
                console.error(err);
            });
    }
}


app.controller('groupMessageCtrl', GroupMessageCtrl);

module.exports = GroupMessageCtrl;