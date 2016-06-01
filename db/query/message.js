/**
 * Created by kimxogus on 2016-05-02.
 */
var
    c   = require('../connection'),
    dateToSqlDatetime = require('../util').dateToSqlDatetime;

/**
 * Insert Message
 */
var insertBaseQuery = "INSERT INTO message (id, group_id, message, created_time, updated_time) VALUES ";
var insertValuesQuery = "(:id , :group_id, :message, :created_time, :updated_time)";
var insertMultiValuesQuery = "(?, ?, ?, ?, ?)";

exports.insertArrayQuery = function (message){
    return {
        query: insertBaseQuery + insertMultiValuesQuery,
        params: [
            message.id, String(message.group_id), message.message,
            dateToSqlDatetime(message.created_time), dateToSqlDatetime(message.updated_time)
        ]
    };
};
exports.insert = c.prepare( insertBaseQuery + insertValuesQuery);

function getMultipleParams(msgs) {
    var params = [], msg, param;
    for(var i=0, len=msgs.length; i<len; i++) {
        msg = msgs[i];
        param= [msg.id, msg['group_id'], msg.message, dateToSqlDatetime(msg['created_time']), dateToSqlDatetime(msg['updated_time'])];
        params = params.concat(param);
    }
    return params;
}

exports.insertMultiple = function(messages) {
    var query = insertBaseQuery +
        messages.map(function() {
            return insertMultiValuesQuery
        })
            .join(",");
    var params = getMultipleParams(messages);
    return c.prepare(query)(params);
};


/**
 * Select Message
 */
var
    selectQuery     = "SELECT id, group_id, message, created_time, updated_time FROM message",
    orderByQuery    = " ORDER BY updated_time DESC",
    pageQuery       = " LIMIT 18 OFFSET :page";


exports.selectAll = c.prepare(selectQuery + orderByQuery);
exports.selectByGroupIdPage = (obj)=>
    c.prepare(
        "SELECT id, group_id, message, created_time, updated_time," +
        "(SELECT GROUP_CONCAT(DISTINCT hashtag SEPARATOR ',') FROM message_hashtag WHERE message_id = m.id GROUP BY message_id) AS hashtags " +
        "FROM message m WHERE group_id = :group_id" +  (obj['search_keyword'] ? " AND message LIKE CONCAT('%', :search_keyword, '%')" : "")
        + orderByQuery + pageQuery.replace(":page", String(18*(obj.page - 1))))(obj);
exports.selectById = c.prepare(selectQuery + " WHERE id = :id" + orderByQuery);
exports.selectByGroupName = c.prepare(
    selectQuery + " WHERE group_id IN (SELECT id FROM group WHERE name = :name)" + orderByQuery
);
exports.selectByGroupId = c.prepare(selectQuery + " WHERE group_id = :group_id" + orderByQuery);
exports.selectByName = c.prepare(selectQuery + " WHERE group_id = :group_id" + orderByQuery);
exports.selectByIdAndName = c.prepare(selectQuery + " WHERE id = :id AND name = :name" + orderByQuery);
exports.selectByHashtagContains = c.prepare(
    "SELECT id, group_id, message, created_time, updated_time FROM message m, message_hashtag r " +
    "WHERE m.id=r.message_id AND r.hashtag = :hashtag" + orderByQuery
);
exports.selectByHashtagContainsAngPage = (obj)=>c.prepare(
    "SELECT id, group_id, message, created_time, updated_time FROM message m, message_hashtag r " +
    "WHERE m.id=r.message_id AND r.hashtag = :hashtag"
    + orderByQuery + pageQuery.replace(":page", String(18*(obj.page - 1)))
)(obj);
exports.selectByHashtagNotContains = c.prepare(
    "SELECT id, group_id, message, created_time, updated_time FROM message " +
    "WHERE id NOT IN (SELECT message_id FROM message_hashtag WHERE hashtag = :hashtag)" + orderByQuery
);
exports.selectByHashtagNotContainsAndPage = (obj)=>c.prepare(
    "SELECT id, group_id, message, created_time, updated_time FROM message " +
    "WHERE id NOT IN (SELECT message_id FROM message_hashtag WHERE hashtag = :hashtag)"
    + orderByQuery + pageQuery.replace(":page", String(18*(obj.page - 1)))
)(obj);

/**
 * Delete Message
 */
exports.deleteById = c.prepare("DELETE FROM message WHERE id = :id");
exports.deleteByGroupId = c.prepare("DELETE FROM message WHERE group_id = :group_id");
exports.deleteByIdArrayParamQuery = "DELETE FROM message WHERE id = ?";