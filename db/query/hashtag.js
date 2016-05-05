/**
 * Created by Taehyun on 2016-05-02.
 */


var c = require('../connection');


/**
 * Insert hashtag
 */
var insertBaseQuery = "INSERT IGNORE INTO hashtag (hashtag) VALUES ";
var insertValuesQuery = "( :hashtag )";
var insertMultiValuesQuery = "(?)";

exports.insert = c.prepare( insertBaseQuery + insertValuesQuery);
exports.getInsertMultipleQueryAndParam = function(hashtags) {
    var query = insertBaseQuery + hashtags.map(function() {return insertMultiValuesQuery}).join(",");
    var params = getMultipleParams(hashtags);
    return {query, params};
};

function getMultipleParams(hashtags) {
    var params = [], hashtag;
    for(var i=0, len=hashtags.length; i<len; i++) {
        hashtag = hashtags[i];
        params.push(hashtag.hashtag);
    }
    return params;
}


/**
 * Select Hashtag
 */
var selectAll = "SELECT hashtag FROM hashtag";

exports.selectAll = c.prepare(selectAll);
exports.selectByHashtag = c.prepare(selectAll + " WHERE hashtag = :hashtag");

/**
 * Delete Hashtag
 */
exports.delete = c.prepare("DELETE FROM hashtag WHERE hashtag = :hashtag");