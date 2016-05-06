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
        updated_time: null
    };

    function Message(msg) {
        msg = msg || defaultMessage;

        this.id = msg.id;
        this.group_id = msg.group_id;
        this.message = msg.message;
        this.created_time = msg.created_time;
        this.updated_time = msg.updated_time;

        this.hashtags = [];
    }

    Message.prototype.addHashtag = function(hashtag) {
        this.hashtags.push(hashtag);
    };

    Message.prototype.setHashtags = function(hashtags) {
        this.hashtags = hashtags;
    };

    return Message;
});