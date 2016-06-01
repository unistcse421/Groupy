/**
 * Created by kimxogus on 2016-05-02.
 */

var moment = require('moment');

exports.dateToSqlDatetime = function(date) {
    return moment(date).format("YYYY-MM-DD HH:mm:ss")
};