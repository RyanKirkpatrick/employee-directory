(function () {
	'use strict';
	angular.module('app').controller('edSeatMapCtrl', edSeatMapCtrl);

	edSeatMapCtrl.$inject = ['$state', '$rootScope', '$scope', 'edEmployeeService'];

	function edSeatMapCtrl($state, $rootScope, $scope, edEmployeeService) {
		var vm = this;
		vm.selectedEmployees = edEmployeeService.setSelectMultipleEmployees(false);
		vm.unknownLocationEmployee = false;

		activate();

		function activate() {
			locateEmployee(vm.selectedEmployees);
		}

		var deregister = $rootScope.$on('selectedEmployeeChange', function (event, selectedEmployees) {
			locateEmployee(selectedEmployees);
		});

		$scope.$on('$destroy', deregister);

		function locateEmployee(employees) {
			if (employees.length === 1) {
				if (employees[0].deskLoc) {
					$state.go('main.seat-map.floor-' + employees[0].deskLoc.floor, {'pos': employees[0].deskLoc.pos});
				} else {
					vm.unknownLocationEmployee = true;
					vm.selectedEmployees = employees;
				}
			} else {
				vm.unknownLocationEmployee = false;
				vm.selectedEmployees = [];
			}
		}
	}
})();
