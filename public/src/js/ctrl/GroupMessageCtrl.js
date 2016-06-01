/**
 * Created by kimxogus on 2016-05-05.
 */

import '../service/GroupService';
import '../service/MessageService';

let app = global.app;


GroupMessageCtrl.$inject = ['$rootScope', '$scope', '$routeParams', '$location', 'groupService', 'messageService'];

function GroupMessageCtrl($rootScope, $scope, $routeParams, $location, GroupService, messageService) {
    $rootScope.$on('$viewContentLoaded', ()=>{
        $('.ui.dropdown').dropdown();
    });

    $scope.search_keyword = $location.search()['search_keyword'];
    $scope.stopInfiniteScroll = false;

    let
        page = 1,
        group,
        search_keyword = $scope.search_keyword;


    GroupService.setCurrentGroup($routeParams.id)
        .then((res)=> {
            group = res;
            $scope.groupName = group.name;
            $scope.groupId = group.id;
            getMessagesOfPage(1, $location.search());
        })
        .catch((err)=> {
            console.error(err);
        });

    GroupService.getHashtags($routeParams.id, $location.search())
        .then(hashtags=>{
            $scope.hashtagOptions = hashtags;
        })
        .catch(err=>{
            console.error(err);
        });

    function getMessagesOfPage(page, params) {
        messageService.getMessagesByGroupIdAndPage(group.id, page, params)
            .then((messages)=> {
                $scope.messages = messages;
                $scope.$emit('groupFeed:loaded');
                if(messages.length == 0) {
                    $scope.stopInfiniteScroll = true;
                }
            })
            .catch((err)=> {
                console.error(err);
            });
    }

    $scope.search = function() {
        let search_keyword = $scope.search_keyword;
        $location.search({search_keyword});
        /*
        page = 1;
        getMessagesOfPage(group.id, page, {search_keyword});
        */
    };

    $scope.select = function(hashtag) {
        $scope.hashtags.push(hashtag);
    };

    $scope.showMessage = function(message_id) {
        $location.path("/message/" + message_id);
    };

    // FIXME: After add search feature,  we have to get message by (group.id, page, search_keyword)
    // FIXME: We have to handle the case when there are no more messages
    $scope.getNextPage = function () {
        if (group) {
            page += 1;
            messageService.getMessagesByGroupIdAndPage(group.id, page, {search_keyword})
                .then((messages)=> {
                    for (let i = 0, len = messages.length; i < len; i++) {
                        $scope.messages.push(messages[i]);
                    }
                    $scope.$emit('groupFeed:loaded');
                    if(messages.length == 0) {
                        $scope.stopInfiniteScroll = true;
                    }
                })
                .catch((err)=> {
                    console.error(err);
                });
        }
    };
}


app.controller('groupMessageCtrl', GroupMessageCtrl);

module.exports = GroupMessageCtrl;
