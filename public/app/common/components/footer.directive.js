(function () {
	'use strict';
	angular.module('app').directive('edFooter', edFooter);

	function edFooter() {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/common/components/footer',
			scope: {},
			controller: ctrlFunc,
			controllerAs: 'vm'
		};

		return directive;
	}

	ctrlFunc.$inject = ['edIdentityService', 'edAuthService', 'edNotifierService'];

	function ctrlFunc(edIdentityService, edAuthService, edNotifierService) {
		var vm = this;
		vm.identity = edIdentityService;
		vm.signout = signout;

		function signout() {
			edAuthService.logoutUser().then(function () {
				vm.username = '';
				vm.password = '';
				edNotifierService.notify('You have successfully signed out');
			});
		}
	}
})();