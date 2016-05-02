/**
 * Created by Taehyun on 2016-05-02.
 */
var Client = require('mariasql');

var client = new Client({
    host: 'ssh.blueberry.ml',
    user: 'groupyghost',
    password: 'groupy12345',
    db: 'groupy',
    multiStatements: true
});

/**
 * Execute Validation Query
 */
client.query("SELECT 1 FROM DUAL", function(err, rows) {
    if(err) throw err;

    console.log("DB Connection Succesfully Open");
});

module.exports = client;