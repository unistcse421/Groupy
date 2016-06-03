/**
 * Created by Taehyun on 2016-06-03.
 */
/**
 * Crontab Schedules
 */

var schedules = require('../schedule');
schedules.getGroupMessageAndUpdate.start();
schedules.checkGroupMessagesAreDeleted.start();