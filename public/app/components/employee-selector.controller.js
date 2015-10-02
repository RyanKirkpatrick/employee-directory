(function () {
	'use strict';
	angular.module('app').controller('edEmployeeSelectorCtrl', edEmployeeSelectorCtrl);

	edEmployeeSelectorCtrl.$inject = ['$scope', 'edEmployeeService', 'edNotifierService'];

	function edEmployeeSelectorCtrl($scope, edEmployeeService, edNotifierService) {
		var vm = this;
		vm.employees = edEmployeeService.getAllEmployees();
		vm.selectedEmployees = edEmployeeService.getSelectedEmployees();
		vm.displayEmployeeInfoType = edEmployeeService.getDisplayEmployeeInfoType();
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
			if (vm.displayEmployeeInfoType === 'profile') {
				displayEmployeeProfile(employee);
			}
			else if (vm.displayEmployeeInfoType === 'location') {
				displayEmployeeLocation(employee);
			}
		}

		function displayEmployeeProfile(employee) {
			edEmployeeService.updateSelectedEmployees(employee);
		}

		function displayEmployeeLocation(employee) {
			edEmployeeService.updateMappedEmployee(employee);
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
			if (vm.team === 'Prestige Worldwide') {
				edNotifierService.info('Investors?  Possibly you!');
			}
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

		$scope.$on('employeesUpdated', function (event, employees) {
			vm.employees = employees;
		});

		$scope.$on('selectMultipleEmployeesChange', function (event, allowSelectMultipleEmployees) {
			vm.allowSelectAll = allowSelectMultipleEmployees;
		});

		$scope.$on('displayEmployeeInfoTypeChange', function (event, displayEmployeeInfoType) {
			vm.displayEmployeeInfoType = displayEmployeeInfoType;
		});
	}
})();