/**
 * Created by Taehyun on 2016-05-09.
 */
var
    PythonShell = require('python-shell'),
    CronJob = require('cron').CronJob,
    async   = require('async'),
    Q       = require('q'),
    FB      = require('../facebook').FB,
    db      = require('../db'),
    c       = db.connection,
    query   = db.query,
    messageProcessor    = require('../facebook/message/messageProcessor');


function getJob(cronTime) {
    return new CronJob({
        cronTime: cronTime,
        onTick: ()=> {
            console.log("Schedule: getGroupMessageAndUpdate");
            c.query(query.group.selectAll(), (err, groups)=> {
                if (err) console.error(err);
                else {
                    async.each(
                        groups,
                        (e)=> {
                            getLatest20Messages(e.id)
                                .then(messages=>refreshSavedMessages(messages))
                                .then((res)=>
                                    Q.Promise((resolve)=> {
                                        console.log("\t" + res.cnt + " of " + res.len + " Messages are Updated in group " + e.id);
                                        resolve(res);
                                    })
                                )
                                .catch(err=>console.error(err));
                        }
                    );
                }
            })
        },
        start: false,
        timeZone: 'Asia/Seoul'
    });
}

function getLatest20Messages(group_id) {
    var deferred = Q.defer();

    console.log("\tUpdating Messages in Group " + group_id);
    FB.api('/' + group_id + '/feed', 'GET', {
        fields: "id,message,updated_time,created_time,type",
        limit: 20
    }, (data) => {
        if(!data) {
            deferred.reject(new Error("FB: Unknown Error"));
        }
        if(!data.data) {
            deferred.reject(new Error("FB: Invalid Return From Facebook"))
        }
        if(data.data) {
            deferred.resolve(messageProcessor(data.data, group_id, true));
        }
    });

    return deferred.promise;
}

// example codes for python-shell: https://github.com/extrabacon/python-shell/tree/master/test
// ../service/insertMessageAndHashtags
function refreshSavedMessages(messages) {
    var deferred = Q.defer();

    var cnt = 0;
    async.each(
        messages,
        (e)=> {
            var push = new PythonShell('push.py', {mode: 'json'});

            push.send(e);

            push.end(function(err){
                if(err) console.error(err);

                cnt++;
                if(cnt >= messages.length) {
                    deferred.resolve({len: messages.length, cnt});
                }
            })
        }
    );

    return deferred.promise;
}

module.exports = getJob;
