(function () {
	'use strict';
	angular.module('app').controller('edUpdateUserCtrl', edUpdateUserCtrl);

	edUpdateUserCtrl.$inject = ['$state', 'edIdentityService', 'edNotifierService', 'edAuthService', 'edSidebarService'];

	function edUpdateUserCtrl($state, edIdentityService, edNotifierService, edAuthService, edSidebarService) {
		var vm = this;
		vm.updateUser = updateUser;
		vm.username = edIdentityService.currentUser.username;
		vm.fname = edIdentityService.currentUser.firstName;
		vm.lname = edIdentityService.currentUser.lastName;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
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

			edAuthService.updateCurrentUser(newUserData).then(function () {
				edNotifierService.notify('User account updated!');
				$state.go('admin');
			}, function (reason) {
				edNotifierService.error(reason);
			});
		}
	}
})();
