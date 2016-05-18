/**
 * Created by kimxogus on 2016-05-06.
 */

import '../service/GroupService';

let app = global.app;


GroupFilter.$inject = ['groupService'];

function GroupFilter(groupService) {
    return function(group_id) {
        let groups = groupService.groups, group;
        for (var i = 0, len = groups.length; i < len; i++) {
            group = groups[i];
            if(group.id == group_id) {
                return group.name;
            }
        }
        return group_id;
    }
}


app.filter('groupFilter', GroupFilter);

module.exports = GroupFilter;