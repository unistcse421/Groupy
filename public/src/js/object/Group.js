/**
 * Created by kimxogus on 2016-05-06.
 */

function Group(group) {
    group = group || {id: null, name: null};
    this.id = group.id;
    this.name = group.name;
}

module.exports = Group;