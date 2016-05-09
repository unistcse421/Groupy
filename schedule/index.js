/**
 * Created by Taehyun on 2016-05-09.
 */

exports.getGroupMessageAndUpdate        = require('./getGroupMessageAndUpdate')('0,30 * * * * *');
exports.checkGroupMessagesAreDeleted    = require('./checkGroupMessagesAreDeleted')('15 */5 * * * *');