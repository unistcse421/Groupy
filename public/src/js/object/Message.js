/**
 * Created by kimxogus on 2016-05-06.
 */
import fetch from 'isomorphic-fetch'
import Hashtag from './Hashtag'
import Comment from './Comment'
import Photo from './Photo'
import Link from './Link'

var defaultMessage = {
    id: null,
    from : {
        name: null,
        id: null
    },
    attachments: {
        items: []
    },
    likes: 0,
    comments: [],
    group_id: null,
    message: null,
    created_time: null,
    updated_time: null,
    hashtags: []
};

function Message(msg, fb = false) {
    msg = Object.assign({}, defaultMessage, msg);

    this.id = msg.id;
    this.from = msg.from;
    this.attachments = msg.attachments;
    this.group_id = msg.group_id;
    this.message = msg.message
        .replace(/</g, "&lt")
        .replace(/>/g, "&gt")
        .replace(/\n/g, "<br>");

    this.created_time = msg.created_time;
    this.updated_time = msg.updated_time;

    if(msg.hashtags && msg.hashtags.length > 0) {
        this.hashtags = msg.hashtags.indexOf(',') != -1
            ? msg.hashtags.split(",").map(function(e){ return new Hashtag(e)})
            : [new Hashtag(msg.hashtags)];
    }

    if(fb) {
        this.updateLikes();
        this.updateComments();
    } else {
        this.comments = msg.comments;
        this.likes = msg.likes;
    }
}

Message.prototype.setFrom = function(from = {id: null, name: null}) {
    this.from.id = from.id;
    this.from.name = from.name;
};

Message.prototype.setAttachments = function(attachments = {data: []}) {
    let
        _this = this,
        data = attachments.data,
        e;

    _this.attachments.items = [];

    getData(data);

    function getData(data) {
        data = data.filter(e=>!!e.media);
        for(let i=0, len=data.length; i<len; i++) {
            e = data[i];
            if(e.subattachments) {
                let subData = e.subattachments.data;
                getData(subData);
            } else {
                _this.attachments.items.push(
                    e.media ? new Photo(e) : new Link(e)
                );
            }
        }
    }
};


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
        if(res.data) {
            _this.likes += res.data.length;
            if (res.paging && res.paging.next) {
                fetch(res.paging.next)
                    .then(res=>res.json())
                    .then(getNextLikes);
            }
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
        if(res.data) {
            _this.comments = _this.comments.concat(res.data.map(c=>new Comment(c)));
            if (res.paging && res.paging.next) {
                fetch(res.paging.next)
                    .then(res=>res.json())
                    .then(getNextComments);
            }
        }
    }
};

function handleError(err, id) {
    console.error(err);
    if(err.code === 100) {
        fetch("/message/validate/" + id, {headers: {"x-api-request": true}})
            .then(res=>res.json())
            .then(res=> {
                if (res.msg === "success") {
                    $(document).trigger("message:delete", [{id: id}]);
                }
            });
    }
}



module.exports = Message;
