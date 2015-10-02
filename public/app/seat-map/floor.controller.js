(function () {
	'use strict';
	angular.module('app').controller('edFloorCtrl', edFloorCtrl);

	edFloorCtrl.$inject = ['edEmployeeService', 'edDeskService', '$state', '$stateParams', '$scope', 'edRoomService'];

	function edFloorCtrl(edEmployeeService, edDeskService, $state, $stateParams, $scope, edRoomService) {
		var vm = this;
		vm.selectedEmployees = edEmployeeService.setSelectMultipleEmployees(true);
		vm.mappedEmployee = edEmployeeService.getMappedEmployee();
		vm.desks = null;
		vm.rooms = null;
		vm.floor = null;

		edEmployeeService.setDisplayEmployeeInfoType('location');

		activate();

		function activate() {
			// Get the floor based on the current state
			var currentState = $state.current.name;
			vm.floor = parseInt(currentState.substr(currentState.length - 1));
			// Map all the desks and rooms on this floor
			edDeskService.getAllDesks().$promise.then(deskFilter);
			edRoomService.getAllRooms().$promise.then(roomFilter);

			// If there is a mapped employee and we know their floor
			if (vm.mappedEmployee && vm.mappedEmployee.floor) {
				// If the mapped employee is on a different floor, un-map them
				if (vm.floor !== vm.mappedEmployee.floor) {
					vm.mappedEmployee = edEmployeeService.updateMappedEmployee(null);
				}
			// Map an employee based on a seat number
			} else if ($stateParams.seat) {
				edEmployeeService.getAllEmployees().$promise.then(mapEmployeeBySeat);
			}
		}

		var deregister = $scope.$on('mappedEmployeeChange', function (event, mappedEmployee) {
			if (mappedEmployee) {
				if (mappedEmployee.floor && mappedEmployee.floor !== vm.floor) {
					$state.go('main.seat-map.floor-' + mappedEmployee.floor, {'seat': mappedEmployee.seat});
				} else if (!mappedEmployee.floor) {
					$state.go('main.seat-map');
				}
			}
		});

		$scope.$on('$destroy', deregister);

		function deskFilter(desks) {
			vm.desks = desks.filter(function (desk) {
				return desk.floor === vm.floor;
			});
		}

		function roomFilter(rooms) {
			vm.rooms = rooms.filter(function (room) {
				return room.floor === vm.floor;
			});
		}

		function mapEmployeeBySeat(employees) {
			var mappedEmployeeArray = employees.filter(function (employee) {
				return employee.seat === $stateParams.seat;
			});

			if (mappedEmployeeArray.length > 0) {
				vm.mappedEmployee = edEmployeeService.updateMappedEmployee(mappedEmployeeArray[0]);
				vm.floor = vm.mappedEmployee.floor;
			}
		}
	}
})();
