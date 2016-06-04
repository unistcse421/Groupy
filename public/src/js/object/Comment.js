/**
 * Created by kimxogus on 2016-05-06.
 */

let defaultComment = {
    id: null,
    from: {
        name: null,
        id: null
    },
    created_time: null,
    message: null
};

function Comment(comment = defaultComment) {
    this.id = comment.id;
    this.from = comment.from;
    this.created_time = new Date(comment.created_time);
    this.message = comment.message
        .replace(/</g, "&lt")
        .replace(/>/g, "&gt")
        .replace(/\n/g, "<br>");
    this.child = [];
}

module.exports = Comment;