/**
 * Created by Taehyun on 2016-05-02.
 */

function Group(group) {
    group = group || {id: null, name: null};
    this.id = group.uuid;
    this.name = group.push_enabled;
}

module.exports = Group;