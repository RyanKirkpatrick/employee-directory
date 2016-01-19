(function () {
	'use strict';
	angular.module('app').controller('edUserProfileCtrl', edUserProfileCtrl);

	edUserProfileCtrl.$inject = ['$state', 'edIdentityService', 'edNotifierService', 'edAuthService', 'edUserService', 'edSidebarService'];

	function edUserProfileCtrl($state, edIdentityService, edNotifierService, edAuthService, edUserService, edSidebarService) {
		var vm = this;
		vm.updateUser = updateUser;
		vm.username = edIdentityService.currentUser.username;
		vm.fname = edIdentityService.currentUser.firstName;
		vm.lname = edIdentityService.currentUser.lastName;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
			edUserService.setSelectedUser(edIdentityService.currentUser);
		}

		function updateUser() {
			var newUserData = {
				username: vm.username,
				password: vm.password,
				firstName: vm.fname,
				lastName: vm.lname
			};

			if (vm.password && vm.password.length > 0) {
				newUserData.password = vm.password;
			}

			edAuthService.updateUser(newUserData).then(function () {
				edNotifierService.notify('User account updated!');
				$state.go('admin');
			}, function (reason) {
				edNotifierService.error(reason);
			});
		}
	}
})();
