(function () {
	'use strict';
	angular.module('app').controller('edUserListCtrl', edUserListCtrl);

	edUserListCtrl.$inject = ['edUserResourceService', 'edSidebarService'];

	function edUserListCtrl(edUserResourceService, edSidebarService) {
		var vm = this;
		vm.users = edUserResourceService.query();

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
		}
	}
})();
