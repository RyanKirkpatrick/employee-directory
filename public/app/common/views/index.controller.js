(function () {
	'use strict';
	angular.module('app').controller('edIndexCtrl', edIndexCtrl);

	edIndexCtrl.$inject = ['edSidebarService'];

	function edIndexCtrl(edSidebarService) {
		var vm = this;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
		}
	}
})();