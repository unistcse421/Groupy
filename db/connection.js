/**
 * Created by kimxogus on 2016-05-02.
 */
var Client = require('mariasql');
var config = require('../config').db;

var conn = new Client(config);

conn.on('connect', function() {
    console.log("MariaDB connected");
}).on('error', function(err) {
    console.error("MariaDB error: " + err);
}).on('close', function() {
    console.log("MariaDB connection Closed");
});

/**
 * Execute Validation Query
 */
conn.query("SELECT 1 FROM DUAL", function(err, rows) {
    if(err) throw err;

    console.log("DB Connection Successfully Open");
});

module.exports = conn;