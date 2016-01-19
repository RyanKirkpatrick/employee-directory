(function () {
	'use strict';
	angular.module('app').controller('edRoomMapCtrl', edRoomMapCtrl);

	edRoomMapCtrl.$inject = ['$state', '$scope', 'edRoomService', 'edSidebarService'];

	function edRoomMapCtrl($state, $scope, edRoomService, edSidebarService) {
		var vm = this;
		vm.selectedRooms = edRoomService.setSelectMultipleRooms(true);
		vm.mappedRoom = edRoomService.getMappedRoom();

		edRoomService.setDisplayRoomInfoType('location');
		edRoomService.setSelectMultipleRooms(false);

		activate();

		function activate() {
			edSidebarService.setLockSidebar(false);
			locateRoom(vm.mappedRoom);
		}

		var deregister = $scope.$on('mappedRoomChange', function (event, mappedRoom) {
			locateRoom(mappedRoom);
		});

		$scope.$on('$destroy', deregister);

		function locateRoom(room) {
			if (room) {
				$state.go('rooms.map.' + room.location + '-' + room.floor, {'name': room.name});
			}
		}
	}
})();
