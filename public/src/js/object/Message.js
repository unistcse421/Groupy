/**
 * Created by Taehyun on 2016-05-06.
 */
'use strict';
define(['object/Hashtag'], function(Hashtag){

    var defaultMessage = {
        id: null,
        group_id: null,
        message: null,
        created_time: null,
        updated_time: null,
        hashtags: []
    };

    function Message(msg) {
        msg = msg || defaultMessage;

        this.id = msg.id;
        this.group_id = msg.group_id;
        this.message = msg.message
            .replace(/</g, "&lt")
            .replace(/>/g, "&gt")
            .replace(/\n/g, "<br>");
        this.created_time = msg.created_time;
        this.updated_time = msg.updated_time;

        if(msg.hashtags) {
            this.hashtags = msg.hashtags.split(",").map(function(e){ return new Hashtag(e)});
        } else {
            this.hashtags = [];
        }
    }

    return Message;
});