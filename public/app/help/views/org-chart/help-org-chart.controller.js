(function () {
	'use strict';
	angular.module('app').controller('edHelpOrgChartCtrl', edHelpOrgChartCtrl);

	edHelpOrgChartCtrl.$inject = ['edSidebarService'];

	function edHelpOrgChartCtrl(edSidebarService) {
		var vm = this;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
		}
	}
})();