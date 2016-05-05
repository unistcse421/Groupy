/**
 * Created by Taehyun on 2016-05-05.
 */

var
    Q       = require('q'),
    db      = require('../db'),
    c       = db.connection,
    query   = db.query;

function insertMessageAndHashtags(message, iter) {
    return getQueryAndParam()
        .then((obj)=>
            Q.Promise((resolve, reject)=>{
                setTimeout(()=>{
                    c.query(obj.query, obj.params, (err, res) => {
                        if (err) {
                            console.error(err);
                            reject(err);
                        } else {
                            resolve(res);
                            console.log("Inserting Data and Hashtags of Message " +
                                message.id + " are Successful", iter);
                        }
                    });
                }, 5*iter);
            })
        )
        .catch(err=>
            Q.Promise((resolve, reject)=>{
                console.error("Inserting Data and Hashtags of Message " + message.id + " are Failed", err);
                reject();
            })
        );

    function getQueryAndParam() {
        var deferred = Q.defer();

        var
            messageObj  = query.message.insertArrayQuery(message),
            hashtagsObj = query.hashtag.getInsertMultipleQueryAndParam(message.hashtags),
            relationObj = query.messageHashtagRelation.getInsertMultipleQueryAndParam(message.id, message.hashtags);

        var insertQuery = "START TRANSACTION;" + messageObj.query + ";"
            + hashtagsObj.query + ";" + relationObj.query + ";" + "COMMIT;";

        var insertParams = messageObj.params.concat(hashtagsObj.params, relationObj.params);

        deferred.resolve({query: insertQuery, params: insertParams});

        return deferred.promise;
    }
}

module.exports = insertMessageAndHashtags;