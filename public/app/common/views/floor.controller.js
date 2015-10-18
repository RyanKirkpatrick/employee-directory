(function () {
	'use strict';
	angular.module('app').controller('edFloorCtrl', edFloorCtrl);

	edFloorCtrl.$inject = ['edEmployeeService', 'edDeskService', '$state', '$stateParams', '$scope', 'edRoomService', 'edPrinterService'];

	function edFloorCtrl(edEmployeeService, edDeskService, $state, $stateParams, $scope, edRoomService, edPrinterService) {
		var vm = this;
		vm.selectedEmployees = edEmployeeService.setSelectMultipleEmployees(true);
		vm.mappedEmployee = edEmployeeService.getMappedEmployee();
		vm.selectedPrinters = edPrinterService.setSelectMultiplePrinters(true);
		vm.mappedPrinter = edPrinterService.getMappedPrinter();
		vm.selectedRooms = edRoomService.setSelectMultipleRooms(true);
		vm.mappedRoom = edRoomService.getMappedRoom();
		vm.desks = null;
		vm.rooms = null;
		vm.printers = null;
		vm.floor = null;

		edEmployeeService.setDisplayEmployeeInfoType('location');
		edPrinterService.setDisplayPrinterInfoType('location');
		edRoomService.setDisplayRoomInfoType('location');

		activate();

		function activate() {
			// Get the floor based on the current state
			var currentState = $state.current.name;
			vm.floor = parseInt(currentState.substr(currentState.length - 1));
			// Map all the desks and rooms on this floor
			edDeskService.getAllDesks().$promise.then(deskFilter);
			edRoomService.getAllRooms().$promise.then(roomFilter);
			edPrinterService.getAllPrinters().$promise.then(printerFilter);

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

			// If there is a mapped printer and we know its floor
			if (vm.mappedPrinter && vm.mappedPrinter.floor) {
				// If the mapped printer is on a different floor, un-map it
				if (vm.floor !== vm.mappedPrinter.floor) {
					vm.mappedPrinter = edPrinterService.updateMappedPrinter(null);
				}
				// Map an printer based on its name
			} else if ($stateParams.name) {
				edPrinterService.getAllPrinters().$promise.then(mapPrinterByName);
			}

			// If there is a mapped room and we know its floor
			if (vm.mappedRoom && vm.mappedRoom.floor) {
				// If the mapped room is on a different floor, un-map it
				if (vm.floor !== vm.mappedRoom.floor) {
					vm.mappedRoom = edRoomService.updateMappedRoom(null);
				}
				// Map an room based on its name
			} else if ($stateParams.name) {
				edRoomService.getAllRooms().$promise.then(mapRoomByName);
			}
		}

		var deregisterEmployee = $scope.$on('mappedEmployeeChange', function (event, mappedEmployee) {
			if (mappedEmployee) {
				if (mappedEmployee.floor && mappedEmployee.floor !== vm.floor) {
					$state.go('employees.map.floor-' + mappedEmployee.floor, {'seat': mappedEmployee.seat});
				} else if (!mappedEmployee.floor) {
					$state.go('employees.map');
				}
			}
		});

		$scope.$on('$destroy', deregisterEmployee);

		var deregisterPrinter = $scope.$on('mappedPrinterChange', function (event, mappedPrinter) {
			if (mappedPrinter) {
				if (mappedPrinter.floor && mappedPrinter.floor !== vm.floor) {
					$state.go('printers.map.floor-' + mappedPrinter.floor, {'name': mappedPrinter.name});
				} else if (!mappedPrinter.floor) {
					$state.go('printers.map');
				}
			}
		});

		$scope.$on('$destroy', deregisterPrinter);

		var deregisterRoom = $scope.$on('mappedRoomChange', function (event, mappedRoom) {
			if (mappedRoom) {
				if (mappedRoom.floor && mappedRoom.floor !== vm.floor) {
					$state.go('rooms.map.floor-' + mappedRoom.floor, {'name': mappedRoom.name});
				} else if (!mappedRoom.floor) {
					$state.go('rooms.map');
				}
			}
		});

		$scope.$on('$destroy', deregisterRoom);

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

		function printerFilter(printers) {
			vm.printers = printers.filter(function (printer) {
				return printer.floor === vm.floor;
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

		function mapPrinterByName(printers) {
			var mappedPrinterArray = printers.filter(function (printer) {
				return printer.name === $stateParams.name;
			});

			if (mappedPrinterArray.length > 0) {
				vm.mappedPrinter = edPrinterService.updateMappedPrinter(mappedPrinterArray[0]);
				vm.floor = vm.mappedPrinter.floor;
			}
		}

		function mapRoomByName(rooms) {
			var mappedRoomArray = rooms.filter(function (room) {
				return room.name === $stateParams.name;
			});

			if (mappedRoomArray.length > 0) {
				vm.mappedRoom = edRoomService.updateMappedRoom(mappedRoomArray[0]);
				vm.floor = vm.mappedRoom.floor;
			}
		}
	}
})();