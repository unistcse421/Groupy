/**
 * Created by Taehyun on 2016-05-02.
 */

var c = require('../connection');

/**
 * Insert Groups
 */
exports.insert = c.prepare(
    "INSERT INTO fb_group (id, name) VALUES (:id , :name) " +
    "ON DUPLICATE KEY UPDATE name = VALUES(name)"
);


/**
 * Select Groups
 */
var selectAll = "SELECT id, name FROM fb_group";

exports.selectAll = c.prepare(selectAll);
exports.selectById = c.prepare(selectAll + " WHERE id = :id");
exports.selectByName = c.prepare(selectAll + " WHERE name = :name");
exports.selectByIdAndName = c.prepare(selectAll + " WHERE id = :id AND name = :name");

/**
 * Delete Group
 */
exports.delete = c.prepare("DELETE FROM fb_group WHERE id = :id");