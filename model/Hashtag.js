/**
 * Created by Taehyun on 2016-05-02.
 */

function Hashtag(hashtag) {
    if(typeof hashtag === 'string') {
        this.hashtag = hashtag;
    } else {
        hashtag = hashtag || {hashtag: null};
        this.hashtag = hashtag.hashtag;
    }
}

module.exports = Hashtag;