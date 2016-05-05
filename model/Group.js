/**
 * Created by Taehyun on 2016-05-02.
 */

function Group(group) {
    group = group || {id: null, name: null};
    this.id = group.id;
    this.name = group.name;
}

module.exports = Group;