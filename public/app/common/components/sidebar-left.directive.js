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

	ctrlFunc.$inject = ['$scope', 'edSidebarService', 'edIdentityService'];

	function ctrlFunc($scope, edSidebarService, edIdentityService) {
		var vm = this;
		vm.identity = edIdentityService;
		vm.sidebarOpen = false;
		vm.sidebarLocked = edSidebarService.getLockSidebar();
		vm.toggleSidebar = toggleSidebar;
		vm.closeSidebar = closeSidebar;

		activate();

		// If the sidebar is locked open, make sure it is open
		function activate() {
			if (vm.sidebarLocked) {
				vm.sidebarOpen = true;
			}
		}

		// If the sidebar is not locked open, toggle it
		function toggleSidebar() {
			if (!vm.sidebarLocked) {
				vm.sidebarOpen = !vm.sidebarOpen;
			}
		}

		// If the sidebar is not locked open, close it
		function closeSidebar() {
			if (!vm.sidebarLocked) {
				vm.sidebarOpen = false;
			}
		}

		// Wacth for the sidebar locked change event
		var deregister = $scope.$on('sidebarLockedChange', function (event, sidebarLocked) {
			vm.sidebarLocked = sidebarLocked
			if (vm.sidebarLocked) {
				vm.sidebarOpen = true;
			} else {
				vm.sidebarOpen = false;
			}
		});

		$scope.$on('$destroy', deregister);
	}
})();