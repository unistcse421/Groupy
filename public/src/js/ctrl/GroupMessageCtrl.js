/**
 * Created by kimxogus on 2016-05-05.
 */

import '../service/GroupService';
import '../service/MessageService';

let app = global.app;


GroupMessageCtrl.$inject = ['$rootScope', '$scope', '$routeParams', '$location', 'groupService', 'messageService', '$timeout'];

function GroupMessageCtrl($rootScope, $scope, $routeParams, $location, GroupService, messageService, $timeout) {
    let
        page = 1,
        group,
        params,
        search_keyword,
        hashtags;

    setParams();

    $rootScope.$on('$viewContentLoaded', ()=>{
        $('.ui.dropdown').dropdown();
        $timeout(()=>{
            setParams();
            if(hashtags) {
                hashtags.forEach((e)=> {
                    $('.ui.dropdown').dropdown('set selected', e);
                });
            }
        }, 100);
    });

    function setParams() {
        params = $location.search();
        search_keyword = params.search_keyword || null;
        hashtags = params.hashtags
            ? (angular.isArray(params.hashtags)
                ? params.hashtags
                : [params.hashtags])
            : null;
    }

    $scope.search_keyword = search_keyword || null;
    $scope.hashtags = hashtags || null;
    $scope.stopInfiniteScroll = false;

    $scope.$watch("facebookOn", function(newValue){
        if(newValue && $scope.messages) {
            $scope.messages.forEach((m)=>{
                m.updateLikes();
                m.updateComments();
            });
        }
    });


    $(document).on("message:delete", function(e, data) {
        let id = data.id;
        $scope.messages = $scope.messages.filter(m=>m.id !== id);
    });

    $scope.showFooter = function() {
        return $scope.facebookOn;
    };

    GroupService.setCurrentGroup($routeParams.id)
        .then((res)=> {
            group = res;
            $scope.groupName = group.name;
            $scope.groupId = group.id;
            $scope.messages = [];
            getMessagesOfPage(1);
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

    function getMessagesOfPage(page = 1) {
        messageService.getMessagesByGroupIdAndPage(group.id, page, params)
            .then((messages)=> {
                $scope.messages = $scope.messages.concat(messages);
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
        let params = {
            search_keyword: $scope.search_keyword,
            hashtags: $scope.hashtags
        };
        $location.search(params);
    };

    $scope.select = function(hashtag) {
        $scope.hashtags.push(hashtag);
    };

    $scope.showMessage = function(message) {
        messageService.setCurrentMessage(message.id)
            .then(()=>{
                $location.path("/message/" + message.id);
            })
    };

    // FIXME: After add search feature,  we have to get message by (group.id, page, search_keyword)
    // FIXME: We have to handle the case when there are no more messages
    $scope.getNextPage = function () {
        if (group) {
            page += 1;
            getMessagesOfPage(page);
        }
    };
}


app.controller('groupMessageCtrl', GroupMessageCtrl);

module.exports = GroupMessageCtrl;
