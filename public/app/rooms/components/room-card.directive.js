(function () {
	'use strict';
	angular.module('app').directive('edRoomCard', edRoomCard);

	function edRoomCard() {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/rooms/components/room-card',
			scope: {
				room: '='
			},
			link: linkFunc,
			controller: ctrlFunc,
			controllerAs: 'vm'
		};

		return directive;

		function linkFunc(scope, el, attrs) {
		}
	}

	ctrlFunc.$inject = ['$state', 'edRoomService'];

	function ctrlFunc($state, edRoomService) {
		var vm = this;
		vm.mapRoom = mapRoom;
		vm.deselectRoom = deselectRoom;

		function mapRoom(room) {
			edRoomService.updateMappedRoom(room);
			$state.go('rooms.map.' + room.location + '-' + room.floor, {'name': room.name});
		}

		function deselectRoom(room) {
			edRoomService.updateSelectedRooms(room);
		}
	}
})();