(function () {
	'use strict';
	angular.module('app').controller('edRoomCtrl', edRoomCtrl);

	edRoomCtrl.$inject = ['edSidebarService'];

	function edRoomCtrl(edSidebarService) {
		var vm = this;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
		}
	}
})();