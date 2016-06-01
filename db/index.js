/**
 * Created by kimxogus on 2016-05-02.
 */

var db = {
    connection: require('./connection'),
    query: require('./query')
};

global.db = module.exports = db;