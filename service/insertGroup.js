/**
 * Created by Taehyun on 2016-05-08.
 */
var
    Q       = require('q'),
    c       = require('../db/connection'),
    groupInsertQuery    = require('../db/query/group').insert,
    Group               = require('../model/Group');
    

function insertGroup(group) {
    var deferred = Q.defer();

    if(group.constructor !== Group) {
        deferred.reject(new Error("Invalid Type of group: It should be an instance of Group!"));
    }

    c.query(groupInsertQuery(group), (err)=>{
        if(err) {
            if(err.code === 1062) {
                deferred.reject(new Error(group.name + " is already registered."));
            } else {
                deferred.reject(err)
            }
        } else {
            deferred.resolve(group);
        }
    });

    return deferred.promise;
}

module.exports = insertGroup;