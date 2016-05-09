/**
 * Created by kimxogus on 2016-05-05.
 */

'use strict';
define(['app', 'service/GroupService','service/MessageService'], function(app) {
    app.controller('GroupMessagesCtrl', ['$scope', '$routeParams', 'groupService', 'messageService',
        function($scope, $routeParams, groupService, messageService) {
            var group;
            groupService.setCurrentGroup($routeParams.id)
                .then(function(res) {
                    group = res;
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
        }])
});