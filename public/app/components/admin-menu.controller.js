(function () {
	'use strict';
	angular.module('app').controller('edAdminMenuCtrl', edAdminMenuCtrl);

	edAdminMenuCtrl.$inject = ['edIdentityService'];

	function edAdminMenuCtrl(edIdentityService) {
		var vm = this;
		vm.identity = edIdentityService;
	}
})();