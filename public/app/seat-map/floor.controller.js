(function () {
	'use strict';
	angular.module('app').controller('edFloorCtrl', edFloorCtrl);

	edFloorCtrl.$inject = ['edEmployeeService', 'edDeskService', '$state', '$scope', '$rootScope', 'edRoomService'];

	function edFloorCtrl(edEmployeeService, edDeskService, $state, $scope, $rootScope, edRoomService) {
		var vm = this;
		vm.selectedEmployees = edEmployeeService.setSelectMultipleEmployees(false);
		vm.desks = null;
		vm.rooms = null;
		vm.floor = null;

		activate();

		function activate() {
			if (vm.selectedEmployees.length === 1 && vm.selectedEmployees[0].deskLoc.floor) {
				vm.floor = vm.selectedEmployees[0].deskLoc.floor;
				edDeskService.getAllDesks().$promise.then(deskFilter);
				edRoomService.getAllRooms().$promise.then(roomFilter);
			} else {
				$state.go('main');
			}
		}

		var deregister = $rootScope.$on('selectedEmployeeChange', function (event, selectedEmployees) {
			if (selectedEmployees.length === 1) {
				if (selectedEmployees[0].deskLoc && selectedEmployees[0].deskLoc.floor !== vm.floor) {
					$state.go('main.seat-map.floor-' + selectedEmployees[0].deskLoc.floor, {'seat': selectedEmployees[0].deskLoc.seat});
				} else if (!selectedEmployees[0].deskLoc) {
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
	}
})();
