(function () {
	'use strict';
	angular.module('app').controller('edCreateUserCtrl', edCreateUserCtrl);

	edCreateUserCtrl.$inject = ['$state', 'edNotifierService', 'edAuthService', 'edSidebarService'];

	function edCreateUserCtrl($state, edNotifierService, edAuthService, edSidebarService) {
		var vm = this;
		vm.createUser = createUser;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
		}

		function createUser() {
			var newUserData = {
				username: vm.username,
				password: vm.password,
				firstName: vm.fname,
				lastName: vm.lname,
				roles: vm.roles.split(',')
			};

			edAuthService.createUser(newUserData).then(function () {
				edNotifierService.notify('User account created!');
				$state.go('admin');
			}, function (reason) {
				edNotifierService.error(reason);
			});
		}
	}
})();
