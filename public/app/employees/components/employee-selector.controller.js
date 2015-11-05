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
		vm.locationFilter = locationFilter;
		vm.filterLocations = filterLocations;
		vm.location = {
			'buf': false,
			'nyc': false
		};
		vm.locations = [];
		vm.nycOnly = nycOnly;
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

		function filterLocations(location) {
			if (vm.location[location]) {
				vm.locations.push(location);
			} else {
				vm.locations.splice(vm.locations.indexOf(location), 1);
			}
		}

		function locationFilter(employee) {
			if (vm.locations.length > 0) {
				if (employee.location) {
					return vm.locations.indexOf(employee.location) > -1;
				}
			} else {
				return true;
			}
		}

		function nycOnly() {
			return vm.locations.length === 1 && vm.locations[0] === 'nyc';
		}

		function filterFloors(floor) {
			if (vm.floor[floor]) {
				vm.floors.push(floor);
			} else {
				vm.floors.splice(vm.floors.indexOf(floor), 1);
			}
		}

		function floorFilter(employee) {
			// Only use the floor filter if NYC is not the only location selected
			if (!nycOnly()) {
				// If a floor(s) has been selected
				if (vm.floors.length > 0) {
					// If the employee is on a floor in BUF
					if (employee.floor && employee.location === 'buf') {
						// Include this employee if they are on the selected floor (in BUF)
						return vm.floors.indexOf(employee.floor) > -1;
					// Include this employee if NYC is also a selected location
					} else if (vm.locations.indexOf('nyc') > -1) {
						return true;
					}
				// Include all filtered employees if no floor is selected
				} else {
					return true;
				}
			// Include all filtered employees if NYC is the only location selected
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
			vm.locations = [];
			vm.location = {
				'buf': false,
				'nyc': false
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