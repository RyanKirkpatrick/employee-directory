(function () {
	'use strict';
	angular.module('app').controller('edUserListCtrl', edUserListCtrl);

	edUserListCtrl.$inject = ['edUserResourceService'];

	function edUserListCtrl(edUserResourceService) {
		var vm = this;
		vm.users = edUserResourceService.query();
		console.log('hhhh');
	}
})();
