/**
 * Created by Taehyun on 2016-05-02.
 */

var c = require('../connection');

/**
 * Insert Devices
 */
exports.insert = c.prepare("INSERT INTO push_info (uuid, group_id, push_keyword, hashtag) VALUES (:uuid, :group_id, :push_keyword, :hashtag)");


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
exports.delete = c.prepare("DELETE FROM push_info WHERE uuid = :uuid AND group_id = :group_id AND push_keyword :push_keyword AND hashtag = :hashtag");
exports.deleteByUUID = c.prepare("DELETE FROM push_info WHERE uuid = :uuid");
exports.deleteByGroupId = c.prepare("DELETE FROM push_info WHERE group_id = :group_id");