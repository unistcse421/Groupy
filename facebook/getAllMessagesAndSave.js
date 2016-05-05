/**
 * Created by Taehyun on 2016-05-05.
 */

var
    Q       = require('q'),
    request = require('request'),
    FB      = require('./FB'),
    Message = require('../model/Message'),
    
    messageProcessor = require('./messageProcessor');

/**
 * Test code: Get Messages from 잉력시장
 */
test();
function test() {
    setTimeout(function() {
        getAllMessages(515467085222538)
    }, 1000);
}

var msgCnt = 0;
var cnt = 0, messagePages = {}, messages;

function getAllMessages(group_id) {
    var deferred = Q.defer();
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
            requestNextMessages(data.paging.next);
        }
        if(data.data) {
            var msgs = messagePages[cnt++] = messageProcessor(data.data);
            msgCnt += msgs.length;
        }
    });

    return deferred.promise;
}

function requestNextMessages(url) {
    var deferred = Q.defer();
    req(url, cnt);
    function req(nextUrl, iterCnt) {
        request(nextUrl, {headers: {'content-type': 'application/json'}}, (err, res, body) => {
            if (err) {
                console.error(err);
                cnt = iterCnt;
                end();
            } else {
                console.log(iterCnt);
                body = JSON.parse(body);
                if(body.data.length == 0) {
                    cnt = iterCnt;
                    end();
                } else {
                    var msgs = messagePages[++iterCnt] = messageProcessor(body.data);
                    msgCnt += msgs.length;
                    if(body.paging && body.paging.next) {
                        req(body.paging.next, iterCnt);
                    } else {
                        cnt = iterCnt;
                        end();
                    }
                }
            }
        });
    }

    function end() {
        messages = [];
        for (var i=0; i <= cnt; i++) {
            messages = messages.concat(messagePages[i]);
        }
        console.log(messages.length, msgCnt);
        deferred.resolve(messages);
    }

    return deferred.promise;
}