/**
 * Created by Taehyun on 2016-05-09.
 */
var
    CronJob = require('cron').CronJob,
    async   = require('async'),
    Q       = require('q'),
    FB      = require('../facebook').FB,
    db      = require('../db'),
    c       = db.connection,
    query   = db.query;

function getJob(cronTime) {
    return new CronJob({
        cronTime: cronTime,
        onTick: ()=> {
            console.log("Schedule: checkGroupMessagesAreDeleted");
            c.query(query.group.selectAll(), (err, groups)=> {
                if (err) console.error(err);
                else {
                    async.each(
                        groups,
                        (e)=> {
                            getLatest30SavedMessagesAndCheck(e.id)
                                .then((res)=>
                                    Q.Promise((resolve)=> {
                                        console.log("\t" + res.cnt + " of " + res.total + " Messages are Deleted in group " + e.id);
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

function getLatest30SavedMessagesAndCheck(group_id) {
    var deferred = Q.defer();

    console.log("\tCheck Messages in Group " + group_id);
    c.query("SELECT id FROM message WHERE group_id=:group_id ORDER BY updated_time DESC LIMIT 50", {group_id: group_id},
        (err, messages)=>{
            if(err) deferred.reject(err);
            else {
                var cnt = 0, iter = 0;
                async.each(
                    messages,
                    (e)=>{
                        FB.api('/' + e.id, 'GET', {
                            fields: "id"
                        }, (data) => {
                            Q.Promise((resolve, reject)=> {
                                if(!data.id || data.error && data.error.code == 100) {
                                    reject(e.id);
                                } else {
                                    resolve();
                                }
                            })
                                .catch(id=>
                                    Q.Promise((resolve, reject)=>{
                                        c.query(query.message.deleteById({id}), (err)=>{
                                            if(err) reject(err);
                                            else {
                                                cnt++;
                                                console.log(id + " is deleted");
                                                resolve();
                                            }
                                        });
                                    })
                                        .catch(err=>console.error(err))
                                )
                                .then(()=>{
                                    iter++;
                                    if(iter>=messages.length) {
                                        deferred.resolve({cnt: cnt, total: messages.length});
                                    }
                                });
                        });
                    }
                );
            }
        });

    return deferred.promise;
}

module.exports = getJob;