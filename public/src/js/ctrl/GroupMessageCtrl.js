/**
 * Created by kimxogus on 2016-05-05.
 */

import '../service/GroupService';
import '../service/MessageService';

let app = global.app;


GroupMessageCtrl.$inject = ['$scope', '$routeParams', '$location', 'groupService', 'messageService'];

function GroupMessageCtrl($scope, $routeParams, $location, GroupService, messageService) {
    $('.ui.dropdown').dropdown();

    let page = 1;
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

    $scope.showMessage = function(message_id) {
        $location.path("/message/" + message_id);
    };

    // FIXME: After add search feature,  we have to get message by (group.id, page, search_keyword)
    // FIXME: We have to handle the case when there are no more messages
    $scope.getNextPage = function() {
	page += 1;
        messageService.getMessagesByGroupIdAndPage(group.id, page)
            .then((messages)=>{
	        for(let i=0; i<messages.length; i++) {
		    $scope.messages.push(messages[i]);
		}
            })
            .catch((err)=>{
                console.error(err);
            });
    };
}


app.controller('groupMessageCtrl', GroupMessageCtrl);

module.exports = GroupMessageCtrl;
