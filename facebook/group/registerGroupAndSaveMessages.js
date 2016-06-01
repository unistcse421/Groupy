/**
 * Created by kimxogus on 2016-05-05.
 */

var
    Q       = require('q'),
    config  = require('../../config'),

    c               = require('../../db/connection'),
    getGroupInfo    = require('./getGroupInfo'),
    insertGroup     = require('../../service/insertGroup'),
    registerGroup   = require('./registerGroup'),
    getAllMessagesAndSave = require('../message/getAllMessagesAndSave');


/**
 * Test code: register And Save 잉력시장
 */
//test();
function test() {
    setTimeout(function () {
        registerGroupAndSaveMessages(515467085222538)
            .then(group=>console.log("DONE", group))
            .catch(err=>console.error(err))
            .then(()=>{
                console.log("DONE");
                c.end();
            });
    }, 1000);
}

function registerGroupAndSaveMessages(group_id) {
    var registered;
    return registerGroup(group_id)
        .then(group=>{
            registered = group;
            return getAllMessagesAndSave(group.id);
        })
        .then(res=>
            Q.Promise((resolve)=>{
                resolve({
                    group: registered,
                    inserted: res.cnt,
                    total: res.len
                });
            })
        )
}

module.exports = registerGroupAndSaveMessages;