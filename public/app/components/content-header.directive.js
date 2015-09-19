(function () {
	'use strict';
	angular.module('app').directive('edContentHeader', edContentHeader);

	function edContentHeader() {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/components/content-header',
			scope: {},
			controller: ctrlFunc,
			controllerAs: 'vm'
		};

		return directive;
	}

	ctrlFunc.$inject = ['edIdentityService'];

	function ctrlFunc(edIdentityService) {
		var vm = this;
		vm.identity = edIdentityService;
	}
})();