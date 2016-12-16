(function () {
    "use strict";

    angular
        .module("app.core.user")
        .service("userService", userService);

    userService.$inject = ["$http", "$q", "$resource", "logger"];

    /**
     * @ngdoc service
     * @name app.core.user.userService
     * @memberof app.core.user
     * @requires $http
     * @requires $q
     * @requires $resource
     * @requires logger
     * @returns {{getCurrentUser: getCurrentUser, getPermissions: getPermissions, hasPermission: hasPermission}}
     */
    function userService ($http, $q, $resource, logger) {
        var user = {
            init: init,
            getCurrentUser: getCurrentUser,
            getCurrentUserRole: getCurrentUserRole,
            getCurrentUserName: getCurrentUserName,
            getCurrentUserRoleName: getCurrentUserRoleName,
            getCurrentUserId: getCurrentUserId,
            getCurrentUserRoleId: getCurrentUserRoleId,
            getPermissions: getPermissions,
            hasPermission: hasPermission
        };

        return user;

        /**
         * @ngdoc function
         * @name init
         * @summary
         *  This init function gets called as part of the root state resolve.
         *  So when app loads up, all the views should be able to get the currentUser & currentUserRole information
         *  without having to make any REST API calls or deal with promises.
         * @memberof app.core.user.userService
         * @requires {Object} user - data {
         *      auth-source,
         *      createddate,
         *      creator,
         *      meta,
         *      moddate,
         *      modifer,
         *      name,
         *      perms,
         *      roles,
         *      roleId,
         *      roleName,
         *      state,
         *      status,
         *      statusText,
         *      sys,
         *      tenant-id,
         *      tenant-name
         * }
         * which is current logged in user object (root state resolve gets the user object from authService resolve & passes it on to here)
         * @returns promise
         */
        function init (userObj) {
            user.currentUser = userObj;
            return $http.get(userObj.roles[0]).then(
                function (response) {
                    if (response.status !== 200) {
                        return $q.reject(response);
                    } else {
                        user.currentUserRole = response.data;
                        logger.info("Initialized User Service", user);
                        return $q.resolve(user.currentUserRole);
                    }
                },
                function (errResponse) {
                    return $q.reject(errResponse);
                }
            );
        }

        /**
         * @ngdoc function
         * @name getCurrentUser
         * @memberof app.core.user.userService
         * @summary
         *  This function returns the current user as a giant JSON object which we store locally as userService.user
         * @memberof app.core.user.userFactory
         * @returns {Object} user
         */
        function getCurrentUser () {
            return user.currentUser;
        }

        /**
         * @ngdoc function
         * @name getCurrentUserRole
         * @memberof app.core.user.userService
         * @summary
         *  This function returns the current user role as a JSON object which we store locally as userService.role
         * @memberof app.core.user.userFactory
         * @returns {Object} user's role
         */
        function getCurrentUserRole () {
            return user.currentUserRole;
        }

        /**
         * @ngdoc function
         * @name getCurrentUserName
         * @memberof app.core.user.userService
         * @summary
         *  Quick handy function to get the name of the current user.
         * @memberof app.core.user.userFactory
         * @returns {string} user's name
         */
        function getCurrentUserName () {
            return user.currentUser.name;
        }

        /**
         * @ngdoc function
         * @name getCurrentUserRoleName
         * @memberof app.core.user.userService
         * @summary
         *  Quick handy function to get the role name of the current user.
         * @memberof app.core.user.userFactory
         * @returns {string} user's role name
         */
        function getCurrentUserRoleName () {
            return user.currentUserRole.name;
        }

        /**
         * @ngdoc function
         * @name getCurrentUserId
         * @summary
         *  Quick handy function to get the id of the current user.
         * @memberof app.core.user.userFactory
         * @returns {string} user's id
         */
        function getCurrentUserId () {
            return user.getCurrentUser().meta["@href"].substring(user.getCurrentUser().meta["@href"].lastIndexOf("/") + 1, user.getCurrentUser().meta["@href"].length);
        }

        /**
         * @ngdoc function
         * @name getCurrentUserRoleId
         * @summary
         *  Quick handy function to get the role id of the current user.
         * @memberof app.core.user.userFactory
         * @returns {string} user's role id
         */
        function getCurrentUserRoleId () {
            return user.getCurrentUserRole().meta["@href"].substring(user.getCurrentUserRole().meta["@href"].lastIndexOf("/") + 1, user.getCurrentUserRole().meta["@href"].length);
        }

        /**
         * @ngdoc function
         * @name getPermissions
         * @memberof app.core.user.userService
         * @summary
         * getPermissions - Quick way to grab just the user permissions to work on.
         * @memberof app.core.user.userFactory
         * @returns {Object} user's permissions
         */
        function getPermissions () {
            return user.getCurrentUser().perms;
        }

        /**
         * @ngdoc function
         * @name hasPermission
         * @memberof app.core.user.userService
         * @summary
         *  Quick test to see if an item is in the user permission set.
         * @memberof app.core.user.userFactory
         * @param {string} permissionItem
         * @returns {boolean}
         */
        function hasPermission (permissionItem) {
            var currentPerms = user.getPermissions();
            return currentPerms["perm-set"].indexOf(permissionItem) !== -1;
        }
    }
}());
