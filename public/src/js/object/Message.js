/**
 * Created by kimxogus on 2016-05-06.
 */
import fetch from 'isomorphic-fetch'
import Hashtag from './Hashtag'

var defaultMessage = {
    id: null,
    group_id: null,
    message: null,
    created_time: null,
    updated_time: null,
    hashtags: []
};

function Message(msg, fb = false) {
    msg = msg || defaultMessage;

    this.id = msg.id;
    this.group_id = msg.group_id;
    this.message = msg.message
        .replace(/</g, "&lt")
        .replace(/>/g, "&gt")
        .replace(/\n/g, "<br>");

    this.created_time = msg.created_time;
    this.updated_time = msg.updated_time;

    this.likes = null;
    this.comments = null;

    if(msg.hashtags) {
        this.hashtags = msg.hashtags.indexOf(',') != -1
            ? msg.hashtags.split(",").map(function(e){ return new Hashtag(e)})
            : [new Hashtag(msg.hashtags)];
    } else {
        this.hashtags = [];
    }

    if(fb) {
        this.updateLikes();
        this.updateComments();
    }
}

Message.prototype.updateLikes = function() {
    let _this = this;
    _this.likes = 0;

    FB.api('/' + id + '/likes',
        'GET',
        { limit: 20 },
        function(res) {
            if(res.error) {
                console.error(res.error);
            } else {
                getNextLikes(res);
            }
        }
    );

    function getNextLikes(res) {
        _this.likes += res.data.length;
        if(res.paging && res.paging.next) {
            fetch(res.paging.next)
                .then(getNextLikes);
        }
    }
};

Message.prototype.updateComments = function() {
    let _this = this;
    _this.likes = 0;

    FB.api('/' + id + '/comments',
        'GET',
        { limit: 20 },
        function(res) {
            if(res.error) {
                console.error(res.error);
            } else {
                getNextLikes(res);
            }
        }
    );

    function getNextLikes(res) {
        _this.likes += res.data.length;
        if(res.paging && res.paging.next) {
            fetch(res.paging.next)
                .then(getNextLikes);
        }
    }
};



module.exports = Message;
