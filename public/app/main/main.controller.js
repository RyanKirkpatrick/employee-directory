(function () {
	'use strict';
	angular.module('app').controller('edMainCtrl', edMainCtrl);

	edMainCtrl.$inject = ['$scope', '$rootScope', 'edEmployeeService', '$state', '$stateParams'];

	function edMainCtrl($scope, $rootScope, edEmployeeService, $state, $stateParams) {
		var vm = this;
		vm.selectedEmployees = edEmployeeService.getSelectedEmployees();

		edEmployeeService.setDisplayEmployeeInfoType('profile');
		edEmployeeService.setSelectMultipleEmployees(true);
		edEmployeeService.updateMappedEmployee(null);

		if ($stateParams.firstname || $stateParams.lastname) {
			edEmployeeService.getAllEmployees().$promise.then(selectEmployee);
		}

		function selectEmployee(employees) {
			var selectedEmployees = employees.filter(function (employee) {
				var match = false;
				if ($stateParams.firstname) {
					if (employee.firstName.toLocaleLowerCase() === $stateParams.firstname.toLowerCase()) {
						match = true;
					} else {
						return false;
					}
				}
				if ($stateParams.lastname) {
					if (employee.lastName.toLocaleLowerCase() === $stateParams.lastname.toLowerCase()) {
						match = true;
					} else {
						return false;
					}
				}
				return match;
			});

			angular.forEach(selectedEmployees, function (employee) {
				edEmployeeService.updateSelectedEmployees(employee);
			});
		}

		var deregister = $rootScope.$on('selectedEmployeeChange', function (event, selectedEmployees) {
			vm.selectedEmployees = selectedEmployees;
		});

		$scope.$on('$destroy', deregister);
	}
})();