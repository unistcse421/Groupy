/**
 * Created by Taehyun on 2016-05-05.
 */

var
    async   = require('async'),
    Q       = require('q'),
    request = require('request'),
    FB      = require('./FB'),
    Message = require('../model/Message'),
    
    messageProcessor = require('./messageProcessor'),
    insertMessageAndHashtags    = require('./insertMessageAndHashtags');

/**
 * Test code: Get Messages from 잉력시장
 */
//test();
function test() {
    setTimeout(function() {
        getAllMessagesAndSave(515467085222538)
            .then((cnt)=>console.log(cnt))
            .catch(err=>console.error(err))
            .then(()=>console.log("DONE"))
            .done();
    }, 1000);
}

function getAllMessagesAndSave(group_id) {
    return getAllMessages(group_id)
        .then(messages =>
            Q.Promise((resolve)=>{
                var cnt = 0, iter = 0;
                async.each(
                    messages,
                    (e)=>{
                        insertMessageAndHashtags(e, ++iter)
                            .then((iterCnt)=>{
                                cnt++;
                                if(iterCnt >= messages.length) {
                                    resolve({len: messages.length, cnt});
                                }
                            })
                            .catch(()=>{})
                    }
                );
            }))
        .then((res)=>
            Q.Promise((resolve)=>{
                console.log(res.cnt + " of " + res.len + " Messages are Inserted");
                resolve(res.cnt);
            })
        );
}

var msgCnt = 0, msgs;
var cnt = 0, messages = [];

function getAllMessages(group_id) {
    var deferred = Q.defer();

    console.log("Crawling Messages in Group " + group_id);
    FB.api('/' + group_id + '/feed', 'GET', {
        fields: "id,message,updated_time,created_time,type",
        limit: 50
    }, (data) => {
        if(!data) {
            deferred.reject(new Error("FB: Unknown Error"));
        }
        if(!data.data) {
            deferred.reject(new Error("FB: Invalid Return From Facebook"))
        }
        if(data.paging && data.paging.next) {
            requestNextMessages(data.paging.next, group_id)
                .then(messages=>deferred.resolve(messages))
                .catch(err=>deferred.reject(err));
        }
        if(data.data) {
            msgs = messageProcessor(data.data, group_id);
            messages = messages.concat(msgs);
            msgCnt += msgs.length;
        }
    });

    return deferred.promise;
}

function requestNextMessages(url, group_id) {
    var deferred = Q.defer();
    req(url, cnt);
    function req(nextUrl, recursionCnt) {
        request(nextUrl, {headers: {'content-type': 'application/json'}}, (err, res, body) => {
            if (err) {
                console.error(err);
                cnt = recursionCnt;
                finishRecursion();
            } else {
                body = JSON.parse(body);
                if(body.data.length == 0) {
                    cnt = recursionCnt;
                    finishRecursion();
                } else {
                    msgs = messageProcessor(body.data, group_id);
                    messages = messages.concat(msgs);
                    msgCnt += msgs.length;
                    if(body.paging && body.paging.next) {
                        req(body.paging.next, ++recursionCnt);
                    } else {
                        cnt = recursionCnt;
                        finishRecursion();
                    }
                }
            }
        });
    }

    function finishRecursion() {
        if(messages.length == msgCnt) {
            console.log("Crawling Messages Done.");
            deferred.resolve(messages);
        } else {
            deferred.reject(new Error("Message Processing Not finished Successfully"));
        }
    }

    return deferred.promise;
}