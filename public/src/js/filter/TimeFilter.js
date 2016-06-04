/**
 * Created by Taehyun on 2016-06-04.
 */
import moment from 'moment'

let app = global.app;

TimeFilter.$inject = [];

function TimeFilter() {
    return function(date) {
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
    }
}


app.filter('timeFilter', TimeFilter);

module.exports = TimeFilter;