/**
 * Created by kimxogus on 2016-05-05.
 */

import '../service/GroupService';
import '../service/MessageService';

let app = global.app;


GroupMessageCtrl.$inject = ['$scope', '$routeParams', 'groupService', 'messageService'];

function GroupMessageCtrl($scope, $routeParams, GroupService, messageService) {
    $('.ui.dropdown').dropdown();

    let
        page = 1,
        group,
        search_keyword = '';

    $scope.search_keyword = '';

    GroupService.setCurrentGroup($routeParams.id)
        .then((res)=> {
            group = res;
            $scope.groupName = group.name;
            $scope.groupId = group.id;
            getMessagesOfPage(1);
        })
        .catch((err)=> {
            console.error(err);
        });

    function getMessagesOfPage(page) {
        messageService.getMessagesByGroupIdAndPage(group.id, page)
            .then((messages)=> {
                $scope.messages = messages;
                $scope.$emit('groupFeed:loaded');
            })
            .catch((err)=> {
                console.error(err);
            });
    }

    // FIXME: After add search feature,  we have to get message by (group.id, page, search_keyword)
    // FIXME: We have to handle the case when there are no more messages
    $scope.getNextPage = function () {
        if (group) {
            page += 1;
            search_keyword = $scope.search_keyword;
            messageService.getMessagesByGroupIdAndPage(group.id, page, {q: search_keyword})
                .then((messages)=> {
                    for (let i = 0, len = messages.length; i < len; i++) {
                        $scope.messages.push(messages[i]);
                    }
                    $scope.$emit('groupFeed:loaded');
                })
                .catch((err)=> {
                    console.error(err);
                });
        }
    };
}


app.controller('groupMessageCtrl', GroupMessageCtrl);

module.exports = GroupMessageCtrl;
