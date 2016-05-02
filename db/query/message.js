/**
 * Created by Taehyun on 2016-05-02.
 */

var c = require('../connection');

/**
 * Insert Message
 */
var insertBaseQuery = "INSERT INTO message (id, group_id, message, created_time, updated_time) ";
var insertValuesQuery = "VALUES (:id , :group_id, :message, :created_time, :updated_time)";
exports.insert = c.prepare( insertBaseQuery + insertValuesQuery);
exports.insertMultiple = function(messages) {
    return c.prepare(insertBaseQuery + messages.map(function() {return insertValuesQuery}).join(" "));
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