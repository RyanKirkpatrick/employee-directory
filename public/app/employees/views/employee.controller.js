(function () {
	'use strict';
	angular.module('app').controller('edEmployeeCtrl', edEmployeeCtrl);

	edEmployeeCtrl.$inject = ['edSidebarService'];

	function edEmployeeCtrl(edSidebarService) {
		var vm = this;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
		}
	}
})();