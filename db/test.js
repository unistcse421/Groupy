/**
 * Created by Taehyun on 2016-05-02.
 */

var c = require('./connection');
var query = require('./query');

c.query(query.group.selectAll(), function(err, rows) {
    if(err) console.error(err);

    console.log(rows);
});

query.message.insertMultiple([
    {uuid: '123', group_id: '123', message: '123', created_time: new Date(), updated_time: new Date()},
    {uuid: '123', group_id: '123', message: '123', created_time: new Date(), updated_time: new Date()}
]);

c.end();
