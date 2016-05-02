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
exports.insert = c.prepare( insertBaseQuery + insertValuesQuery);

function getMultipleParams(msgs) {
    var params = [], msg, param;
    for(var i=0, len=msgs.length; i<len; i++) {
        msg = msgs[i];
        param= [msg.id, msg['group_id'], msg.message, dateToSqlDatetime(msg['created_time']), dateToSqlDatetime(msg['updated_time'])];
        params = params.concat(param);
    }
    return params;
}

exports.insertMultiple = function(messages, hashtags) {
    var query = insertBaseQuery + messages.map(function() {return insertMultiValuesQuery}).join(",");
    var params = getMultipleParams(messages);
    console.log(query, params);
    c.query(query, params, function(err, rows) {
        console.log(arguments);
    });
};


/**
 * Select Message
 */
var selectAll = "SELECT id, group_id, message, created_time, updated_time FROM message";

exports.selectAll = c.prepare(selectAll);
exports.selectById = c.prepare(selectAll + " WHERE id = :id");
exports.selectByGroup_id = c.prepare(selectAll + " WHERE group_id = :group_id");
exports.selectByName = c.prepare(selectAll + " WHERE group_id = :group_id");
exports.selectByIdAndName = c.prepare(selectAll + " WHERE id = :id AND name = :name");

/**
 * Delete Message
 */
exports.delete = c.prepare("DELETE FROM message WHERE id = :id");