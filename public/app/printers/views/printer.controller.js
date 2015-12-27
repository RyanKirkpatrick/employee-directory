(function () {
	'use strict';
	angular.module('app').controller('edPrinterCtrl', edPrinterCtrl);

	edPrinterCtrl.$inject = ['edSidebarService'];

	function edPrinterCtrl(edSidebarService) {
		var vm = this;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
		}
	}
})();