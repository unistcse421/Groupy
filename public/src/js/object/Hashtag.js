/**
 * Created by Taehyun on 2016-05-06.
 */
'use strict';
define([], function() {
    function Hashtag(hashtag) {
        if(hashtag && typeof hashtag === 'string') {
            this.hashtag = hashtag;
        } else {
            hashtag = hashtag || {hashtag: null};
            this.hashtag = hashtag.hashtag;
        }
    }

    return Hashtag;
});