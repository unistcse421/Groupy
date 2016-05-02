/**
 * Created by Taehyun on 2016-05-02.
 */

var c = require('../connection');

/**
 * Insert Devices
 */
exports.insert = c.prepare("INSERT INTO device (uuid, push_enabled) VALUES (:uuid, :push_enabled)");


/**
 * Select Devices
 */
var selectAll = "SELECT uuid, push_enabled FROM device";

exports.selectAll = c.prepare(selectAll);
exports.selectByUUID = c.prepare(selectAll + " WHERE uuid = :uuid");
exports.selectByPushEnabled = c.prepare(selectAll + " WHERE push_enabled = :push_enabled");

/**
 * Delete Device
 */
exports.delete = c.prepare("DELETE FROM device WHERE uuid = :uuid");