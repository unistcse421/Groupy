/**
 * Created by Taehyun on 2016-05-02.
 */

function Message(msg) {
    msg = msg || {id: null, group_id: null, message: null, created_time: null, updated_time: null};
    this.id = msg.id;
    this.group_id = msg.group_id;
    this.message = msg.message;
    this.created_time = msg.created_time;
    this.updated_time = msg.updated_time;
}

module.exports = Message;