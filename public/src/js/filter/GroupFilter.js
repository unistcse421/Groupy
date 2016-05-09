/**
 * Created by kimxogus on 2016-05-06.
 */
'use strict';
define(['app', 'service/GroupService'], function(app){
    app.filter('GroupFilter', ['GroupService',
        function(GroupService) {
            return function(group_id) {
                var groups = GroupService.groups, group;
                for (var i = 0, len = groups.length; i < len; i++) {
                    group = groups[i];
                    if(group.id == group_id) {
                        return group.name;
                    }
                }
                return group_id;
            }
        }]
    )
});