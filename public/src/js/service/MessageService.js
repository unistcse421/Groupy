/**
 * Created by kimxogus on 2016-05-06.
 */
import Message from '../object/Message';
import Hashtag from '../object/Hashtag';
import './GroupService';

let app = global.app;

MessageService.$inject = ['$http', '$q', 'groupService'];

function MessageService($http, $q, groupService){
    var _this = this;
    _this.currentMessage = null;

    _this.getMessagesByGroupIdAndPage = function(group_id, page) {
        var deferred = $q.defer();
        $http.get("group/" + group_id + "/page/" + page)
            .success(function(data) {
                deferred.resolve(data.map(function(e) { return new Message(e)}));
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    };

    _this.getHashtagsOfMessage = function(message_id) {
        var deferred = $q.defer();
        $http.get("message/" + message_id + "/hashtag")
            .success(function(data) {
                deferred.resolve(data.map(function(e) { return new Hashtag(e)}));
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    };
}

app.service('messageService', MessageService);

module.exports = MessageService;