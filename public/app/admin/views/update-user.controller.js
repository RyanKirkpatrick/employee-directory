(function () {
	'use strict';
	angular.module('app').controller('edUpdateUserCtrl', edUpdateUserCtrl);

	edUpdateUserCtrl.$inject = ['$scope', 'edUserService', 'edNotifierService', 'edAuthService', 'edSidebarService'];

	function edUpdateUserCtrl($scope, edUserService, edNotifierService, edAuthService, edSidebarService) {
		var vm = this;
		vm.updateUser = updateUser;
		vm.selectedUser = edUserService.getSelectedUser();

		activate();

		function activate() {
			edSidebarService.setLockSidebar(false);
			if (vm.selectedUser) {
				populateUserInfo(vm.selectedUser);
			}
		}

		function populateUserInfo(user) {
			vm.selectedUser = {
				firstName: user.firstName,
				lastName: user.lastName,
				username: user.username,
				roles: {}
			};

			_.forEach(user.roles, function (role) {
				vm.selectedUser.roles[role] = true;
			});
		}

		var selectedUserChangeEvent = $scope.$on('selectedUserChange', function (event, selectedUser) {
			if (selectedUser) {
				populateUserInfo(selectedUser);
			} else {
				vm.selectedUser = null;
			}
		});

		$scope.$on('$destroy', selectedUserChangeEvent);

		function updateUser() {
			var newUserData = {
				password: vm.selectedUser.password,
				firstName: vm.selectedUser.firstName,
				lastName: vm.selectedUser.lastName,
				roles: []
			};

			// Add all the selected roles
			_.forEach(vm.selectedUser.roles, function (include, role) {
				if (include) {
					newUserData.roles.push(role);
				}
			});

			if (vm.selectedUser.password && vm.selectedUser.password.length > 0) {
				newUserData.password = vm.selectedUser.password;
			}

			edAuthService.updateUser(newUserData).then(function () {
				edNotifierService.notify('User account updated!');
				vm.selectedUser = null;
			}, function (reason) {
				edNotifierService.error(reason);
			});
		}
	}
})();
