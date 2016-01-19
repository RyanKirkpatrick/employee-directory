(function () {
	'use strict';
	angular.module('app').directive('edHeader', edHeader);

	function edHeader() {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/common/components/header',
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