(function () {
	'use strict';
	angular.module('app').controller('edEmployeeTopbarCtrl', edEmployeeTopbarCtrl);

	edEmployeeTopbarCtrl.$inject = ['$scope', 'edEmployeeService'];

	function edEmployeeTopbarCtrl($scope, edEmployeeService) {
		var vm = this;
		vm.selectedEmployees = edEmployeeService.getSelectedEmployees();

		var deregisterSelectedEmployeesChanged = $scope.$on('selectedEmployeesChange', function (event, selectedEmployees) {
			vm.selectedEmployees = selectedEmployees;
		});

		$scope.$on('$destroy', deregisterSelectedEmployeesChanged);
	}
})();