(function () {
	'use strict';
	angular.module('app').controller('edSeatMapCtrl', edSeatMapCtrl);

	edSeatMapCtrl.$inject = ['$state', '$rootScope', '$scope', 'edEmployeeService'];

	function edSeatMapCtrl($state, $rootScope, $scope, edEmployeeService) {
		var vm = this;
		vm.selectedEmployees = edEmployeeService.setSelectMultipleEmployees(true);
		vm.mappedEmployee = null;
		vm.unknownLocationEmployee = false;

		edEmployeeService.setDisplayEmployeeInfoType('location');

		activate();

		function activate() {
			locateEmployee(vm.mappedEmployee);
		}

		var deregister = $rootScope.$on('mappedEmployeeChange', function (event, mappedEmployee) {
			locateEmployee(mappedEmployee);
		});

		$scope.$on('$destroy', deregister);

		function locateEmployee(employee) {
			if (employee) {
				if (employee.seat) {
					$state.go('main.seat-map.floor-' + employee.floor, {'seat': employee.seat});
				} else {
					vm.unknownLocationEmployee = true;
					vm.mappededEmployee = null;
				}
			} else {
				vm.unknownLocationEmployee = false;
				vm.mappededEmployee = null;
			}
		}
	}
})();
