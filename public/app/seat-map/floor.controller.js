(function () {
	'use strict';
	angular.module('app').controller('edFloorCtrl', edFloorCtrl);

	edFloorCtrl.$inject = ['edEmployeeService', 'edDeskService', '$state', '$stateParams', '$scope', '$rootScope', 'edRoomService'];

	function edFloorCtrl(edEmployeeService, edDeskService, $state, $stateParams, $scope, $rootScope, edRoomService) {
		var vm = this;
		vm.selectedEmployees = edEmployeeService.setSelectMultipleEmployees(true);
		vm.mappedEmployee = edEmployeeService.getMappedEmployee();
		vm.desks = null;
		vm.rooms = null;
		vm.floor = null;

		edEmployeeService.setDisplayEmployeeInfoType('location');

		activate();

		function activate() {
			if (vm.mappedEmployee && vm.mappedEmployee.floor) {
				vm.floor = vm.mappedEmployee.floor;
				edDeskService.getAllDesks().$promise.then(deskFilter);
				edRoomService.getAllRooms().$promise.then(roomFilter);
			} else if ($stateParams.seat) {
				edEmployeeService.getAllEmployees().$promise.then(mapEmployee);
			}
			else {
				$state.go('main');
			}
		}

		var deregister = $rootScope.$on('mappedEmployeeChange', function (event, mappedEmployee) {
			if (mappedEmployee && vm.mappedEmployee) {
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

		function mapEmployee(employees) {
			var mappedEmployeeArray = employees.filter(function (employee) {
				return employee.seat === $stateParams.seat;
			});

			if (mappedEmployeeArray.length > 0) {
				vm.mappedEmployee = edEmployeeService.updateMappedEmployee(mappedEmployeeArray[0]);
				vm.floor = vm.mappedEmployee.floor;
				edDeskService.getAllDesks().$promise.then(deskFilter);
				edRoomService.getAllRooms().$promise.then(roomFilter);
			}
		}
	}
})();
