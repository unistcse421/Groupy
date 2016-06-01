/**
 * Created by kimxogus on 2016-05-05.
 */

var
    Message     = require("../../model/Message"),
    messageFilter   = require('./messageFilter');

function messagesProcessor(messages, group_id, bool) {
    return messages
        .filter(messageFilter)
        .map(e=>{
            e.group_id = group_id;
            return new Message(e, bool);
        });
}

module.exports = messagesProcessor;