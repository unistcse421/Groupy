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
    message: null,
    comments: null
};

function Comment(comment, getChild = false) {
    comment = Object.assign(defaultComment, comment);

    this.id = comment.id;
    this.from = comment.from;
    this.created_time = new Date(comment.created_time);
    this.message = comment.message
        .replace(/</g, "&lt")
        .replace(/>/g, "&gt")
        .replace(/\n/g, "<br>");
    this.comments = getChild && comment.comments && comment.comments.data
        ? comment.comments.data.map(e=>new Comment(e, false))
        : null;
}

module.exports = Comment;