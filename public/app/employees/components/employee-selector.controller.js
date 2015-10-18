(function () {
	'use strict';
	angular.module('app').controller('edEmployeeSelectorCtrl', edEmployeeSelectorCtrl);

	edEmployeeSelectorCtrl.$inject = ['$scope', '$document', 'edEmployeeService', 'edNotifierService', 'edPrinterService', 'edRoomService'];

	function edEmployeeSelectorCtrl($scope, $document, edEmployeeService, edNotifierService, edPrinterService, edRoomService) {
		var vm = this;
		vm.employees = edEmployeeService.getAllEmployees();
		vm.selectedEmployees = edEmployeeService.getSelectedEmployees();
		vm.displayEmployeeInfoType = edEmployeeService.getDisplayEmployeeInfoType();
		vm.selectEmployee = selectEmployee;
		vm.selectAll = selectAll;
		vm.selectNone = selectNone;
		vm.allowSelectAll = edEmployeeService.getSelectMultipleEmployees();
		vm.filteredEmployees = edEmployeeService.getAllEmployees();
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
				vm.selectedEmployees = edEmployeeService.updateSelectedEmployees(employee);
			}
			else if (vm.displayEmployeeInfoType === 'location') {
				// Only allow 1 thing to be mapped at a time
				edPrinterService.updateMappedPrinter(null);
				edRoomService.updateMappedRoom(null);
				edEmployeeService.updateMappedEmployee(employee);
			}
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
			vm.selectedEmployees = edEmployeeService.addAllFilteredEmployees(vm.filteredEmployees);
			$document.scrollTopAnimated(0, 300);
			if (vm.team === 'Prestige Worldwide') {
				edNotifierService.info('Investors?  Possibly you!');
			}
		}

		function selectNone() {
			vm.selectedEmployees = edEmployeeService.removeAllSelectedEmployees();
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

		var deregisterEmployeesUpdated = $scope.$on('employeesUpdated', function (event, employees) {
			vm.employees = employees;
		});

		$scope.$on('$destroy', deregisterEmployeesUpdated);

		var deregisterSelectMultipleEmployeesChange = $scope.$on('selectMultipleEmployeesChange', function (event, allowSelectMultipleEmployees) {
			vm.allowSelectAll = allowSelectMultipleEmployees;
		});

		$scope.$on('$destroy', deregisterSelectMultipleEmployeesChange);

		var deregisterDisplayEmployeeInfoTypeChange = $scope.$on('displayEmployeeInfoTypeChange', function (event, displayEmployeeInfoType) {
			vm.displayEmployeeInfoType = displayEmployeeInfoType;
		});

		$scope.$on('$destroy', deregisterDisplayEmployeeInfoTypeChange);
	}
})();