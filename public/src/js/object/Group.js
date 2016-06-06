/**
 * Created by kimxogus on 2016-05-06.
 */

function Group(group) {
    group = Object.assign({id: null, name: null, cnt: 0}, group);
    this.id = group.id;
    this.name = group.name;
    this.cnt = group.cnt;
}

module.exports = Group;