(function () {
	'use strict';
	angular.module('app').controller('edCreateUserCtrl', edCreateUserCtrl);

	edCreateUserCtrl.$inject = ['$state', 'edNotifierService', 'edAuthService', 'edSidebarService'];

	function edCreateUserCtrl($state, edNotifierService, edAuthService, edSidebarService) {
		var vm = this;
		vm.createUser = createUser;
		vm.newUser = {};

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
		}

		function createUser() {
			var newUserData = {
				username: vm.newUser.username,
				password: vm.newUser.password,
				firstName: vm.newUser.firstName,
				lastName: vm.newUser.lastName,
				roles: []
			};

			// Add all the selected roles
			_.forEach(vm.newUser.roles, function (include, role) {
				if (include) {
					newUserData.roles.push(role);
				}
			});

			edAuthService.createUser(newUserData).then(function () {
				edNotifierService.notify('User account created!');
				$state.go('admin');
			}, function (reason) {
				edNotifierService.error(reason);
			});
		}
	}
})();
