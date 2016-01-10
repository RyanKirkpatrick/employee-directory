(function () {
	'use strict';
	angular.module('app').controller('edFloorCtrl', edFloorCtrl);

	edFloorCtrl.$inject = ['edEmployeeService', 'edDeskService', '$state', '$stateParams', '$scope', 'edRoomService', 'edPrinterService', 'edArtifactService', 'edSidebarService', '_'];

	function edFloorCtrl(edEmployeeService, edDeskService, $state, $stateParams, $scope, edRoomService, edPrinterService, edArtifactService, edSidebarService, _) {
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
		vm.location = null;
		vm.floor = null;

		edEmployeeService.setDisplayEmployeeInfoType('location');
		edPrinterService.setDisplayPrinterInfoType('location');
		edRoomService.setDisplayRoomInfoType('location');
		edEmployeeService.setSelectMultipleEmployees(false);
		edRoomService.setSelectMultipleRooms(false);
		edPrinterService.setSelectMultiplePrinters(false);

		activate();

		function activate() {
			edSidebarService.setLockSidebar(false);
			// Get the floor based on the current state
			var currentState = $state.current.name;
			var locationAndFloor = currentState.split('.')[2].split('-');
			vm.location = locationAndFloor[0];
			vm.floor = parseInt(locationAndFloor[1]);

			if (vm.location === 'buf') {
				vm.locationName = 'BUF';
			} else if (vm.location === 'nyc') {
				vm.locationName = 'NYC';
			} else {
				vm.locationName = 'Remote';
			}

			// Map all the desks and rooms on this floor
			edDeskService.getAllDesks().$promise.then(deskFilter);
			edRoomService.getAllRooms().$promise.then(roomFilter);
			edPrinterService.getAllPrinters().$promise.then(printerFilter);
			edArtifactService.getAllArtifacts().$promise.then(artifactFilter);

			mapEmployee();
			mapRoom();
			mapPrinter();
		}

		var deregisterEmployee = $scope.$on('mappedEmployeeChange', function (event, mappedEmployee) {
			if (mappedEmployee) {
				if (mappedEmployee.floor && (mappedEmployee.location !== vm.location || mappedEmployee.floor !== vm.floor)) {
					$state.go('employees.map.' + mappedEmployee.location + '-' + mappedEmployee.floor, {'seat': mappedEmployee.seat});
				} else if (!mappedEmployee.floor) {
					$state.go('employees.map');
				}
			}
		});

		$scope.$on('$destroy', deregisterEmployee);

		var deregisterPrinter = $scope.$on('mappedPrinterChange', function (event, mappedPrinter) {
			if (mappedPrinter) {
				if (mappedPrinter.floor && (mappedPrinter.location !== vm.location || mappedPrinter.floor !== vm.floor)) {
					$state.go('printers.map.' + mappedPrinter.location + '-' + mappedPrinter.floor, {'name': mappedPrinter.name});
				} else if (!mappedPrinter.floor) {
					$state.go('printers.map');
				}
			}
		});

		$scope.$on('$destroy', deregisterPrinter);

		var deregisterRoom = $scope.$on('mappedRoomChange', function (event, mappedRoom) {
			if (mappedRoom) {
				if (mappedRoom.floor && (mappedRoom.location !== vm.location || mappedRoom.floor !== vm.floor)) {
					$state.go('rooms.map.' + mappedRoom.location + '-' + mappedRoom.floor, {'name': mappedRoom.name});
				} else if (!mappedRoom.floor) {
					$state.go('rooms.map');
				}
			}
		});

		$scope.$on('$destroy', deregisterRoom);

		function deskFilter(desks) {
			vm.desks = _.filter(desks, function (desk) {
				return desk.floor === vm.floor && desk.location === vm.location;
			});
		}

		function roomFilter(rooms) {
			vm.rooms = _.filter(rooms, function (room) {
				return room.floor === vm.floor && room.location === vm.location;
			});
		}

		function printerFilter(printers) {
			vm.printers = _.filter(printers, function (printer) {
				return printer.floor === vm.floor && printer.location === vm.location;
			});
		}

		function artifactFilter(artifacts) {
			vm.artifacts = _.filter(artifacts, function (artifact) {
				return artifact.floor === vm.floor && artifact.location === vm.location;
			});
		}

		function mapEmployee() {
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

		function mapEmployeeBySeat(employees) {
			var mappedEmployeeArray = _.filter(employees, function (employee) {
				return employee.seat === $stateParams.seat;
			});

			if (mappedEmployeeArray.length > 0) {
				vm.mappedEmployee = edEmployeeService.updateMappedEmployee(mappedEmployeeArray[0]);
				vm.location = vm.mappedEmployee.location;
				vm.floor = vm.mappedEmployee.floor;
			}
		}

		function mapRoom() {
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
		}

		function mapRoomByName(rooms) {
			var mappedRoomArray = _.filter(rooms, function (room) {
				return room.name === $stateParams.name;
			});

			if (mappedRoomArray.length > 0) {
				vm.mappedRoom = edRoomService.updateMappedRoom(mappedRoomArray[0]);
				vm.floor = vm.mappedRoom.floor;
			}
		}

		function mapPrinter() {
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

		function mapPrinterByName(printers) {
			var mappedPrinterArray = _.filter(printers, function (printer) {
				return printer.name === $stateParams.name;
			});

			if (mappedPrinterArray.length > 0) {
				vm.mappedPrinter = edPrinterService.updateMappedPrinter(mappedPrinterArray[0]);
				vm.floor = vm.mappedPrinter.floor;
			}
		}
	}
})();