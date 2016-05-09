/**
 * Created by Taehyun on 2016-05-09.
 */

var cronTimes = require('./cronTimes');

exports.getGroupMessageAndUpdate        = require('./getGroupMessageAndUpdate')(cronTimes[0]);
exports.checkGroupMessagesAreDeleted    = require('./checkGroupMessagesAreDeleted')(cronTimes[1]);