/**
 * Created by Taehyun on 2016-05-02.
 */

var
    Q       = require('q'),
    db      = require('../db'),
    c       = db.connection,
    query   = db.query,

    Hashtag = require('./Hashtag');

const defaultMessage = {
    id: null,
    group_id: null,
    message: null,
    created_time: null,
    updated_time: null
};

function Message(msg) {
    msg = msg || defaultMessage;

    this.id = msg.id;
    this.group_id = msg.group_id;
    this.message = msg.message;
    this.created_time = msg.created_time;
    this.updated_time = msg.updated_time;

    this.hashtags = [];

    this.updateHashtags();
}

Message.prototype.updateHashtags = function() {
    var reg_hash = /(^|\s)(#[^\r\s\{\}\[\]\/?.,;:|\)*~`!^\-+#<>@\$%&\\\=\(\'\"]+)/gi;
    var reg_replace = /(\s)/gi;

    var message = this.message;

    var hashtags = [];
    hashtags = hashtags.concat(message.match(reg_hash));
    if(!hashtags[0]) {
        hashtags = [];
    } else {
        hashtags = hashtags.map((e)=>
            new Hashtag(e.replace(reg_replace, "").trim().substr(1))
        );
    }

    this.hashtags = hashtags;
};

Message.prototype.save = function() {
    if(this.hashtags.length < 1) {
        return Promise.resolve();
    }

    var _this = this;
    return startTransaction()
        .then(()=>
            Q.Promise((resolve, reject)=>{
                c.query(query.message.insert(_this), (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            })
        )
        .then(()=>
            Q.Promise((resolve, reject)=>{
                query.hashtag.insertMultiple(_this.hashtags, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            })
        )
        .then(()=>
            Q.Promise((resolve, reject)=>{
                query.messageHashtagRelation.insertMultiple(_this.id, _this.hashtags, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            })
        )
        .then(()=>
            Q.Promise((resolve, reject)=>{
                c.query("COMMIT", (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log("Inserting Data and Hashtags of Message " + _this.id + " are successful");
                        resolve();
                    }
                });
            })
        )
        .catch(err=>
            Q.Promise((resolve, reject)=>{
                console.error("Inserting Data and Hashtags of Message " + _this.id + " are Failed", err);
                c.query("ROLLBACK", ()=>{
                    reject(err);
                });
            })
        );

    function startTransaction() {
        var deferred = Q.defer();
        c.query("START TRANSACTION", (err, res) => {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }
};

module.exports = Message;