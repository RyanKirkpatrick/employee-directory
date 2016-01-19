(function () {
	'use strict';
	angular.module('app').controller('edUserSelectorCtrl', edUserSelectorCtrl);

	edUserSelectorCtrl.$inject = ['$scope', 'edUserService'];

	function edUserSelectorCtrl($scope, edUserService) {
		var vm = this;
		vm.users = edUserService.getAllUsers(false);
		vm.selectedUser = edUserService.getSelectedUser();
		vm.selectUser = selectUser;

		function selectUser(user) {
			edUserService.setSelectedUser(user);
		}

		var deregisterUserUpdated = $scope.$on('userUpdated', function (event, users) {
			vm.users = users;
		});

		$scope.$on('$destroy', deregisterUserUpdated);
	}
})();