/**
 * Created by kimxogus on 2016-05-02.
 */

function Hashtag(hashtag) {
    if(hashtag && typeof hashtag === 'string') {
        this.hashtag = hashtag || null;
    } else {
        hashtag = hashtag || {hashtag: null};
        this.hashtag = hashtag.hashtag;
    }
    if(this.hashtag.startsWith("#")) {
        this.hashtag = this.hashtag.substr(1);
    }
}

module.exports = Hashtag;