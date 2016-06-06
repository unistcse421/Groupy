/**
 * Created by l34p on 2016-05-31.
 */

import '../service/FacebookService';
import '../service/MessageService';
import '../filter/TimeFilter'

let app = global.app;


GroupMessageViewCtrl.$inject = ['$scope', '$route', '$routeParams', 'facebookService', 'messageService'];

function GroupMessageViewCtrl($scope, $route, $routeParams, facebookService, messageService) {

    $scope.message = null;
    $scope.$on("message:ready", ()=>{
        if($scope.facebookOn) {
            getPostInfoAndUpdate();
        } else {

            if($scope.fbsdkLoaded) {
                login();
            } else {
                $("#fb-root").on("facebook:init", login);
            }

            function login() {
                facebookService.getLoginStatus()
                    .then(status=>{
                        if(status === 'connected') {
                            getPostInfoAndUpdate()
                                .then(()=>{
                                    $scope.message.updateLikes();
                                    $scope.message.updateComments();
                                });
                        } else {
                            $(".ui.large.modal").modal({closable: false}).modal("show");
                            facebookService.login()
                                .then(()=>{
                                    $(".ui.large.modal").modal("hide");
                                    $route.reload();
                                });
                        }
                    });
            }
        }
    });

    if(messageService.currentMessage) {
        $scope.message = messageService.currentMessage;
        $scope.$emit("message:ready");
    } else {
        messageService.setCurrentMessage($routeParams.id)
            .then(msg=> {
                $scope.message = msg;
                $scope.$emit("message:ready");
            });
    }

    $scope.showAttachments = function() {
        let message = $scope.message;
        return message && message.attachments && message.attachments.items.length > 0;
    };

    $scope.showComments = function(comment) {
        let parent = comment || $scope.message;
        return parent && parent.comments && parent.comments.length > 0;
    };

    function getPostInfoAndUpdate() {
        return facebookService.getPostInfo($scope.message.id)
            .then(res=>{
                $scope.message.setFrom(res.from);
                $scope.message.setAttachments(res.attachments);
            })
            .catch(err=> {
                console.error(err);
            });
    }
}


app.controller('groupMessageViewCtrl', GroupMessageViewCtrl);

module.exports = GroupMessageViewCtrl;
