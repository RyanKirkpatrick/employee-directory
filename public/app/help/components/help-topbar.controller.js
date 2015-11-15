(function () {
	'use strict';
	angular.module('app').controller('edHelpTopbarCtrl', edHelpTopbarCtrl);

	edHelpTopbarCtrl.$inject = ['edIdentityService'];

	function edHelpTopbarCtrl(edIdentityService) {
		var vm = this;
		vm.identity = edIdentityService;
	}
})();