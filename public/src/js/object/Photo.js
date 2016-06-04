/**
 * Created by Taehyun on 2016-06-04.
 */


let defaultPhoto = {
    media: {
        width: 0,
        height: 0,
        src: null
    },
    url: null,
    type: 'photo'
};

function Photo(e) {
    e = Object.assign(defaultPhoto, e);
    this.width = e.media.image.width;
    this.height = e.media.image.height;
    this.src = e.media.image.src;
    this.url = e.url;
    this.type = e.type;
}

module.exports = Photo;