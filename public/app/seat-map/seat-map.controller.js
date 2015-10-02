(function () {
	'use strict';
	angular.module('app').controller('edSeatMapCtrl', edSeatMapCtrl);

	edSeatMapCtrl.$inject = ['$state', '$scope', 'edEmployeeService'];

	function edSeatMapCtrl($state, $scope, edEmployeeService) {
		var vm = this;
		vm.selectedEmployees = edEmployeeService.setSelectMultipleEmployees(true);
		vm.mappedEmployee = edEmployeeService.getMappedEmployee();
		vm.unknownLocationEmployee = false;

		edEmployeeService.setDisplayEmployeeInfoType('location');

		activate();

		function activate() {
			locateEmployee(vm.mappedEmployee);
		}

		var deregister = $scope.$on('mappedEmployeeChange', function (event, mappedEmployee) {
			locateEmployee(mappedEmployee);
		});

		$scope.$on('$destroy', deregister);

		function locateEmployee(employee) {
			if (employee) {
				if (employee.seat) {
					$state.go('main.seat-map.floor-' + employee.floor, {'seat': employee.seat});
				} else {
					vm.unknownLocationEmployee = true;
					vm.mappedEmployee = employee;
				}
			} else {
				vm.unknownLocationEmployee = false;
				vm.mappedEmployee = null;
			}
		}
	}
})();
