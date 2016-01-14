(function () {
	'use strict';
	angular.module('app').factory('edUserService', edUserService);

	edUserService.$inject = ['$rootScope', 'edCachedUserResourceService'];

	function edUserService($rootScope, edUserResourceService) {
		var selectedUser = null;
		var service = {
			getAllUsers: getAllUsers,
			getSelectedUser: getSelectedUser,
			setSelectedUser: setSelectedUser
		};
		return service;

		/**
		 * Gets all user from the database
		 *
		 * @param {Boolean} cacheBust to get data from server or memory
		 * @return {Array} users
		 */
		function getAllUsers(cacheBust) {
			return edUserResourceService.query(cacheBust);
		}

		/**
		 * Gets the selected user
		 *
		 * @return {object} selected user
		 */
		function getSelectedUser() {
			return selectedUser;
		}

		/**
		 * Updates the selected user
		 *
		 * @param {Object} user the user select / deselect
		 * @return {Array} selected user
		 */
		function setSelectedUser(user) {
			// Deselect the currently selected user
			if (!user && selectedUser) {
				selectedUser.selected = false;
				selectedUser = null;
				// Deselect the currently selected user and (possibly) select the new one
			} else if (user && selectedUser) {
				selectedUser.selected = false;
				// Select the new user
				if (selectedUser._id !== user._id) {
					user.selected = true;
					selectedUser = user;
					// Just remove the currently selected user
				} else {
					selectedUser = null;
				}
				// Select the requested user (none currently selected)
			} else if (user && !selectedUser) {
				user.selected = true;
				selectedUser = user;
			}
			$rootScope.$broadcast('selectedUserChange', selectedUser);
			return selectedUser;
		}
	}
})();