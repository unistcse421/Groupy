/**
 * Created by l34p on 2016-05-31.
 */

import '../service/FacebookService';
import '../service/MessageService';
import '../filter/TimeFilter'

let app = global.app;


GroupMessageViewCtrl.$inject = ['$scope', '$routeParams', 'facebookService', 'messageService'];

function GroupMessageViewCtrl($scope, $routeParams, facebookService, messageService) {

    let message = null;

    $scope.$on("message:ready", ()=>{
        if($scope.facebookOn) {
            getPostInfoAndUpdate();
        } else {
            $scope.$watch("facebookOn", function(newValue){
                if(newValue && message) {
                    getPostInfoAndUpdate();
                    message.updateLikes();
                    message.updateComments();
                }
            });
        }
    });

    if(messageService.currentMessage) {
        $scope.message = message = messageService.currentMessage;
        $scope.$emit("message:ready");
    } else {
        messageService.setCurrentMessage($routeParams.id)
            .then(msg=> {
                $scope.message = message = msg;
                $scope.$emit("message:ready");
            });
    }

    $scope.showAttachments = function() {
        return message && message.attachments && message.attachments.items.length > 0;
    };

    $scope.showComments = function() {
        return message && message.comments && message.comments.length > 0;
    };

    function getPostInfoAndUpdate() {
        facebookService.getPostInfo(message.id)
            .then(res=>{
                message.setFrom(res.from);
                message.setAttachments(res.attachments);
            })
            .catch(err=> {
                console.error(err);
            });
    }
}


app.controller('groupMessageViewCtrl', GroupMessageViewCtrl);

module.exports = GroupMessageViewCtrl;
