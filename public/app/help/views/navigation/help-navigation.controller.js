(function () {
	'use strict';
	angular.module('app').controller('edHelpNavigationCtrl', edHelpNavigationCtrl);

	edHelpNavigationCtrl.$inject = ['edSidebarService'];

	function edHelpNavigationCtrl(edSidebarService) {
		var vm = this;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
		}
	}
})();
