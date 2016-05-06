/**
 * Created by Taehyun on 2016-05-06.
 */
'use strict';
define(['app', 'service/groupService'], function(app){
    app.filter('groupFilter', ['groupService',
        function(groupService) {
            return function(group_id) {
                var groups = groupService.groups, group;
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