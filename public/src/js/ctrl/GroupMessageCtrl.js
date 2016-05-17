/**
 * Created by kimxogus on 2016-05-05.
 */

import '../service/GroupService';
import '../service/MessageService';

let app = global.app;


GroupMessageCtrl.$inject = ['$scope', '$routeParams', 'groupService', 'messageService'];

function GroupMessageCtrl($scope, $routeParams, GroupService, messageService) {
    var group;
    GroupService.setCurrentGroup($routeParams.id)
        .then(function(res) {
            group = res;
            $scope.groupName = group.name;
            getMessagesOfPage(1);
        })
        .catch(function(err) {
            console.error(err);
        });

    function getMessagesOfPage(page) {
        messageService.getMessagesByGroupIdAndPage(group.id, page)
            .then(function(messages) {
                $scope.messages = messages;
            })
            .catch(function(err) {
                console.error(err);
            });
    }
}


app.controller('groupMessageCtrl', GroupMessageCtrl);

module.exports = GroupMessageCtrl;