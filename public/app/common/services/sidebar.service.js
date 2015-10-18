(function () {
	'use strict';
	angular.module('app').factory('edSidebarService', edSidebarService);

	edSidebarService.$inject = ['$rootScope'];

	function edSidebarService($rootScope) {
		var sidebarLocked = false;
		var service = {
			setLockSidebar: setLockSidebar,
			getLockSidebar: getLockSidebar
		};

		return service;

		function setLockSidebar(lock) {
			sidebarLocked = lock;
			$rootScope.$broadcast('sidebarLockedChange', sidebarLocked);
			return sidebarLocked;
		}

		function getLockSidebar() {
			return sidebarLocked;
		}
	}
})();