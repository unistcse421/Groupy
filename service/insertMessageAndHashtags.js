/**
 * Created by Taehyun on 2016-05-05.
 */

var
    Q       = require('q'),
    db      = require('../db/index'),
    c       = db.connection,
    query   = db.query;

function insertMessageAndHashtags(message, iter) {
    return getQueryAndParam()
        .then((obj)=>
            Q.Promise((resolve, reject)=>{
                //setTimeout(()=>{
                    c.query(obj.query, obj.params, (err) => {
                        if (err) {
                            console.error(err);
                            reject(err);
                        } else {
                            /*console.log("Inserting Data and Hashtags of Message " +
                                message.id + " are Successful", iter);*/
                            resolve(iter);
                        }
                    });
                //}, 5*iter);
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
            deleteRelationQuery = query.messageHashtagRelation.deleteByMessageIdArrayParamQuery,
            deleteMessageQuery  = query.message.deleteByIdArrayParamQuery,
            messageObj  = query.message.insertArrayQuery(message),
            hashtagsObj = query.hashtag.getInsertMultipleQueryAndParam(message.hashtags),
            relationObj = query.messageHashtagRelation.getInsertMultipleQueryAndParam(message.id, message.hashtags);

        var insertQuery = "START TRANSACTION;" + deleteRelationQuery + ";" + deleteMessageQuery + ";"
            + messageObj.query + ";" + hashtagsObj.query + ";" + relationObj.query + ";" + "COMMIT;";

        var insertParams = [message.id, message.id].concat(messageObj.params, hashtagsObj.params, relationObj.params);

        //console.log(insertQuery, insertParams)
        deferred.resolve({query: insertQuery, params: insertParams});

        return deferred.promise;
    }
}

module.exports = insertMessageAndHashtags;