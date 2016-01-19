(function () {
	'use strict';
	angular.module('app').controller('edCommitteesTopbarCtrl', edCommitteesTopbarCtrl);

	edCommitteesTopbarCtrl.$inject = ['edIdentityService'];

	function edCommitteesTopbarCtrl(edIdentityService) {
		var vm = this;
		vm.identity = edIdentityService;
	}
})();