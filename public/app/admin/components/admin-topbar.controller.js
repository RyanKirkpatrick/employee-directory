(function () {
	'use strict';
	angular.module('app').controller('edAdminTopbarCtrl', edAdminTopbarCtrl);

	edAdminTopbarCtrl.$inject = ['edIdentityService'];

	function edAdminTopbarCtrl(edIdentityService) {
		var vm = this;
		vm.identity = edIdentityService;
	}
})();