(function () {
	'use strict';
	angular.module('app').controller('edIndexCtrl', edIndexCtrl);

	edIndexCtrl.$inject = ['edSidebarService', 'edIdentityService'];

	function edIndexCtrl(edSidebarService, edIdentityService) {
		var vm = this;
		vm.identity = edIdentityService;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
			edSidebarService.openTodayPanel(true);
		}
	}
})();