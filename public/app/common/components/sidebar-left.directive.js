(function () {
	'use strict';
	angular.module('app').directive('edSidebarLeft', edSidebarLeft);

	function edSidebarLeft() {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/common/components/sidebar-left',
			scope: {},
			controller: ctrlFunc,
			controllerAs: 'vm'
		};

		return directive;
	}

	ctrlFunc.$inject = ['$timeout', 'edIdentityService'];

	function ctrlFunc($timeout, edIdentityService) {
		var vm = this;
		vm.identity = edIdentityService;
		vm.showLargeSidebar = showLargeSidebar;
		vm.hideLargeSidebar = hideLargeSidebar;
		vm.sidebarOpen = false;

		var timer;

		function showLargeSidebar() {
			timer = $timeout(function () {
				vm.sidebarOpen = true;
			}, 100);
		}

		function hideLargeSidebar() {
			$timeout.cancel(timer);
			vm.sidebarOpen = false;
		}
	}
})();