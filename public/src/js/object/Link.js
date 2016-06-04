/**
 * Created by Taehyun on 2016-06-04.
 */
let defaultLink = {
    url: null,
    type: 'link'
};

function Link(e) {
    e = Object.assign(defaultLink, e);
    this.url = e.url;
    this.type = e.type;
}

module.exports = Link;