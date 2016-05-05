/**
 * Created by Taehyun on 2016-05-05.
 */

var
    Q       = require('q'),
    FB      = require('./FB'),
    config  = require('../config'),

    c                   = require('../db/connection'),
    groupInsertQuery    = require('../db/query/group').insert,
    Group               = require('../model/Group'),
    getGroupInfo        = require('./getGroupInfo');


/**
 * Test code: register 잉력시장
 */
function test() {
    setTimeout(function () {
        registerGroup(515467085222538)
            .then(group=>console.log("DONE", group))
            .catch(err=>console.error(err));
    }, 1000);
}


function registerGroup(group_id){
    return getGroupInfo(group_id)
        .then(group=>insertGroup(group));
}

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

module.exports = registerGroup;