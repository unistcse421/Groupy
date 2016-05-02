/**
 * Created by Taehyun on 2016-05-02.
 */

var leftPad = require('left-pad');
var morgan = require('morgan');
var FileStreamRotator = require('file-stream-rotator');
var fs = require('fs');

morgan.token('date', function(){
    var date = new Date();
    return  leftPad(date.getDate(), 2, 0) + "/" + leftPad((date.getMonth() + 1), 2, 0) + "/" + date.getFullYear() +
        " " + date.toTimeString().split(" ").splice(0,2).join(" ");
});

var format = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]';

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

module.exports = morgan(format, {stream: accessLogStream});