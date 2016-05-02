/**
 * Created by Taehyun on 2016-05-02.
 */
var Client = require('mariasql');

var conn = new Client({
    host: 'ssh.blueberry.ml',
    user: '',
    password: '',
    db: 'groupy',
    multiStatements: true
});

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