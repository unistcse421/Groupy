/**
 * Created by kimxogus on 2016-05-05.
 */

function messageFilter(message) {
    return !(!message.message || message.story || message.type === 'story');
}

module.exports = messageFilter;