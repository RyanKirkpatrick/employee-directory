(function () {
	'use strict';
	angular.module('app').controller('edCreateUserCtrl', edCreateUserCtrl);

	edCreateUserCtrl.$inject = ['$state', 'edNotifierService', 'edAuthService'];

	function edCreateUserCtrl($state, edNotifierService, edAuthService) {
		var vm = this;
		vm.createUser = createUser;

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
				$state.go('main');
			}, function (reason) {
				edNotifierService.error(reason);
			});
		}
	}
})();
