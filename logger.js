/**
 * Created by Taehyun on 2016-05-02.
 */

var moment = require('moment');
var morgan = require('morgan');
var FileStreamRotator = require('file-stream-rotator');
var fs = require('fs');

morgan.token('date', function(){
    var date = new Date();
    return  moment(date).format("DD/MM/YYYY HH:mm:ss") + " "
        + date.toTimeString().split(" ").splice(0,2).join(" ");
});

var format = ':remote-addr - [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]';

var logDirectory = __dirname + '/log';

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: logDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false
});

module.exports = morgan(format, {
    stream: process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === "production"
        ? accessLogStream : process.stdout
});