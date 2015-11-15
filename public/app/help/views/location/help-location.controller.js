(function () {
	'use strict';
	angular.module('app').controller('edHelpLocationCtrl', edHelpLocationCtrl);

	edHelpLocationCtrl.$inject = ['edSidebarService'];

	function edHelpLocationCtrl(edSidebarService) {
		var vm = this;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
		}
	}
})();