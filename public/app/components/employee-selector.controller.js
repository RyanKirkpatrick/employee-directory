(function () {
	'use strict';
	angular.module('app').controller('edEmployeeSelectorCtrl', edEmployeeSelectorCtrl);

	edEmployeeSelectorCtrl.$inject = ['$rootScope', 'edEmployeeService'];

	function edEmployeeSelectorCtrl($rootScope, edEmployeeService) {
		var vm = this;
		vm.employees = edEmployeeService.getAllEmployees();
		vm.selectedEmployees = edEmployeeService.getSelectedEmployees();
		vm.selectEmployee = selectEmployee;
		vm.selectAll = selectAll;
		vm.selectNone = selectNone;
		vm.allowSelectAll = false;
		vm.filteredEmployees = edEmployeeService.getAllEmployees();
		vm.filterOpen = false;
		vm.clearFilter = clearFilter;
		vm.floorFilter = floorFilter;
		vm.filterFloors = filterFloors;
		vm.floor = {
			'6': false,
			'7': false,
			'8': false
		};
		vm.floors = [];

		function selectEmployee(employee) {
			edEmployeeService.updateSelectedEmployees(employee);
		}

		function filterFloors(floor) {
			if (vm.floor[floor]) {
				vm.floors.push(floor);
			} else {
				vm.floors.splice(vm.floors.indexOf(floor), 1);
			}
		}

		function floorFilter(employee) {
			if (vm.floors.length > 0) {
				if (employee.floor) {
					return vm.floors.indexOf(employee.floor) > -1;
				}
			} else {
				return true;
			}
		}

		function selectAll() {
			edEmployeeService.addAllFilteredEmployees(vm.filteredEmployees);
		}

		function selectNone() {
			edEmployeeService.removeAllSelectedEmployees();
		}

		function clearFilter() {
			vm.employeeName = '';
			vm.floors = [];
			vm.floor = {
				'6': false,
				'7': false,
				'8': false
			};
			vm.department = '';
			vm.team = '';
		}

		$rootScope.$on('employeesUpdated', function (event, employees) {
			vm.employees = employees;
		});

		$rootScope.$on('selectMultipleEmployeesChange', function (event, allowSelectMultipleEmployees) {
			vm.allowSelectAll = allowSelectMultipleEmployees;
		});
	}
})();
