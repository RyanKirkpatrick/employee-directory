(function () {
	'use strict';
	angular.module('app').controller('edEmployeeSelectorCtrl', edEmployeeSelectorCtrl);

	edEmployeeSelectorCtrl.$inject = ['$rootScope', 'edEmployeeService'];

	function edEmployeeSelectorCtrl($rootScope, edEmployeeService) {
		var vm = this;
		vm.employees = edEmployeeService.getAllEmployees();
		vm.selectedEmployees = edEmployeeService.getSelectedEmployees();
		vm.selectEmployee = selectEmployee;
		vm.filterOpen = false;
		vm.floorFilter = floorFilter;
		vm.filterFloors = filterFloors;
		vm.floor = {
			'6': true,
			'7': true,
			'8': true
		};
		vm.floors = [6, 7, 8];

		function selectEmployee(employee) {
			vm.selectedEmployees = edEmployeeService.updateSelectedEmployees(employee);
		}

		function filterFloors(floor) {
			if (vm.floor[floor]) {
				vm.floors.push(floor);
			} else {
				vm.floors.splice(vm.floors.indexOf(floor), 1);
			}
		}

		function floorFilter(employee) {
			return vm.floors.indexOf(employee.deskLoc.floor) > -1;
		}

		$rootScope.$on('employeesUpdated', function (event, employees) {
			vm.employees = employees;
		});
	}
})();
