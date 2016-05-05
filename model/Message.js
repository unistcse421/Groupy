/**
 * Created by Taehyun on 2016-05-02.
 */

var
    Hashtag = require('./Hashtag');

const defaultMessage = {
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

    this.updateHashtags();
}

Message.prototype.updateHashtags = function() {
    var reg_hash = /(^|\s)(#[^\r\s\{\}\[\]\/?.,;:|\)*~`!^\-+#<>@\$%&\\\=\(\'\"]+)/gi;
    var reg_replace = /(\s)/gi;

    var message = this.message;

    var hashtags = [];
    hashtags = hashtags.concat(message.match(reg_hash));
    if(!hashtags[0]) {
        hashtags = [];
    } else {
        hashtags = hashtags.map((e)=>
            new Hashtag(e.replace(reg_replace, "").trim().substr(1))
        );
    }

    this.hashtags = hashtags;
};

module.exports = Message;