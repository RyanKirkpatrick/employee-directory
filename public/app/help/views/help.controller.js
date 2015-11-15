(function () {
	'use strict';
	angular.module('app').controller('edHelpCtrl', edHelpCtrl);

	edHelpCtrl.$inject = ['edSidebarService'];

	function edHelpCtrl(edSidebarService) {
		var vm = this;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
		}
	}
})();
