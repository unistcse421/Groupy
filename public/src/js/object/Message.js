/**
 * Created by kimxogus on 2016-05-06.
 */
import fetch from 'isomorphic-fetch'
import Hashtag from './Hashtag'
import Comment from './Comment'

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

    FB.api('/' + _this.id + '/likes',
        'GET',
        { limit: 20 },
        function(res) {
            if(res.error) {
                handleError(res.error, _this.id);
            } else {
                getNextLikes(res);
            }
        }
    );

    function getNextLikes(res) {
        _this.likes += res.data.length;
        if(res.paging && res.paging.next) {
            fetch(res.paging.next)
                .then(res=>res.json())
                .then(getNextLikes);
        }
    }
};

Message.prototype.updateComments = function() {
    let _this = this;
    _this.comments = [];

    FB.api('/' + _this.id + '/comments',
        'GET',
        { limit: 20 },
        function(res) {
            if(res.error) {
                handleError(res.error, _this.id);
            } else {
                getNextComments(res);
            }
        }
    );

    function getNextComments(res) {
        _this.comments = _this.comments.concat(res.data.map(c=>new Comment(c)));
        if(res.paging && res.paging.next) {
            fetch(res.paging.next)
                .then(getNextComments);
        }
    }
};

function handleError(err, id) {
    console.error(err);
    if(err.code === 100) {
        fetch("/message/validate/" + id)
            .then(res=>res.json())
            .then(res=> {
                if (res.msg === "success") {
                    $(document).trigger("message:delete", id);
                }
            });
    }
}



module.exports = Message;
