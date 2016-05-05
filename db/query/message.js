/**
 * Created by Taehyun on 2016-05-02.
 */
var c = require('../connection');
var dateToSqlDatetime = require('../util').dateToSqlDatetime;

/**
 * Insert Message
 */
var insertBaseQuery = "INSERT INTO message (id, group_id, message, created_time, updated_time) VALUES ";
var insertValuesQuery = "(:id , :group_id, :message, :created_time, :updated_time)";
var insertMultiValuesQuery = "(?, ?, ?, ?, ?)";
var onDuplicateKeyUpdateQuery = " ON DUPLICATE KEY UPDATE message=VALUES(message) AND updated_time=VALUES(updated_time)";
exports.insert = c.prepare( insertBaseQuery + insertValuesQuery + onDuplicateKeyUpdateQuery);

function getMultipleParams(msgs) {
    var params = [], msg, param;
    for(var i=0, len=msgs.length; i<len; i++) {
        msg = msgs[i];
        param= [msg.uuid, msg['group_id'], msg.message, dateToSqlDatetime(msg['created_time']), dateToSqlDatetime(msg['updated_time'])];
        params = params.concat(param);
    }
    return params;
}

exports.insertMultiple = function(messages) {
    var query = insertBaseQuery + messages.map(function() {return insertMultiValuesQuery}).join(",") + onDuplicateKeyUpdateQuery;
    var params = getMultipleParams(messages);
    return c.prepare(query)(params);
};
/*
 var async = require('async');
 var hashtagQuery = require('./hashtag');
exports.insertMultiple = function(messages, hashtags) {
    async.waterfall([
        function startTransaction(cb) {
            c.query("START TRANSACTION", cb);
        },
        function insertMessages(cb) {
            insertMultipleMessages(messages, cb);
        },
        function insertHashtags(cb) {
            hashtagQuery.insertMultipleHashtags(hashtags, cb);
        },
        function connectMessagesAndHashtags(cb) {

        },
        function commit(cb) {
            c.query("COMMIT", cb);
        }
    ], function(err, res) {
        if(err) throw err;
        console.log(res);
    });
};*/


/**
 * Select Message
 */
var selectAll = "SELECT id, group_id, message, created_time, updated_time FROM message";

exports.selectAll = c.prepare(selectAll);
exports.selectById = c.prepare(selectAll + " WHERE id = :id");
exports.selectByGroupId = c.prepare(selectAll + " WHERE group_id = :group_id");
exports.selectByName = c.prepare(selectAll + " WHERE group_id = :group_id");
exports.selectByIdAndName = c.prepare(selectAll + " WHERE id = :id AND name = :name");

/**
 * Delete Message
 */
exports.delete = c.prepare("DELETE FROM message WHERE id = :id");