/**
 * Created by kimxogus on 2016-05-06.
 */
import Message from '../object/Message';
import Hashtag from '../object/Hashtag';
import './GroupService';

let app = global.app;

MessageService.$inject = ['$http', '$q', 'groupService', 'facebookService'];

function MessageService($http, $q, groupService, facebookService){
    let _this = this;
    _this.currentMessage = null;

    _this.getMessagesByGroupIdAndPage = function(group_id, page, params = {}) {
        let deferred = $q.defer();
        $http.get("group/" + group_id + "/page/" + page, {params})
            .success(function(data) {
                let isFacebookOn = facebookService.isFacebookOn();
                deferred.resolve(data.map(function(e) { return new Message(e, isFacebookOn)}));
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    };

    _this.getHashtagsOfMessage = function(message_id) {
        let deferred = $q.defer();
        $http.get("message/" + message_id + "/hashtag")
            .success(function(data) {
                deferred.resolve(data.map(function(e) { return new Hashtag(e)}));
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    };

    _this.getMessage = function(message_id) {
        let deferred = $q.defer();

        $http.get("message/" + message_id)
            .success(function(data) {
                deferred.resolve(new Message(data));
            })
            .error(function(err) {
                deferred.reject(err)
            });

        return deferred.promise;
    };

    _this.setCurrentMessage = function(message_id) {
        let deferred = $q.defer();
        $http.get("message/" + message_id)
            .success(function(res) {
                let message = new Message(res[0]);
                if(facebookService.isFacebookOn()) {
                    message.updateLikes();
                    message.updateComments();
                }
                _this.currentMessage = message;
                deferred.resolve(message);
            })
            .error(function(err) {
                deferred.reject(err);
            });
	    return deferred.promise;
    };
}

app.service('messageService', MessageService);

module.exports = MessageService;
