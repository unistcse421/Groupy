/**
 * Created by Taehyun on 2016-05-02.
 */

var c = require('../connection');


/**
 * Insert Message_hashtag Relations
 */
var insertBaseQuery = "INSERT IGNORE INTO message_hashtag (message_id, hashtag) VALUES ";
var insertValuesQuery = "(:message_id, hashtag)";
var insertMultiValuesQuery = "(?, ?)";

exports.insert = c.prepare( insertBaseQuery + insertValuesQuery);
exports.getInsertMultipleQueryAndParam = function(id, hashtags) {
    var query = insertBaseQuery + hashtags.map(function() {return insertMultiValuesQuery}).join(",");
    var params = getMultipleRelationParams(id, hashtags);
    return {query, params};
};

function getMultipleRelationParams(id, hashtags) {
    var params = [], hashtag, param;
    for(var i=0, len=hashtags.length; i<len; i++) {
        hashtag = hashtags[i];
        param = [id, hashtag.hashtag];
        params = params.concat(param);
    }
    return params;
}


/**
 * Select Message_hashtag Relations
 */
var selectAll = "SELECT message_id, hashtag FROM message_hashtag";

exports.selectAll = c.prepare(selectAll);
exports.selectByMessageIdAndHashtag = c.prepare(selectAll + " WHERE message_id = :message_id AND hashtag = :hashtag");
exports.selectByHashtag = c.prepare(selectAll + " WHERE hashtag = :hashtag");

/**
 * Delete Message_hashtag Relations
 */
exports.delete = c.prepare("DELETE FROM message_id WHERE message_id = :message_id AND hashtag = :hashtag");
exports.deleteByHashtag = c.prepare("DELETE FROM message_id WHERE hashtag = :hashtag");
exports.deleteByMessageId = c.prepare("DELETE FROM message_id WHERE message_id = :message_id ");