/**
 * Created by Taehyun on 2016-05-02.
 */

var c = require('./connection');
var query = require('./query');

c.query(query.group.selectAll(), function(err, rows) {
    if(err) console.error(err);

    console.log(rows);
});

c.end();