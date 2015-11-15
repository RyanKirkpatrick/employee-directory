(function () {
	'use strict';
	angular.module('app').controller('edHelpProfileCtrl', edHelpProfileCtrl);

	edHelpProfileCtrl.$inject = ['edSidebarService'];

	function edHelpProfileCtrl(edSidebarService) {
		var vm = this;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
		}
	}
})();
