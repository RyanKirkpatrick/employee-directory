(function () {
	'use strict';
	angular.module('app').controller('edRoomMapCtrl', edRoomMapCtrl);

	edRoomMapCtrl.$inject = ['$state', '$scope', 'edRoomService'];

	function edRoomMapCtrl($state, $scope, edRoomService) {
		var vm = this;
		vm.selectedRooms = edRoomService.setSelectMultipleRooms(true);
		vm.mappedRoom = edRoomService.getMappedRoom();

		edRoomService.setDisplayRoomInfoType('location');

		activate();

		function activate() {
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
