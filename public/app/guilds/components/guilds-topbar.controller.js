(function () {
	'use strict';
	angular.module('app').controller('edGuildsTopbarCtrl', edGuildsTopbarCtrl);

	edGuildsTopbarCtrl.$inject = ['edIdentityService'];

	function edGuildsTopbarCtrl(edIdentityService) {
		var vm = this;
		vm.identity = edIdentityService;
	}
})();