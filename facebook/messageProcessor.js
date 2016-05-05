/**
 * Created by Taehyun on 2016-05-05.
 */

var
    Message     = require("../model/Message"),
    messageFilter   = require('./messageFilter');

function messagesProcessor(messages) {
    return messages
        .filter(messageFilter)
        .map(e=>new Message(e));
}

module.exports = messagesProcessor;