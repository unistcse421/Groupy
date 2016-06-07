/**
 * Created by kimxogus on 2016-05-02.
 */

var c = require('../connection');

/**
 * Insert Devices
 */
var insertBaseQuery = "INSERT INTO push_info (uuid, group_id, push_keyword, hashtag) VALUES ";
var insertValuesQuery = "(:uuid, :group_id, :push_keyword, :hashtag)";
var insertMultiValuesQuery = "(?, ?, ?, ?, ?)";
exports.insert = c.prepare(insertBaseQuery + insertValuesQuery);
exports.insertMultiple = function(messages) {
    var query = insertBaseQuery + messages.map(function() {return insertMultiValuesQuery}).join(",");
    var params = getMultipleParams(messages);
    return c.prepare(query)(params);
};

function getMultipleParams(push_infos) {
    var params = [], push_info, param;
    for(var i=0, len=push_infos.length; i<len; i++) {
        push_info = push_infos[i];
        param= [push_info.uuid, push_info['group_id'], push_info['push_keyword'], push_info.hashtag];
        params = params.concat(param);
    }
    return params;
}


/**
 * Select Devices
 */
var selectAll = "SELECT uuid, group_id, push_keyword, hashtag FROM push_info";

exports.selectAll = c.prepare(selectAll);
exports.selectByUUID = c.prepare(selectAll + " WHERE uuid = :uuid");
exports.selectByGroupId = c.prepare(selectAll + " WHERE group_id = :group_id");

/**
 * Delete Device
 */
exports.delete = c.prepare("DELETE FROM push_info WHERE uuid = :uuid AND group_id = :group_id AND push_keyword = :push_keyword AND hashtag = :hashtag");
exports.deleteByUUID = c.prepare("DELETE FROM push_info WHERE uuid = :uuid");
exports.deleteByGroupId = c.prepare("DELETE FROM push_info WHERE group_id = :group_id");
