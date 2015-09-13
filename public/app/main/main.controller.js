(function () {
	'use strict';
	angular.module('app').controller('edMainCtrl', edMainCtrl);

	edMainCtrl.$inject = ['$scope', '$rootScope', 'edEmployeeService'];

	function edMainCtrl($scope, $rootScope, edEmployeeService) {
		var vm = this;
		vm.selectedEmployees = edEmployeeService.getSelectedEmployees();
		edEmployeeService.setSelectMultipleEmployees(true);

		var deregister = $rootScope.$on('selectedEmployeeChange', function (event, selectedEmployees) {
			vm.selectedEmployees = selectedEmployees;
		});

		$scope.$on('$destroy', deregister);
	}
})();