/**
 * Created by Taehyun on 2016-05-05.
 */

var
    Q   = require('q'),
    FB  = require('./FB'),
    
    Group   = require('../model/Group');


function getGroupInfo(group_id) {
    var deferred = Q.defer();
    FB.api('/' + group_id, 'GET', {fields: 'name,id,privacy'},
        function(res) {
            if(!res) {
                deferred.reject(new Error("FB: Unknown Error"));
            }
            if(!res.id || !res.name || !res.privacy) {
                deferred.reject(new Error("FB: Invalid Return From Facebook"))
            }
            if(res.privacy !== "OPEN") {
                deferred.reject(new Error("FB: It's Not an Open Group"));
            }
            deferred.resolve(new Group(res));
        });
    return deferred.promise;
}

module.exports = getGroupInfo;