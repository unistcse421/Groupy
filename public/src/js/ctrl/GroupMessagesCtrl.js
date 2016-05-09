/**
 * Created by kimxogus on 2016-05-05.
 */

'use strict';
define(['app', 'service/GroupService','service/MessageService'], function(app) {
    app.controller('GroupMessagesCtrl', ['$scope', '$routeParams', 'GroupService', 'MessageService',
        function($scope, $routeParams, GroupService, MessageService) {
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
                MessageService.getMessagesByGroupIdAndPage(group.id, page)
                    .then(function(messages) {
                        $scope.messages = messages;
                    })
                    .catch(function(err) {
                        console.error(err);
                    });
            }
        }])
});