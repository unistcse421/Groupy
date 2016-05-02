/**
 * Created by Taehyun on 2016-05-02.
 */

var c = require('../connection');


/**
 * Insert Message_hashtag Relations
 */
var insertBaseQuery = "INSERT INTO message_hashtag (message_id, hashtag) VALUES ";
var insertValuesQuery = "(:message_id, hashtag)";
var insertMultiValuesQuery = "(?, ?)";

exports.insert = c.prepare( insertBaseQuery + insertValuesQuery);
exports.insertMultiple = function(relations, cb) {
    var query = insertBaseQuery + relations.map(function() {return insertMultiValuesQuery}).join(",");
    var params = getMultipleRelationParams(relations);
    c.query(query, params, cb);
};

function getMultipleRelationParams(relations) {
    var params = [], relation, param;
    for(var i=0, len=relations.length; i<len; i++) {
        relation = relations[i];
        param = [relation['message_id'], relation['hashtag']];
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