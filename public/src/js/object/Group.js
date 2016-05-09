/**
 * Created by kimxogus on 2016-05-06.
 */
'use strict';
define(function() {
    function Group(group) {
        group = group || {id: null, name: null};
        this.id = group.id;
        this.name = group.name;
    }

    return Group;
});