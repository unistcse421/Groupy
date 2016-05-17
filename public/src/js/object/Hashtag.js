/**
 * Created by kimxogus on 2016-05-06.
 */

function Hashtag(hashtag) {
    if(hashtag && typeof hashtag === 'string') {
        this.hashtag = hashtag || null;
    } else {
        hashtag = hashtag || {hashtag: null};
        this.hashtag = hashtag.hashtag;
    }
    if(!this.hashtag) {
        throw new Error("Invalid value");
    }
    if(!this.hashtag.startsWith("#")) {
        this.hashtag = "#" + this.hashtag;
    }
}

module.exports = Hashtag;