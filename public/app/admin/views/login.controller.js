(function () {
	'use strict';
	angular.module('app').controller('edLoginCtrl', edLoginCtrl);

	edLoginCtrl.$inject = ['edIdentityService', 'edNotifierService', 'edAuthService', 'edSidebarService'];

	function edLoginCtrl(edIdentityService, edNotifierService, edAuthService, edSidebarService) {
		var vm = this;
		vm.identity = edIdentityService;
		vm.signin = signin;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
		}

		function signin(username, password) {
			edAuthService.authenticateUser(username, password).then(function (success) {
				if (success) {
					edNotifierService.notify('You have successfully signed in!');
				} else {
					edNotifierService.error('Username / Password combination incorrect');
				}
			});
		}
	}
})();
