(function () {
	'use strict';
	angular.module('app').directive('edRoomCard', edRoomCard);

	edRoomCard.$inject = ['$timeout', 'edRoomService'];

	function edRoomCard($timeout, edRoomService) {
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
			scope.deselectRoom = function (room) {
				var parent = el.parent();
				var child = el.children().first();
				child.addClass('scale-down');
				$timeout(function () {
					parent.addClass('shrink-left');
					edRoomService.updateSelectedRooms(room);
				}, 200);
			};
		}
	}

	ctrlFunc.$inject = ['$state', 'edRoomService'];

	function ctrlFunc($state, edRoomService) {
		var vm = this;
		vm.mapRoom = mapRoom;

		function mapRoom(room) {
			edRoomService.updateMappedRoom(room);
			$state.go('rooms.map.' + room.location + '-' + room.floor, {'name': room.name});
		}
	}
})();